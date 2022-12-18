// COMPONENTS
import { ContactFormModal, links as contactFormModalLinks } from 'components/ContactForm/Modal';
import { Modal, links as modalLinks } from 'components/Modal';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	isVisible: boolean;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...contactFormModalLinks(), ...modalLinks()];
};

export const ModalContactForm: React.FC<Props> = ({ isVisible }) => {
	return (
		<Modal isVisible={isVisible} param='contact'>
			<ContactFormModal />
		</Modal>
	);
};

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
