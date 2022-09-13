import React from 'react';
import { json } from '@remix-run/node';
import { useActionData, useNavigate } from '@remix-run/react';
import styles from './styles.css';

// COMPONENTS
import { ContactForm, links as contactFormLinks } from '~/components/ContactForm';
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

// EXPORTS
export async function action({ request }) {
	const submission = await request.formData();

	const name = submission.get('name');
	const email = submission.get('email');
	const message = submission.get('message');

	try {
		// Log is in the server, not browser
		console.log({ name, email, message });

		// TODO:
		// Set up nodemailer async func, import and use here
		return json(
			{
				success: {
					heading: `Thank you for your email, ${name}.`,
					body: 'It has been submitted successfully.',
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		return json(
			{
				error: {
					heading: `Sorry, ${name}, something didn't work.`,
					body: 'Your email failed to send. Please try submitting your message again.',
				},
			},
			{ status: error.status }
		);
	}
}

export function links() {
	return [
		...contactFormLinks(),
		...containerCenterLinks(),
		...layoutLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export const meta = () => ({
	title: 'Joshua D. Graber | Contact',
});

export default function Contact() {
	// HOOKS - NAV
	const navigate = useNavigate();

	// HOOKS - REMIX
	const formData = useActionData();

	// HOOKS - STATE
	const [hasResponseMessageFinishedDisplaying, setHasResponseMessageFinishedDisplaying] =
		React.useState(false);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (typeof formData === 'undefined') {
			return;
		}
		let timeout = null;
		// When success, redirect to /work
		if (formData.success) {
			timeout = setTimeout(() => {
				navigate('/work');
			}, 2500);
		}
		// When error, display error message for 4.5s, then return to form
		if (formData?.error && !hasResponseMessageFinishedDisplaying) {
			timeout = setTimeout(() => {
				setHasResponseMessageFinishedDisplaying(true);
			}, 4500);
		}
		if (timeout) {
			return () => clearTimeout(timeout);
		}
	}, [formData, hasResponseMessageFinishedDisplaying]);

	return (
		<ContainerCenter className='jdg-contact-container-center'>
			<ContactForm
				data={formData}
				isResponseFinished={hasResponseMessageFinishedDisplaying}
				type='page'
			/>
		</ContainerCenter>
	);
}
