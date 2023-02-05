// GLOBALS
import { SerializeFrom } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import styles from 'styles/home.css';

// COMPONENTS
import { Arrow } from 'components/SVG/Arrow';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import ReactMarkdown from 'react-markdown';

// SERVICES
import * as blog from 'services/blog.server';

// UTILS
import { cachedLoaderResponse, stripParamsAndHash } from 'utils/utils.server';

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
			.sort((a, b) => (a.createdAt.valueOf() > b.createdAt.valueOf() ? -1 : 1))
			.slice(0, 7),
		canonical,
		posts: posts
			.sort((a, b) => (a.published_at.valueOf() > b.published_at.valueOf() ? -1 : 1))
			.slice(0, 7),
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

export default function HomePage(): React.ReactElement {
	// HOOKS - GLOBAL
	const { bookmarks, posts } = useLoaderData();

	return (
		<ContainerCenter className='jdg-home-container-center'>
			<div className='jdg-home-posts-container'>
				<div className='jdg-home-posts-heading'>
					<h2>Recent Posts</h2>
					<p>
						Occasional fragments on books, technology, art, and whatever else might occur to me to
						share here.
					</p>
				</div>
				<div className='jdg-home-posts-container-inner'>
					{posts.map(({ image_featured, published_at, slug, tagline, title }: Post) => {
						const published = new Date(published_at).toLocaleDateString();
						return (
							<Link className='jdg-home-post-link' key={slug} to={`posts/${slug}`}>
								<div className='jdg-home-post-link-text'>
									<h3 className='jdg-home-post-link-text-heading'>{title}</h3>
									<div className='jdg-home-post-link-text-subheading'>
										<ReactMarkdown>{tagline}</ReactMarkdown>
									</div>
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
				<div className='jdg-home-bookmarks-heading'>
					<h2>Recent Bookmarks</h2>
					<p>Interesting stuff I found on the Internet.</p>
				</div>
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
