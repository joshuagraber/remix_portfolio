// GLOBALS
import React from 'react';
import styles from 'styles/status-message.css';

// COMPONENTS
import { CSSTransition } from 'react-transition-group';

// MISC
import clsx from 'clsx';

// TYPES
import type { ClassValue } from 'clsx';
import { LinksFunction } from '@remix-run/node';
export enum StatusMessageTypes {
	ERROR = 'error',
	SUCCESS = 'success',
}
interface Props {
	className?: ClassValue;
	message: string | undefined;
	type: StatusMessageTypes;
}

// CONSTANTS
const STATUS_MESSAGE_CLASS_NAME = 'jdg-status-message';

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const StatusMessage: React.FC<Props> = ({ className, message, type }) => {
	/* Separate state to preserve message when incoming prop changes,
	 * so that message persists during exit animation. */
	const [statusMessage, setStatusMessage] = React.useState(message);

	// HOOKS - REF
	const statusMessageRef = React.useRef<HTMLDivElement>(null);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (message) {
			setStatusMessage(message);
		}
	}, [message]);

	// VARS
	const classes = clsx(
		className,
		STATUS_MESSAGE_CLASS_NAME,
		`${STATUS_MESSAGE_CLASS_NAME}-${type}`
	);

	return (
		<CSSTransition
			appear
			classNames={STATUS_MESSAGE_CLASS_NAME}
			in={typeof message === 'string'}
			nodeRef={statusMessageRef}
			timeout={300}
		>
			<div className={classes} ref={statusMessageRef}>
				<div className='jdg-status-message-container'>
					<p className='jdg-status-message-text'>{statusMessage}</p>
				</div>
			</div>
		</CSSTransition>
	);
};
