// GLOBALS
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export const Header = () => {
	const classes = clsx('jdg-header');

	return (
		<div className={classes}>
			<ContainerCenter>
				<div>Header Placeholder</div>
				{/* Name / headline to the left */}
				{/* Nav to the right (hidden, opens from right side of the screen 
				on desk, from top on mobile, use aria-expanded) */}
				{/* DarkModeToggle furthest right, always visible */}
			</ContainerCenter>
		</div>
	);
};
