// GLOBALS
import React from 'react';
import styles from 'styles/header.css';
import { Link } from '@remix-run/react';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from './ContainerCenter';
import { Nav, links as navLinks } from './Nav';
import { ThemeToggle, links as themeToggleLinks } from './ThemeToggle';

// TYPES
import type { LinksFunction } from '@remix-run/node';

// EXPORTS
export const links: LinksFunction = () => {
	return [
		...containerCenterLinks(),
		...navLinks(),
		...themeToggleLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

export const Header: React.FC = () => {
	return (
		<div className='jdg-header'>
			<ContainerCenter>
				<div className='jdg-header-name-container'>
					<Link className='jdg-header-name-link' to='/'>
						<h1 className='jdg-header-name-heading'>Joshua D. Graber</h1>
						<p className='jdg-header-name-sub-heading'>Syntax: language and code</p>
					</Link>
				</div>
				<Nav />
				<ThemeToggle />
			</ContainerCenter>
		</div>
	);
};
