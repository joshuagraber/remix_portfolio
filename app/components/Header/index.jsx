// GLOBALS
import React from 'react';
import styles from './styles.css';
import { Link } from '@remix-run/react';

// EXT LIBS
import clsx from 'clsx';

// HOOKS
import { useWindowDimensions } from '~/hooks/useWindowDimensions';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { Nav, links as navLinks } from '../Nav';
import { ThemeToggle, links as themeToggleLinks } from '../ThemeToggle';

export function links() {
	return [
		...containerCenterLinks(),
		...navLinks(),
		...themeToggleLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export const Header = () => {
	const { innerWidth } = useWindowDimensions();

	const [isMobile, setIsMobile] = React.useState(innerWidth <= 700 ? true : false);

	React.useEffect(() => {
		if (innerWidth <= 700) {
			setIsMobile(true);
			return;
		}
		setIsMobile(false);
	}, [innerWidth]);

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
