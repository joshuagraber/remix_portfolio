// GLOBALS
import styles from 'styles/contact-form.css';
import React from 'react';
import { Form, useTransition } from '@remix-run/react';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContactFormFields, links as contactFormFieldsLinks } from './Fields';

// TYPES
import { LinksFunction } from '@remix-run/node';
import { RouteActionDataSelf } from 'types/types.server';
import { useContactFormSubmitter } from 'hooks/useContactFormSubmitter';
import { StatusMessage, StatusMessageTypes } from 'components/StatusMessage';

// EXPORTS
export const links: LinksFunction = () => {
	return [...buttonLinks(), ...contactFormFieldsLinks(), { rel: 'stylesheet', href: styles }];
};

export const ContactForm: React.FC<RouteActionDataSelf> = ({ data }) => {
	// HOOKS - GLOBAL
	const transition = useTransition();
	const { setContactFormSubmitter } = useContactFormSubmitter();

	// // HOOKS - STATE
	// Deriving state because data only returns when submission made,
	// and we want to clear errors as we have them
	const [errorState, setErrorState] = React.useState(data?.errors);
	const [fieldsState, setFieldsState] = React.useState(data?.fields);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setErrorState(data?.errors);
		setFieldsState(data?.fields);
	}, [data]);

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
				<StatusMessage message={errorState?.form} type={StatusMessageTypes.ERROR} />
				<ContactFormFields data={{ errors: errorState, fields: fieldsState }} />
				<Button isLoading={isSubmitting ?? isLoading} type='submit'>
					Send Now
				</Button>
			</Form>
		</div>
	);
};

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
