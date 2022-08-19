// GLOBALS
import styles from './styles.css';
import { Link } from '@remix-run/react';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { Nav, links as navLinks } from '../Nav';
import { ThemeToggle, links as themeToggleLinks } from '../ThemeToggle';

// EXT LIBS
import clsx from 'clsx';
import { getWindow } from 'ssr-window';

export function links() {
	return [
		...containerCenterLinks(),
		...navLinks(),
		...themeToggleLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export const Header = () => {
	const window = getWindow();
	const isMobile = window.innerWidth <= 700;
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
