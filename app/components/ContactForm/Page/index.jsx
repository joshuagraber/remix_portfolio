// GLOBALS
import React from 'react';
import { Form, useTransition } from '@remix-run/react';
import { shape, string, bool, oneOfType } from 'prop-types';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { ContactFormResponseMessage } from '../ResponseMessage';
import { LoadingSpinner, links as loadingSpinnerLinks } from '~/components/LoadingSpinner';

export function links() {
	return [...loadingSpinnerLinks()];
}

export const ContactFormPage = ({ data, isResponseFinished }) => {
	// HOOKS - GLOBAL
	const transition = useTransition();

	// HOOKS - REF
	const ref = React.useRef();

	React.useEffect(() => {
		// Do nothing if form not submitted.
		if (typeof data === 'undefined') {
			return;
		}

		// Only reset if ref is applied to el and action returns success
		if (ref.current && data.success) {
			ref.current.reset();
		}
	}, [data, ref]);

	return (
		<div className='jdg-contact-form-container'>
			<Form className='jdg-contact-form' method='post' ref={ref}>
				{transition.state === 'idle' && !isResponseFinished && (
					<>
						<ContactFormFieldset />
						<button type='submit'>Send your message now</button>
					</>
				)}
			</Form>
			<LoadingSpinner
				isDisplayed={transition.state === 'submitting'}
				text='Your message is sending...'
			/>

			<ContactFormResponseMessage
				data={data}
				isDisplayed={data && transition.state === 'idle'}
				isResponseFinished={isResponseFinished}
			/>
		</div>
	);
};

ContactFormPage.propTypes = {
	data: oneOfType([
		shape({ current: shape({ headline: string, body: string }) }),
		shape({ error: shape({ headline: string, body: string }) }),
	]),
	isResponseFinished: bool.isRequired,
};
