/* 
This folder will use an index routing structure
for nested experiment routes
Instead of async, use exported array from /components/Experiments/index.jsx
Which will collect all experiments in the folder (hardcoding because they 
will be too complex and idiosyncratic to use a CDN)  
*/
// GLOBALS
import React from 'react';
import styles from '../../styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export function meta() {
	return {
		description: "Joshua D. Graber's experiments with language and code",
		title: 'Joshua D. Graber | Experiments',
	};
}

export function handle() {
	return { animatePresence: true, ref: React.createRef() };
}

export default function Experiments() {
	return (
		<ContainerCenter>
			<div>Hello from Experiments page!</div>
		</ContainerCenter>
	);
}
