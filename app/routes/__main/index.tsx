// GLOBALS
import { json, SerializeFrom } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import styles from 'styles/home.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Arrow } from 'components/SVG/Arrow';

// SERVICES
import * as blog from 'services/blog.server';

// UTILS
import { createETag, stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { DynamicLinksFunction } from 'remix-utils';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import type { Handle } from 'types/types';
import type { Post } from '@prisma/client';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	const bookmarks = await blog.getBookmarksAll();
	const posts = await blog.getPostsAll();
	const canonical = stripParamsAndHash(request.url);

	// Only send 8 most recent bookmarks / posts
	const data = {
		bookmarks: bookmarks
			.sort((a, b) => (a.createdAt.toISOString() < b.createdAt.toISOString() ? -1 : 1))
			.slice(0, 7),
		canonical,
		posts: posts
			.sort((a, b) => (a.published_at.toISOString() < b.published_at.toISOString() ? -1 : 1))
			.slice(0, 7),
	};

	// Cacheing
	// TODO: Abstract cacheing into repeatable util
	const responseEtag = createETag(JSON.stringify(data));
	const requestEtag = request.headers.get('If-None-Match');

	// If our etag equals browser's, return 304, browser should fall back to cache
	if (responseEtag === requestEtag) {
		return json({ canonical }, { status: 304 });
	} else {
		return json(data, {
			headers: {
				'Cache-Control': 'max-age=10',
				etag: responseEtag,
			},
			status: 200,
		});
	}
};

const dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({ data }) => {
	if (data?.canonical) {
		return [{ rel: 'canonical', href: data.canonical }];
	}
	return [];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function HomePage(): React.ReactElement {
	// HOOKS - GLOBAL
	const { bookmarks, posts } = useLoaderData();

	return (
		<ContainerCenter className='jdg-home-container-center'>
			<div className='jdg-home-posts-container'>
				<h2>Recent Posts</h2>
				<div className='jdg-home-posts-container-inner'>
					{posts.map(({ image_featured, published_at, slug, tagline, title }: Post) => {
						const published = new Date(published_at).toLocaleDateString();
						return (
							<Link className='jdg-home-post-link' key={slug} to={`posts/${slug}`}>
								<div className='jdg-home-post-link-text'>
									<h3 className='jdg-home-post-link-text-heading'>{title}</h3>
									<p className='jdg-home-post-link-text-subheading'>{tagline}</p>
									<p className='jdg-home-post-link-text-date'>{published}</p>
								</div>
								<img
									className='jdg-home-post-link-image'
									src={image_featured}
									alt={`Featured image for ${title}`}
								/>
							</Link>
						);
					})}
				</div>
				<Link className='jdg-home-posts-link-all' to='posts'>
					All Posts
					<Arrow direction='right' />
				</Link>
			</div>

			{/* Bookmarks */}
			<div className='jdg-home-bookmarks-container'>
				<h2>Recent Bookmarks</h2>
				<div className='jdg-home-bookmarks-container-inner'>
					{bookmarks.map((bookmark: any) => {
						return (
							<a
								className='jdg-home-bookmark-link'
								href={bookmark.url}
								key={bookmark.url}
								target='blank'
							>
								<h3>{bookmark.title}</h3>
								<p>{bookmark.tagline}</p>
							</a>
						);
					})}
				</div>
				<Link className='jdg-home-posts-link-all' to='bookmarks'>
					All Bookmarks
					<Arrow direction='right' />
				</Link>
			</div>
		</ContainerCenter>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
