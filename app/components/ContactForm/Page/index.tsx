// GLOBALS
import React from 'react';
import { Form, useTransition } from '@remix-run/react';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/LoadingSpinner';

// TYPES
interface Props {
	data: FormData;
}

// EXPORTS
export function links() {
	return [...loadingSpinnerLinks()];
}

export const ContactFormPage: React.FC<Props> = ({ data }) => {
	// HOOKS - GLOBAL
	const transition = useTransition();

	// HOOKS - REF
	const ref = React.useRef<HTMLFormElement>(null);

	React.useEffect(() => {
		// Do nothing if form not submitted.
		if (typeof data === 'undefined') {
			return;
		}

		if (ref.current && data) {
			ref?.current?.reset();
		}
	}, [data, ref]);

	return (
		<div className='jdg-contact-form-container'>
			<Form className='jdg-contact-form' method='post' ref={ref}>
				<ContactFormFieldset />
				<button type='submit'>Send your message now</button>
			</Form>
		</div>
	);
};
