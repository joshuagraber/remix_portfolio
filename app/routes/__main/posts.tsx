// GLOBALS
import React from 'react';
import { json } from 'remix-utils';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// UTILS
import { stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';

// EXPORTS

export const loader: LoaderFunction = ({ request }) => {
	return json({
		canonical: stripParamsAndHash(request.url),
	});
};
export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks()];
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function () {
	return (
		<ContainerCenter>
			<h2>Hello from posts page</h2>
		</ContainerCenter>
	);
}
