// GLOBALS
import style from './style.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: style }];
}

export const Footer = () => {
	const classes = clsx('jdg-footer');

	return (
		<div className={classes}>
			<ContainerCenter>
				<div>Footer Placeholder</div>
			</ContainerCenter>
		</div>
	);
};
