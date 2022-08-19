// GLOBALS
import { node, bool } from 'prop-types';
import styles from './styles.css';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const ContainerCenter = ({ children, disabled = false }) => {
	const classes = clsx('jdg-container-center', {
		'jdg-container-center-disabled': disabled,
	});

	return <div className={classes}>{children}</div>;
};

ContainerCenter.propTypes = {
	children: node,
	disable: bool,
};
