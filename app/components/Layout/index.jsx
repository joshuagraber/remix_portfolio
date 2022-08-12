import React from 'react';
import style from './style.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';

export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: style }];
}

export const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<ContainerCenter>{children}</ContainerCenter>
			<Footer />
		</>
	);
};
