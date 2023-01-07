// GLOBALS
import styles from 'styles/contact-form.css';
import React from 'react';
import { Form, useTransition } from '@remix-run/react';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContactFormFields, links as contactFormFieldsLinks } from './Fields';
import { StatusMessage, StatusMessageTypes } from 'components/StatusMessage';

// HOOKS
import { useContactFormSubmitter } from 'hooks/useContactFormSubmitter';

// TYPES
import { LinksFunction } from '@remix-run/node';
import { RouteActionDataSelf } from 'types/types.server';

// EXPORTS
export const links: LinksFunction = () => {
	return [...buttonLinks(), ...contactFormFieldsLinks(), { rel: 'stylesheet', href: styles }];
};

export const ContactForm: React.FC<RouteActionDataSelf> = ({ data }) => {
	// HOOKS - GLOBAL
	const transition = useTransition();
	const { setContactFormSubmitter } = useContactFormSubmitter();

	React.useEffect(() => {
		const data = transition.submission?.formData;
		const name = data?.get('name_first');

		if (typeof name === 'string' && isLoading) {
			setContactFormSubmitter(name);
		}
	}, [transition]);

	// VARS
	const isLoading = transition.state === 'loading';
	const isSubmitting = transition.state === 'submitting';

	return (
		<div className='jdg-contact-form-container'>
			<h3>Say hello</h3>
			<Form className='jdg-contact-form' method='post'>
				{/* TODO: Update StatusMessage to accept timeout prop, to fade message out
				 * after a particular duration if passed */}
				<StatusMessage message={data?.errors?.form} type={StatusMessageTypes.ERROR} />
				<ContactFormFields data={{ errors: data?.errors, fields: data?.fields }} />
				<Button isLoading={isSubmitting ?? isLoading} type='submit'>
					Send Now
				</Button>
			</Form>
		</div>
	);
};

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
