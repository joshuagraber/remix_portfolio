// COMPONENTS
import { ContactForm, links as contactFormLinks } from 'components/ContactForm';
import { Modal, links as modalLinks } from 'components/Modal';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	hide: () => void;
	isVisible: boolean;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...contactFormLinks(), ...modalLinks()];
};

export const ModalContactForm: React.FC<Props> = ({ hide, isVisible }) => {
	return (
		<Modal hide={hide} isVisible={isVisible}>
			<ContactForm hide={hide} type='modal' />
		</Modal>
	);
};
