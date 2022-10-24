// GLOBALS
import styles from 'styles/inputs.css';
import { LinksFunction } from '@remix-run/node';

// EXT LIBS
import clsx, { ClassValue } from 'clsx';

// TYPES
type InputTypes = 'checkbox' | 'text' | 'textarea'; // Add as needed

interface Props {
	className: ClassValue;
	error?: string | undefined;
	isDisabled?: boolean;
	label: string | React.ReactElement;
	name: string;
	type: InputTypes;
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
	type,
	...rest
}) => {
	// VARS
	const classes: ClassValue = clsx('jdg-input', `jdg-input-${type}`, className, {
		'jdg-input-error': error,
		'jdg-input-disabled': isDisabled,
	});

	const nonInputProps = {
		name,
		...rest,
	};

	const inputProps = {
		type,
		...nonInputProps,
	};

	// Get appropriate html if textarea etc... Keep building this out as need be.
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
			{error && <div className='jdg-input-error-message'>{error}</div>}
		</div>
	);
};
