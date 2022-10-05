import React from 'react';
import { json } from '@remix-run/node';
import { useActionData, useNavigate } from '@remix-run/react';
import styles from '../styles/index.css';

// SERVICES
import { sendMail } from '~/services/mailer';

// COMPONENTS
import { ContactForm, links as contactFormLinks } from '~/components/ContactForm';
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// EXPORTS
export async function action({ request }) {
	const submission = await request.formData();

	const name = submission.get('name');
	const email = submission.get('email');
	const message = submission.get('message');

	try {
		await sendMail({
			from: process.env.SMTP_EMAIL_FROM,
			to: process.env.SMTP_SEND_TO,
			replyTo: email,
			subject: 'Message from contact form',
			// TODO: Create template and render to html string
			text: message,
		});

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

export async function loader({ request }) {
	return {
		canonical: request.url,
	};
}

export function dynamicLinks({ data }) {
	return [{ rel: 'canonical', href: data.canonical }];
}

export function links() {
	return [...contactFormLinks(), ...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export function meta() {
	return {
		description: 'Send an email to Joshua D. Graber',
		title: 'Joshua D. Graber | Contact',
	};
}

export const handle = { animatePresence: true, dynamicLinks, ref: React.createRef() };

export default function Contact() {
	// HOOKS - NAV
	const navigate = useNavigate();

	// HOOKS - REMIX
	const formData = useActionData();

	// HOOKS - STATE
	const [isResponseFinished, setIsResponseFinished] = React.useState(false);

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
		if (formData?.error && !isResponseFinished) {
			timeout = setTimeout(() => {
				setIsResponseFinished(true);
			}, 4500);
		}

		if (timeout) {
			return () => clearTimeout(timeout);
		}
	}, [formData, isResponseFinished]);

	return (
		<ContainerCenter className='jdg-contact-container-center'>
			<ContactForm data={formData} isResponseFinished={isResponseFinished} type='page' />
		</ContainerCenter>
	);
}
