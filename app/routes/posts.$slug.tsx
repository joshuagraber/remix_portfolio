// GLOBALS
import { json, LinksFunction } from '@remix-run/node';
import React from 'react';
import { useLoaderData } from '@remix-run/react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Footer, links as footerLinks } from 'components/Footer';
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/Spinner';
import ReactMarkdown from 'react-markdown';

// SERVICES
import * as blog from 'services/blog.server';
import * as users from 'services/users.server';

// UTIL
import { stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types';
import type { LoaderFunction } from '@remix-run/node';

// EXPORTS
export const loader: LoaderFunction = async ({ params, request }) => {
	const { slug } = params;

	const post = await blog.getPostBySlug(String(slug));

	// Get post author
	const postAuthor = await users.getUserByID(String(post?.author_id));
	const authorName = `${postAuthor?.name_first} ${postAuthor?.name_middle} ${postAuthor?.name_last}`;

	return json({
		authorName,
		canonical: stripParamsAndHash(request.url),
		post,
	});
};

export const links: LinksFunction = () => {
	return [
		...containerCenterLinks(),
		...footerLinks(),
		...loadingSpinnerLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

// TODO meta, etc.
export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Post(): React.ReactElement {
	const data = useLoaderData();

	// TODO: handle this more elegantly, useTransition, etc.
	if (typeof data === 'undefined') {
		return <LoadingSpinner isDisplayed size='80px' />;
	}

	// VARS
	const {
		authorName,
		post: { content, image_featured, published_at, tagline, title },
	} = data;

	const authorToDisplay = authorName !== 'Joshua D. Graber' ? `Guest writer: ${authorName}` : null;
	const dateToDisplay = new Date(published_at).toLocaleDateString();

	return (
		<div className='jdg-page jdg-page-post'>
			{/* Header */}
			<header className='jdg-post-header'>
				<ContainerCenter className='jdg-container-center-post-header'>
					<div className='jdg-post-header-image'>
						<img src={image_featured} alt={`Hero image for ${title}: ${tagline}`} />
					</div>
					<div className='jdg-post-header-text'>
						<h1 className='jdg-post-header-text-heading'>{title}</h1>
						<p className='jdg-post-header-text-sub-heading'>{tagline}</p>

						<div className='jdg-post-header-text-info'>
							{authorToDisplay && <p className='jdg-post-header-text-author'>{authorToDisplay}</p>}
							<p className='jdg-post-header-text-date'>{dateToDisplay}</p>
						</div>
					</div>
				</ContainerCenter>
			</header>

			{/* Main */}
			<main className='jdg-main'>
				<ContainerCenter className='jdg-container-center-post-main'>
					{/* TODO: Install and use GFM plugin, others? */}
					<ReactMarkdown children={content} />
				</ContainerCenter>
			</main>

			<Footer />
		</div>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
