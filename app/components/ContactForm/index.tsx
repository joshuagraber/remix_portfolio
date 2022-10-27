// GLOBALS
import styles from 'styles/contact-form.css';
import React from 'react';
import { Form, useTransition } from '@remix-run/react';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContactFormFields, links as contactFormFieldsLinks } from './Fields';

// TYPES
import { LinksFunction } from '@remix-run/node';

// TYPES
import { ContactFormProps } from './types';
import { useAppContext } from 'context/app';

// EXPORTS
export const links: LinksFunction = () => {
	return [...buttonLinks(), ...contactFormFieldsLinks(), { rel: 'stylesheet', href: styles }];
};

export const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
	// HOOKS - GLOBAL
	const transition = useTransition();
	const { setContactFormSubmitter } = useAppContext()!;

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
		const isLoading = transition.state === 'loading';
		const data = transition?.submission?.formData;
		const name = data?.get('first_name');

		if (typeof name === 'string' && isLoading) {
			setContactFormSubmitter(name);
		}
	}, [transition]);

	// VARS
	const isSubmitting = transition.state === 'submitting';

	return (
		<div className='jdg-contact-form-container'>
			<h3>Say hello</h3>
			<Form className='jdg-contact-form' method='post'>
				<ContactFormFields errors={errorState} fields={fieldsState} />
				<Button isLoading={isSubmitting} type='submit'>
					Send Now
				</Button>
			</Form>
		</div>
	);
};