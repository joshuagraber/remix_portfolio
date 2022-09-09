// GLOBALS
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
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

	// Log is in the server, not browser
	console.log({ name, email, message });

	return json({
		thankYouMessage: `Thank you for your email, ${name}. It has been submitted successfully.`,
	});
}

export function links() {
	return [
		...contactFormLinks(),
		...containerCenterLinks(),
		...layoutLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export default function Contact() {
	const formData = useActionData();

	return (
		<Layout>
			<ContainerCenter className='jdg-contact-container-center'>
				<ContactForm formData={formData} type='page' />
			</ContainerCenter>
		</Layout>
	);
}
