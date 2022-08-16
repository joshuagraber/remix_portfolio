// GLOBALS
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { ThemeToggle, links as themeToggleLinks } from '../ThemeToggle';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [...containerCenterLinks(), ...themeToggleLinks(), { rel: 'stylesheet', href: styles }];
}

export const Header = () => {
	const classes = clsx('jdg-header');

	return (
		<div className={classes}>
			<ContainerCenter>
				<div>Header Placeholder</div>
				<ThemeToggle />
			</ContainerCenter>
		</div>
	);
};
