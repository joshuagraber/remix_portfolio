// GLOBALS
import React from 'react';
import { SerializeFrom } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import styles from 'styles/posts.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import ReactMarkdown from 'react-markdown';

// UTILS
import {
	cachedLoaderResponse,
	filterPostsByEnvironment,
	stripParamsAndHash,
} from 'utils/utils.server';

// SERVICES
import * as blog from 'services/blog.server';

// TYPES
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Post } from '@prisma/client';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	const posts = filterPostsByEnvironment(await blog.getPostsAll());
	const canonical = stripParamsAndHash(request.url);

	const data = {
		canonical,
		posts: posts.sort((a, b) => (a.published_at.valueOf() > b.published_at.valueOf() ? -1 : 1)),
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

export default function Posts() {
	const { posts } = useLoaderData();
	return (
		<ContainerCenter className='jdg-posts-container-center'>
			<div className='jdg-posts-heading'>
				<h2>Recent Posts</h2>
				<p>
					Occasional fragments on books, technology, art, and whatever else might occur to me to
					share here.
				</p>
			</div>
			<div className='jdg-posts-container-inner'>
				{posts.map(({ image_featured, published_at, slug, tagline, title }: Post) => {
					const published = new Date(published_at).toLocaleDateString();
					return (
						<Link className='jdg-posts-post-link' key={slug} prefetch='intent' to={slug}>
							<div className='jdg-posts-post-link-text'>
								<h3 className='jdg-posts-post-link-text-heading'>{title}</h3>
								<div className='jdg-posts-post-link-text-subheading'>
									<ReactMarkdown>{tagline}</ReactMarkdown>
								</div>
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

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
