// GLOBALS
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { Nav, links as navLinks } from '../Nav';
import { ThemeToggle, links as themeToggleLinks } from '../ThemeToggle';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [
		...containerCenterLinks(),
		...navLinks(),
		...themeToggleLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export const Header = () => {
	const classes = clsx('jdg-header');

	return (
		<div className={classes}>
			<ContainerCenter>
				<div className='jdg-header-name-container'>
					<h1 className='jdg-header-name-heading'>Joshua D. Graber</h1>
					<p className='jdg-header-name-sub-heading'>Syntax: language and code.</p>
				</div>
				<div className='jdg-header-nav-container'>
					<Nav />
					<ThemeToggle />
				</div>
			</ContainerCenter>
		</div>
	);
};
