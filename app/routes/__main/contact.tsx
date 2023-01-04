import { json, LoaderFunction, redirect } from '@remix-run/node';
import styles from 'styles/contact.css';
import React from 'react';
import { useActionData } from '@remix-run/react';

// COMPONENTS
import { ContactForm, links as contactFormLinks } from 'components/ContactForm';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// SERVICES
import { sendMail } from 'services/mailer.server';

// UTILS
import { titleCase } from 'utils/utils';
import { stripParamsAndHash, isValidEmail, isValidInputLength } from 'utils/utils.server';

// TYPES
type ContactErrors = Record<string, string | undefined>;
import type { ActionFunction, LinksFunction, MetaFunction } from '@remix-run/node';
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types';

// EXPORTS
export const action: ActionFunction = async ({ request }) => {
	const errors: ContactErrors = {};

	const submission: FormData = await request.formData();
	const fields = Object.fromEntries(submission);

	if (typeof submission === 'undefined') {
		errors.form = 'No submission found';
		return json({ errors, fields }, 404);
	}

	// Form fields
	const { name_first, name_last, email, message } = fields;
	const name = `${name_first} ${name_last}`;

	for (let input in fields) {
		if (!isValidInputLength(fields[input], 1)) {
			const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
			errors[input] = `Your ${fieldNameForDisplay} is required.`;
		}
	}

	if (!isValidEmail(email)) {
		errors.email = 'Please provide a valid email address.';
	}

	if (Object.values(errors).some(Boolean)) {
		return json({ errors, fields }, { status: 422 });
	}

	try {
		const response = await sendMail({
			from: `${name} <${email}>`,
			to: process.env.SMTP_SEND_TO,
			replyTo: email.toString(),
			subject: 'Message from Website Contact Form',
			// TODO: Create template and render to html string
			text: message.toString(),
		});

		if (response.accepted.length >= 1) {
			return json(
				{ fields },
				{
					status: 302,
					headers: {
						Location: '/contact/success',
					},
				}
			);
		}
	} catch (error: any) {
		console.error('Error trying to send mail:', { error });
		return json({
			errors: {
				form: 'There was an error trying to send email, please try again.',
			},
			fields,
		});
	}
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...contactFormLinks(), ...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const handle: Handle = { animatePresence: true, dynamicLinks, ref: React.createRef() };

export const loader: LoaderFunction = ({ request }) => {
	return { canonical: stripParamsAndHash(request.url) };
};

export const meta: MetaFunction = () => {
	return {
		description: 'Send an email to Joshua D. Graber',
		title: 'Joshua D. Graber | Contact',
	};
};

export default function Contact(): React.ReactElement {
	// HOOKS - REMIX
	const formData = useActionData();

	return (
		<ContainerCenter className='jdg-contact-container-center'>
			<ContactForm data={formData} />
		</ContainerCenter>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
