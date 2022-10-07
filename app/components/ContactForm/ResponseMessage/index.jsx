// GLOBALS
import React from 'react';
import { bool, oneOf, oneOfType, shape, string } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// EXTERNAL LIBS
import clsx from 'clsx';

export const ContactFormResponseMessage = ({ data, isDisplayed, isResponseFinished }) => {
	// HOOKS - REF
	const ref = React.useRef(null);

	// VARS
	const isError = data?.error;
	const isErrorMessageFinishedDisplaying = isError && isResponseFinished;

	const renderErrorMessage = data && isError && !isErrorMessageFinishedDisplaying;
	const renderSuccessMessage = data && !isError;
	const renderMessage = (renderErrorMessage || renderSuccessMessage) && isDisplayed;
	const responseMessage = data?.success ?? data?.error;

	const transitionProps = {
		classNames: 'jdg-contact-form-response',
		in: isDisplayed,
		mountOnEnter: true,
		nodeRef: ref,
		timeout: 300,
		unmountOnExit: true,
	};

	return (
		renderMessage && (
			<CSSTransition {...transitionProps}>
				{(state) => {
					const classes = clsx('jdg-contact-form-response', {
						// Transitions
						'jdg-contact-form-response-entering': state === 'entering',
						'jdg-contact-form-response-entered': state === 'entered',
						'jdg-contact-form-response-exiting': state === 'exiting',
						'jdg-contact-form-response-exited': state === 'exited',
					});

					return (
						<div className={classes}>
							<h5>{responseMessage.heading}</h5>
							<p>{responseMessage.body}</p>
						</div>
					);
				}}
			</CSSTransition>
		)
	);
};

ContactFormResponseMessage.propTypes = {
	data: oneOfType([
		shape({ current: shape({ headline: string, body: string }) }),
		shape({ error: shape({ headline: string, body: string }) }),
	]),
	isDisplayed: bool,
	isResponseFinished: bool,
};
