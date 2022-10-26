// GLOBALS
import styles from 'styles/button.css';
import React from 'react';

// EXT LIBS
import clsx, { ClassValue } from 'clsx';
import { LinksFunction } from '@remix-run/node';

// COMPONENTS
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/LoadingSpinner';

// TYPES
interface Props {
	className?: ClassValue;
	children: React.ReactNode;
	isDisabled?: boolean | undefined;
	isLoading?: boolean | undefined;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
}

export const links: LinksFunction = () => {
	return [...loadingSpinnerLinks(), { rel: 'stylesheet', href: styles }];
};

export const Button: React.FC<Props> = ({
	children,
	isDisabled = false,
	isLoading = false,
	onClick,
	type = 'button',
}) => {
	// VARS
	const classes = clsx('jdg-button', {
		'jdg-button-disabled': isDisabled,
		'jdg-button-loading': isLoading,
	});

	const renderChildren = () => {
		switch (true) {
			case isLoading:
				return <LoadingSpinner size='24px' isDisplayed />;
			default:
				return children;
		}
	};

	return (
		<button className={classes} disabled={isDisabled} type={type}>
			{renderChildren()}
		</button>
	);
};
