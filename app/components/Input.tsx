// GLOBALS
import styles from 'styles/inputs.css';
import React from 'react';

// COMPONENT
import { StatusMessage, links as statusMessageLinks, StatusMessageTypes } from './StatusMessage';

// UTILS
import clsx, { ClassValue } from 'clsx';
import { isValidEmail } from 'utils/utils';
import { v4 as uuid } from 'uuid';

// TYPES
type InputTypes = 'checkbox' | 'password' | 'text' | 'textarea'; // Add as needed
import { LinksFunction } from '@remix-run/node';

interface Props {
	className?: ClassValue;
	defaultChecked?: boolean;
	error?: string;
	id?: string;
	isDisabled?: boolean;
	key?: string;
	label: string | React.ReactElement;
	name: string;
	placeholder?: string;
	type: InputTypes;
	defaultValue?: string;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...statusMessageLinks(), { rel: 'stylesheet', href: styles }];
};

export const Input: React.FC<Props> = ({
	className,
	defaultChecked,
	error = undefined,
	id,
	isDisabled = false,
	label,
	key = uuid(),
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
		const name = textAreaRef?.current?.name ?? inputRef?.current?.name;
		const value = textAreaRef?.current?.value ?? inputRef?.current?.value;
		if (name === 'email') {
			if (!isValidEmail(value) || !value) {
				setErrorMessage(error);
			}
		}
		if (typeof value !== 'undefined' && value.length < 1) {
			setErrorMessage(error);
		}
	};

	// VARS
	const classes: ClassValue = clsx(
		'jdg-input',
		`jdg-input-${type}`,
		className,
		errorMessage && 'jdg-input-error',
		isDisabled && 'jdg-input-disabled'
	);

	const sharedProps = {
		defaultValue,
		disabled: isDisabled,
		id: id ?? name,
		key,
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
			<StatusMessage message={errorMessage} type={StatusMessageTypes.ERROR} />
		</div>
	);
};
