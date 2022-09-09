import React from 'react';
import { Form } from '@remix-run/react';
import styles from './styles.css';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}
const ContactFormPage = ({ formData }) => {
	return (
		<div className='jdg-contact-form-container'>
			<Form className='jdg-contact-form' method='post'>
				<fieldset className='jdg-contact-form-input-fields'>
					<legend>Contact me</legend>
					<label htmlFor='name'>Your Name</label>
					<input type='text' name='name' placeholder='Jamie Doe' />
					<label htmlFor='email'>Your Email</label>
					<input type='text' name='email' placeholder='jamie@email.com' />
					<label htmlFor='message'>Your message</label>
					<textarea name='message' placeholder='Type your message here' />
				</fieldset>
				<button type='submit'>Say hello</button>
			</Form>
			{/* TODO: convert this to a toast message, overlay on top of the form, or otherwise remove from page after short time */}
			{formData && (
				<div className='jdg-contact-form-thank-you'>
					<p>{formData.thankYouMessage}</p>
				</div>
			)}
		</div>
	);
};

const ContactFormModal = ({ fetcher, formData }) => {
	return (
		<div className='jdg-contact-form-container'>
			<fetcher.Form action='/contact' className='jdg-contact-form' method='post'>
				<fieldset className='jdg-contact-form-input-fields'>
					<legend>Contact me</legend>
					<label htmlFor='name'>Your Name</label>
					<input type='text' name='name' placeholder='Jamie Doe' />
					<label htmlFor='email'>Your Email</label>
					<input type='text' name='email' placeholder='jamie@email.com' />
					<label htmlFor='message'>Your message</label>
					<textarea name='message' placeholder='Type your message here' />
				</fieldset>
				<button type='submit'>Say hello</button>
			</fetcher.Form>
			{/* TODO: convert this to a toast message, overlay on top of the form, or otherwise remove from page after short time */}
			{formData && (
				<div className='jdg-contact-form-thank-you'>
					<p>{formData.thankYouMessage}</p>
				</div>
			)}
		</div>
	);
};

export const ContactForm = ({ type = 'page', ...rest }) => {
	switch (type) {
		case 'page':
			return <ContactFormPage {...rest} />;
		case 'modal':
			return <ContactFormModal {...rest} />;
		default:
			return null;
	}
};
