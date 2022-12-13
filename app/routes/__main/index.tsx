// GLOBALS
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Arrow } from 'components/SVG/Arrow';

// SERVICES
import * as blog from 'services/blog.server';

// UTILS
import { stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { ClassValue } from 'clsx';
import type { DynamicLinksFunction } from 'remix-utils';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import type { Handle } from 'types/types';
import type { Post } from '@prisma/client';

// TODO: Make DB model and add admin route
export const bookmarks = [
	{
		tagline: 'Where your Instagram feed wants to go',
		title: '/death/null',
		url: 'http://www.deathnull.org/',
	},
	{
		tagline: 'An essay from Hito Steyerl on E-flux on the images spamming the universe',
		title: 'The Spam of the Earth: Withdrawal from Representation',
		url: 'https://www.e-flux.com/journal/32/68260/the-spam-of-the-earth-withdrawal-from-representation//',
	},
];

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	const posts = await blog.getPostsAll();

	// Only send 8 most recent bookmarks / posts
	return json({
		bookmarks: bookmarks.slice(0, 7),
		canonical: stripParamsAndHash(request.url),
		posts: posts.slice(0, 7),
	});
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

export default function Index(): React.ReactElement {
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
