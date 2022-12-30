// GLOBALS
import React from 'react';
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import styles from 'styles/not-authorized.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// UTILS
import { stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	return json({ canonical: stripParamsAndHash(request.url) });
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
	return (
		<ContainerCenter className='jdg-not-authorized-container-center'>
			<h2>Not Authorized</h2>
			<p>Please check with me if you think you should have access to this page.</p>
			<Link to='/'>Or head back to the home page.</Link>
		</ContainerCenter>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
