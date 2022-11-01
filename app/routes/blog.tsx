// Globals
import { json } from '@remix-run/node';
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// TYPES
import type { LoaderFunction, LinksFunction, MetaFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types.client';

// EXPORTS
export const loader: LoaderFunction = ({ request }) => {
	return json({
		canonical: request.url,
	});
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return {
		description: 'Blog posts on art, writing, technology, etcetera, by Joshua D. Graber',
		title: 'Joshua D. Graber | Blog',
	};
};

export const handle: Handle = { animatePresence: true, dynamicLinks, ref: React.createRef() };

export default function Blog(): React.ReactElement {
	return (
		<ContainerCenter className='jdg-blog-container-center'>
			<header>
				<h1 className='jdg-blog-heading'>Occasional Fragments</h1>
				<p className='jdg-blog-subheading'>
					Writing on old tech like books, new tech like generative machine learning algorithms, and
					whatever else dull or shiny catches my eye.
				</p>
			</header>

			<div className='jdg-blog-posts-container'>Cards with post data will go here.</div>
		</ContainerCenter>
	);
}
