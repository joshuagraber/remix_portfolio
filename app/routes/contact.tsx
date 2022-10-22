import { json } from '@remix-run/node';
import React from 'react';
import styles from '../styles/index.css';
import { useActionData, useNavigate } from '@remix-run/react';

// SERVICES
import { sendMail } from 'services/mailer.server';

// COMPONENTS
import { ContactForm, links as contactFormLinks } from '../components/ContactForm';
import { ContainerCenter, links as containerCenterLinks } from '../components/ContainerCenter';

// TYPES
import type { ActionFunction, LinksFunction, MetaFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types.client';

export const action: ActionFunction = async ({ request }) => {
	const submission: FormData = await request.formData();

	const name: string = submission.get('name')?.toString() ?? '';
	const email: string = submission.get('email')?.toString() ?? '';
	const message: string = submission.get('message')?.toString() ?? '';

	// TODO: verify each field, throw errors if they are not correct.

	try {
		const response = await sendMail({
			from: `${name} <${process.env.SMTP_EMAIL_FROM}>`,
			to: process.env.SMTP_SEND_TO,
			replyTo: email,
			subject: 'Message from contact form',
			// TODO: Create template and render to html string
			text: message,
		});

		return json(response, { status: 200 });
	} catch (error) {
		return json(error, { status: 400 });
	}
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...contactFormLinks(), ...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return {
		description: 'Send an email to Joshua D. Graber',
		title: 'Joshua D. Graber | Contact',
	};
};

export const handle: Handle = { animatePresence: true, dynamicLinks, ref: React.createRef() };

export default function Contact(): React.ReactElement {
	// HOOKS - GLOBAL
	const navigate = useNavigate();

	// HOOKS - REMIX
	const formData = useActionData();

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (typeof formData === 'undefined') {
			return;
		}

		// Refactor when new form component built
	}, [formData]);

	return (
		<ContainerCenter className='jdg-contact-container-center'>
			<ContactForm data={formData} type='page' />
		</ContainerCenter>
	);
}
