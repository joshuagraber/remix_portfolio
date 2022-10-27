// COMPONENTS
import { ContactFormModal, links as contactFormModalLinks } from 'components/ContactForm/Modal';
import { Modal, links as modalLinks } from 'components/Modal';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	hide: () => void;
	isVisible: boolean;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...contactFormModalLinks(), ...modalLinks()];
};

export const ModalContactForm: React.FC<Props> = ({ hide, isVisible }) => {
	return (
		<Modal hide={hide} isVisible={isVisible}>
			<ContactFormModal hide={hide} />
		</Modal>
	);
};
