// GLOBALS
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import styles from 'styles/bookmarks.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// UTILS
import { createETag, stripParamsAndHash } from 'utils/utils.server';

// SERVICES
import * as blog from 'services/blog.server';

// TYPES
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Bookmark } from '@prisma/client';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	const bookmarks = await blog.getBookmarksAll();

	const data = {
		canonical: stripParamsAndHash(request.url),
		bookmarks: bookmarks.sort((a, b) =>
			a.createdAt.toISOString() < b.createdAt.toISOString() ? -1 : 1
		),
	};

	// Cacheing
	const responseEtag = createETag(String(data));
	const requestEtag = request.headers.get('If-None-Match');

	// If our etag equals browser's, return 304, browser should fall back to cache
	if (responseEtag === requestEtag) {
		return json(null, { status: 304 });
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
export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Bookmarks() {
	const { bookmarks } = useLoaderData();

	return (
		<ContainerCenter className='jdg-bookmarks-container-center'>
			<h2>Bookmarks</h2>
			<div className='jdg-bookmarks-container-inner'>
				{bookmarks &&
					bookmarks.map((bookmark: Bookmark) => {
						return (
							<a
								className='jdg-bookmarks-bookmark-link'
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
		</ContainerCenter>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
