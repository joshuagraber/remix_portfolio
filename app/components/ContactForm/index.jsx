// TODO: Add client-side validation.
// GLOBALS
import styles from './styles.css';

// COMPONENTS
import { ContactFormPage } from './FormPage';
import { ContactFormModal } from './FormModal';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
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
