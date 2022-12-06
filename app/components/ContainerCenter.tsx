// GLOBALS
import styles from 'styles/container-center.css';

// EXT LIBS
import clsx from 'clsx';

// TYPES
import type { ClassValue } from 'clsx';
interface Props {
	children: React.ReactElement | React.ReactNode;
	className?: ClassValue;
	disabled?: boolean;
}

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const ContainerCenter: React.FC<Props> = ({ children, className, disabled = false }) => {
	const classes = clsx('jdg-container-center', className, {
		'jdg-container-center-disabled': disabled,
	});

	return <main className={classes}>{children}</main>;
};
