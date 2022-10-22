// GLOBALS
import React from 'react';
import styles from 'styles/header.css';
import { Link } from '@remix-run/react';

// EXT LIBS
import clsx from 'clsx';

// HOOKS
import { useWindowDimensions } from 'hooks/useWindowDimensions';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { Nav, links as navLinks } from '../Nav';
import { ThemeToggle, links as themeToggleLinks } from '../ThemeToggle';

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
	// UPDATING DIMS (essentially listening for resize)
	const { innerWidth } = useWindowDimensions();

	// HOOKS - STATE
	const [isMobile, setIsMobile] = React.useState(innerWidth <= 750 ? true : false);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (innerWidth <= 750) {
			setIsMobile(true);
			return;
		}
		setIsMobile(false);
	}, [innerWidth]);

	// CLASSES
	const classes = clsx('jdg-header');

	return (
		<div className={classes}>
			<ContainerCenter>
				<Link className='jdg-header-name-container' to='/'>
					<h1 className='jdg-header-name-heading'>Joshua D. Graber</h1>
					<p className='jdg-header-name-sub-heading'>Syntax: language and code.</p>
				</Link>
				<Nav isMobile={isMobile} />
				<ThemeToggle />
			</ContainerCenter>
		</div>
	);
};
