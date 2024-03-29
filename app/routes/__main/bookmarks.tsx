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
		bookmarks: bookmarks.sort((a, b) => (a.createdAt.valueOf() > b.createdAt.valueOf() ? -1 : 1)),
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
			<div className='jdg-bookmarks-heading'>
				<h2>Bookmarks</h2>
				<p>Interesting stuff I found on the Internet.</p>
			</div>
			<div className='jdg-bookmarks-container-inner'>
				{bookmarks &&
					bookmarks.map(({ url, tagline, title }: Bookmark) => {
						return (
							<a className='jdg-bookmarks-bookmark-link' href={url} key={url} target='blank'>
								<h3>{title}</h3>
								<p>{tagline}</p>
							</a>
						);
					})}
			</div>
		</ContainerCenter>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
