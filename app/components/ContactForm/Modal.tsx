// GLOBALS
import styles from 'styles/contact-form.css';
import React from 'react';
import { useFetcher } from '@remix-run/react';

// COMPONENTS
import { ContactFormFields, links as contactFormFieldsLinks } from './Fields';
import { Button, links as buttonLinks } from 'components/Button';

// TYPES
import { useContactFormSubmitter } from 'hooks/useContactFormSubmitter';

// EXPORTS
export function links() {
	return [...buttonLinks(), ...contactFormFieldsLinks(), { rel: 'stylesheet', href: styles }];
}

export const ContactFormModal: React.FC = () => {
	// HOOKS - GLOBAL
	const fetchContactAction = useFetcher();
	const { setContactFormSubmitter } = useContactFormSubmitter()!;

	// HOOKS - REF
	const ref = React.useRef<HTMLFormElement>(null);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (isLoading && !fetchContactAction?.data?.errors) {
			// hide();
		}
	}, [fetchContactAction]);

	React.useEffect(() => {
		const data = fetchContactAction?.submission?.formData;
		const name = data?.get('name_first');

		if (typeof name === 'string' && isLoading) {
			setContactFormSubmitter(name);
		}
	}, [fetchContactAction]);

	// Constants
	const isLoading = fetchContactAction.state === 'loading';

	return (
		<div className='jdg-contact-form-container modal'>
			<h3>Say hello</h3>
			<fetchContactAction.Form
				action='/contact'
				className='jdg-contact-form'
				method='post'
				ref={ref}
			>
				<ContactFormFields data={fetchContactAction.data} />
				<Button isLoading={fetchContactAction.state === 'submitting'} type='submit'>
					Send now
				</Button>
			</fetchContactAction.Form>
		</div>
	);
};

export { ErrorBoundary } from 'components/ErrorBoundary';
