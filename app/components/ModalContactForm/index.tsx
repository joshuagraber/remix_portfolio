// COMPONENTS
import { ContactFormModal, links as contactFormModalLinks } from 'components/ContactForm/Modal';
import { Modal, links as modalLinks } from 'components/Modal';

// HOOKS
import { useContactModalClose } from 'hooks/useModalPath';

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
	const path = useContactModalClose();

	return (
		<Modal isVisible={isVisible} pathToClose={path}>
			<ContactFormModal />
		</Modal>
	);
};
