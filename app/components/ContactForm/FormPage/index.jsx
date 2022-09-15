// GLOBALS
import React from 'react';
import { Form } from '@remix-run/react';
import { shape, string, bool, oneOf } from 'prop-types';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { ContactFormResponseMessage } from '../ResponseMessage';

export const ContactFormPage = ({ data, isResponseFinished }) => {
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
				<ContactFormFieldset />
				<button type='submit'>Send your message now</button>
			</Form>

			<ContactFormResponseMessage data={data} isResponseFinished={isResponseFinished} />
		</div>
	);
};

ContactFormPage.propTypes = {
	data: oneOf([
		shape({ current: shape({ headline: string, body: string }) }),
		shape({ error: shape({ headline: string, body: string }) }),
	]).isRequired,
	isResponseFinished: bool.isRequired,
};
