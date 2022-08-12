import React from 'react';
import style from './style.css';

// EXT LIBS
import clsx from 'clsx';

export function links() {
	return [{ rel: 'stylesheet', href: style }];
}

export const ContainerCenter = ({ children, disabled = false }) => {
	const classes = clsx('jdg-container-center', {
		'jdg-container-center-disabled': disabled,
	});

	return <div className={classes}>{children}</div>;
};
