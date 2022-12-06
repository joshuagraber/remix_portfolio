// GLOBALS
import styles from 'styles/inputs.css';
import React from 'react';

// EXT LIBS
import clsx, { ClassValue } from 'clsx';

// TYPES
type InputTypes = 'checkbox' | 'password' | 'text' | 'textarea'; // Add as needed
import { LinksFunction } from '@remix-run/node';

interface Props {
	className?: ClassValue;
	defaultChecked?: boolean;
	error?: string | undefined;
	id?: string;
	isDisabled?: boolean;
	label: string | React.ReactElement;
	name: string;
	// onFocus?: (e: React.FocusEvent) => void;
	placeholder?: string;
	type: InputTypes;
	defaultValue?: string | undefined;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Input: React.FC<Props> = ({
	className,
	defaultChecked,
	error = undefined,
	id,
	isDisabled = false,
	label,
	name,
	placeholder,
	type,
	defaultValue = '',
	...rest
}) => {
	// HOOKS - STATE
	// Derived state because error prop is passed from server only once per submmission,
	// and we need to clear errors as user focuses inputs
	const [errorMessage, setErrorMessage] = React.useState(error);

	// HOOKS - REF
	const inputRef = React.useRef<HTMLInputElement>(null);
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

	// HOOKS - EFFECT
	// Set error when passed val changes
	React.useEffect(() => {
		setErrorMessage(error);
	}, [error]);

	// Keep input focused afer state change
	React.useEffect(() => {
		const errorIsCleared = typeof errorMessage === 'undefined' && error;

		// Inputs
		if (inputRef.current && errorIsCleared) {
			inputRef.current.focus();
		}

		// Textareas
		if (textAreaRef.current && errorIsCleared) {
			textAreaRef.current.focus();
		}
	}, [errorMessage, inputRef]);

	// HANDLER
	// Update error state when input focused
	const onFocus = () => {
		if (typeof errorMessage === 'string') {
			setErrorMessage(undefined);
		}
	};

	// Update error state when input un-focused
	const onBlur = () => {
		const value = textAreaRef?.current?.value ?? inputRef?.current?.value;
		if (!value) {
			setErrorMessage(error);
		}
	};

	// VARS
	const classes: ClassValue = clsx('jdg-input', `jdg-input-${type}`, className, {
		'jdg-input-error': errorMessage,
		'jdg-input-disabled': isDisabled,
	});

	const sharedProps = {
		defaultValue,
		disabled: isDisabled,
		id: id ?? name,
		name,
		onBlur,
		onFocus,
		placeholder,
		...rest,
	};

	const textAreaProps = {
		...sharedProps,
		ref: textAreaRef,
	};

	const inputProps = {
		...sharedProps,
		ref: inputRef,
		type,
	};

	const checkBoxProps = {
		...inputProps,
		defaultChecked,
	};

	// Render
	const Component = () => {
		switch (type) {
			case 'textarea':
				return <textarea {...textAreaProps} />;
			case 'checkbox':
				return <input {...checkBoxProps} />;
			default:
				return <input {...inputProps} />;
		}
	};

	return (
		<div className={classes}>
			<label htmlFor={id}>{label}</label>
			<Component />
			{/* TODO: Create subcomponent, add icon, make nice with animations */}
			{errorMessage && <div className='jdg-input-error-message'>{errorMessage}</div>}
		</div>
	);
};
