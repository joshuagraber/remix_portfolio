// TODO: Add client-side validation.
// GLOBALS
import styles from '../../styles/contact-form.css';

// COMPONENTS
import { ContactFormPage, links as contactFormPageLinks } from './Page';
import { ContactFormModal, links as ContactFormModalLinks } from './Modal';

// EXPORTS
export function links() {
	return [
		...contactFormPageLinks(),
		...ContactFormModalLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

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
