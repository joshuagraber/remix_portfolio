// GLOBALS
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// TYPES
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types';

// EXPORTS
export const loader: LoaderFunction = ({ request }) => {
	return {
		canonical: request.url,
	};
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return {
		description: "Joshua D. Graber's experiments with language and code",
		title: 'Joshua D. Graber | Experiments',
	};
};

export const handle: Handle = { animatePresence: true, dynamicLinks, ref: React.createRef() };

export default function Experiments(): React.ReactElement {
	return (
		<ContainerCenter>
			<div>Hello from Experiments page!</div>
		</ContainerCenter>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
