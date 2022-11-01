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
			<h2 className='jdg-blog-heading'>Blog stuff</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque minima tempore ipsum at
				nisi magnam error blanditiis, inventore architecto dolore ratione quidem? Dignissimos,
				necessitatibus labore. Impedit molestiae distinctio dolorum velit. Rerum sit soluta minima
				molestiae numquam magnam optio rem, sapiente dolorum. Maxime ipsam, in velit expedita
				asperiores, facere odio fugiat voluptatem reiciendis alias nesciunt commodi quas dolores
				nisi labore culpa! Id sint consectetur non rem a, reiciendis ab aliquam, deleniti maiores
				perspiciatis quaerat expedita velit totam, ullam recusandae incidunt fuga minima sed?
				Aliquid beatae eligendi quis laborum dignissimos harum aliquam!
			</p>
		</ContainerCenter>
	);
}
