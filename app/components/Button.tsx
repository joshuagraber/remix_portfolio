// GLOBALS
import styles from 'styles/button.css';
import React from 'react';

// EXT LIBS
import clsx, { ClassValue } from 'clsx';
import { LinksFunction } from '@remix-run/node';

// COMPONENTS
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/Spinner';

// TYPES
interface Props {
	className?: ClassValue;
	children: React.ReactNode;
	formAction?: string;
	isDisabled?: boolean | undefined;
	isLoading?: boolean | undefined;
	name?: string;
	type?: 'submit' | 'reset' | 'button';
	value?: string;
}

export const links: LinksFunction = () => {
	return [...loadingSpinnerLinks(), { rel: 'stylesheet', href: styles }];
};

export const Button: React.FC<Props> = ({
	children,
	formAction,
	isDisabled = false,
	isLoading = false,
	name,
	type = 'button',
	value,
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
		<button
			className={classes}
			formAction={formAction}
			disabled={isDisabled}
			name={name}
			type={type}
			value={value}
		>
			{renderChildren()}
		</button>
	);
};
