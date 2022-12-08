// GLOBALS
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

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
const shoutsData = [
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

	return json({
		canonical: stripParamsAndHash(request.url),
		posts,
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
	const { posts } = useLoaderData();

	return (
		<ContainerCenter className='jdg-home-container-center'>
			<div className='jdg-home-posts-container'>
				<h2>Posts</h2>
				<div className='jdg-home-posts-container-inner'>
					{posts.map(({ image_featured, published_at, slug, tagline, title }: Post) => {
						const published = new Date(published_at).toLocaleDateString();
						return (
							<Link className='jdg-home-post-link' key={slug} to={`posts/${slug}`}>
								<div className='jdg-home-post-link-text'>
									<h3>{title}</h3>
									<p>{tagline}</p>
									<p>{published}</p>
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
									<h3>{title}</h3>
									<p>{tagline}</p>
									<p>{published}</p>
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
									<h3>{title}</h3>
									<p>{tagline}</p>
									<p>{published}</p>
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
									<h3>{title}</h3>
									<p>{tagline}</p>
									<p>{published}</p>
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
				<Link to='posts'>All Posts</Link>
			</div>
			<div className='jdg-home-shouts-container'>
				<h2>Shouts</h2>
				<div className='jdg-home-shouts-container-inner'>
					{shoutsData.map((shout) => {
						return (
							<a className='jdg-home-shout-link' href={shout.url} key={shout.url} target='blank'>
								<h3>{shout.title}</h3>
								<p>{shout.tagline}</p>
							</a>
						);
					})}
					{shoutsData.map((shout) => {
						return (
							<a className='jdg-home-shout-link' href={shout.url} key={shout.url} target='blank'>
								<h3>{shout.title}</h3>
								<p>{shout.tagline}</p>
							</a>
						);
					})}
					{shoutsData.map((shout) => {
						return (
							<a className='jdg-home-shout-link' href={shout.url} key={shout.url} target='blank'>
								<h3>{shout.title}</h3>
								<p>{shout.tagline}</p>
							</a>
						);
					})}
					{shoutsData.map((shout) => {
						return (
							<a className='jdg-home-shout-link' href={shout.url} key={shout.url} target='blank'>
								<h3>{shout.title}</h3>
								<p>{shout.tagline}</p>
							</a>
						);
					})}
				</div>
			</div>
		</ContainerCenter>
	);
}
