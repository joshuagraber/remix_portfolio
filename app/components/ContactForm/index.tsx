// TODO: Add client-side validation.
// GLOBALS
import styles from '../../styles/contact-form.css';

// COMPONENTS
import { ContactFormPage, links as contactFormPageLinks } from './Page';
import { ContactFormModal, links as ContactFormModalLinks } from './Modal';
import type { LinksFunction } from '@remix-run/node';

// EXPORTS
export const links: LinksFunction = () => {
	return [
		...contactFormPageLinks(),
		...ContactFormModalLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

interface Props {
	data?: FormData;
	hide?: () => void;
	type: string;
}

// TODO: This is actually dumb. Just use the modal one in the modal, and the page one in the page.
export const ContactForm: React.FC<Props> = ({ type = 'page', data, hide }) => {
	switch (type) {
		case 'page':
			return (data && <ContactFormPage data={data} />) || null;
		case 'modal':
			return (hide && <ContactFormModal hide={hide} />) || null;
		default:
			return null;
	}
};
