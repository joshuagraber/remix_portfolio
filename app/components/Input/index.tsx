// GLOBALS
import styles from 'styles/inputs.css';
import React from 'react';

// EXT LIBS
import clsx, { ClassValue } from 'clsx';

// TYPES
type InputTypes = 'checkbox' | 'text' | 'textarea'; // Add as needed
import { LinksFunction } from '@remix-run/node';

interface Props {
	className?: ClassValue;
	error?: string | undefined;
	isDisabled?: boolean;
	label: string | React.ReactElement;
	name: string;
	// onFocus?: (e: React.FocusEvent) => void;
	placeholder?: string;
	type: InputTypes;
	defaultValue: string | undefined;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Input: React.FC<Props> = ({
	className,
	error = undefined,
	isDisabled = false,
	label,
	name,
	// onFocus,
	placeholder,
	type,
	defaultValue,
	...rest
}) => {
	// HOOKS - STATE
	const [errorMessage, setErrorMessage] = React.useState(error);

	// HOOKS - EFFECT
	React.useEffect(() => {
		setErrorMessage(error);
	}, [error]);

	// HANDLER
	const onFocus = () => {
		if (typeof errorMessage === 'string') {
			setErrorMessage(undefined);
		}
	};

	// VARS
	const classes: ClassValue = clsx('jdg-input', `jdg-input-${type}`, className, {
		'jdg-input-error': errorMessage,
		'jdg-input-disabled': isDisabled,
	});

	const sharedProps = {
		defaultValue,
		name,
		onFocus,
		placeholder,
		...rest,
	};

	const nonInputProps = {
		...sharedProps,
	};

	const inputProps = {
		...sharedProps,
		type,
	};

	// Render
	const Component = () => {
		switch (type) {
			case 'textarea':
				return <textarea {...nonInputProps} />;
			default:
				return <input {...inputProps} />;
		}
	};

	return (
		<div className={classes}>
			<label htmlFor={name}>{label}</label>
			<Component />
			{errorMessage && <div className='jdg-input-error-message'>{errorMessage}</div>}
		</div>
	);
};
