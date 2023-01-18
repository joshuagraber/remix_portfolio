// GLOBALS
import React from 'react';
import { json, SerializeFrom } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import styles from 'styles/bookmarks.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// UTILS
import { cachedLoaderResponse, stripParamsAndHash } from 'utils/utils.server';

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
	const canonical = stripParamsAndHash(request.url);

	const data = {
		canonical,
		bookmarks: bookmarks.sort((a, b) =>
			a.createdAt.toISOString() < b.createdAt.toISOString() ? -1 : 1
		),
	};

	return cachedLoaderResponse(request, data);
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
