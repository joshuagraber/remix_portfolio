// GLOBALS
import React from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// UTILS
import { stripParamsAndHash } from 'utils/utils.server';

// SERVICES
import * as blog from 'services/blog.server';

// TYPES
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Post } from '@prisma/client';

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

export default function Posts() {
	const { posts } = useLoaderData();
	return (
		<ContainerCenter className='jdg-posts-container-center'>
			<h2>Posts</h2>
			<div className='jdg-posts-container-inner'>
				{posts.map(({ image_featured, published_at, slug, tagline, title }: Post) => {
					const published = new Date(published_at).toLocaleDateString();
					return (
						<Link className='jdg-posts-post-link' key={slug} to={slug}>
							<div className='jdg-posts-post-link-text'>
								<h3 className='jdg-posts-post-link-text-heading'>{title}</h3>
								<p className='jdg-posts-post-link-text-subheading'>{tagline}</p>
								<p className='jdg-posts-post-link-text-date'>{published}</p>
							</div>
							<img
								className='jdg-posts-post-link-image'
								src={image_featured}
								alt={`Featured image for ${title}`}
							/>
						</Link>
					);
				})}
			</div>
		</ContainerCenter>
	);
}
