// SERVICES
import * as blog from 'services/blog.server';

// UTILS
import { isEqual } from 'lodash';
import { getDomainUrl, removeDoubleSlashes, typedBoolean } from 'utils/utils.server';

// TYPES
import type { EntryContext } from '@remix-run/node';
import type { SitemapEntry } from 'types/types.server';

// EXPORTS
export async function getSitemapXml(request: Request, remixContext: EntryContext) {
	const domainUrl = getDomainUrl(request);

	function getEntry({ route, lastmod, changefreq, priority }: SitemapEntry) {
		return `
			<url>
				<loc>${domainUrl}${route}</loc>
				${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
				${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
				${priority ? `<priority>${priority}</priority>` : ''}
			</url>
  `.trim();
	}

	const siteMapEntriesFromPosts: SitemapEntry[] = await (
		await blog.getPostsAll()
	).map((post) => {
		return {
			route: `/posts/${post.slug}`,
			priority: 0.7,
			lastmod: post.updatedAt.toISOString(),
		};
	});

	const rawSitemapEntries = (
		await Promise.all(
			Object.entries(remixContext.routeModules).map(async ([id, mod]) => {
				// exclude resource and action routes
				if (id.startsWith('routes/action')) return;
				if (!('default' in mod)) return;
				// exclude root
				if (id === 'root') return;
				// exclude admin, test, 404 splat, auth
				if (id.includes('admin')) return;
				if (id.includes('test')) return;
				if (id === 'routes/__main/$') return;
				if (id.includes('sign')) return;

				// Get route manifest entry
				const manifestEntry = remixContext.manifest.routes[id];
				if (!manifestEntry) {
					console.warn(`Could not find a manifest entry for ${id}`);
					return;
				}

				// Get parent for prepending to children
				let parentId = manifestEntry.parentId;
				let parent = parentId ? remixContext.manifest.routes[parentId] : null;

				// Define path, get from manifestEntry
				let path;
				if (manifestEntry.path) {
					path = manifestEntry.path;
				} else if (manifestEntry.index) {
					path = '';
				} else {
					return;
				}

				// Get parents and grandparents and great-grandparents and etc.
				while (parent) {
					const parentPath = parent.path ?? '';

					path = `${parentPath}/${path}`;

					parentId = parent.parentId;
					parent = parentId ? remixContext.manifest.routes[parentId] : null;
				}

				// we can't handle dynamic routes, so if the handle doesn't have a
				// getSitemapEntries function, we just
				if (path.includes(':')) return;

				const entry: SitemapEntry = { route: removeDoubleSlashes(path) };

				return entry;
			})
		)
	)
		// Add dynamic entries
		.concat(siteMapEntriesFromPosts)
		// Organize
		.flatMap((z) => z)
		.filter(typedBoolean)
		.sort((a, b) => (a.route > b.route ? 1 : -1));

	// Filter non-duplicate entries and add to array.
	const sitemapEntries: Array<SitemapEntry> = [];
	for (const entry of rawSitemapEntries) {
		const existingEntryForRoute = sitemapEntries.find((e) => e.route === entry.route);
		if (existingEntryForRoute) {
			if (!isEqual(existingEntryForRoute, entry)) {
				console.warn(`Duplicate route for ${entry.route} with different sitemap data`, {
					entry,
					existingEntryForRoute,
				});
			}
		} else {
			sitemapEntries.push(entry);
		}
	}

	// RENDER
	return `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
		>
			${sitemapEntries.map((entry) => getEntry(entry)).join('')}
		</urlset>
  `.trim();
}
