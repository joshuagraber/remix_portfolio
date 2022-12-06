// COMPONENTS
import { ContactFormModal, links as contactFormModalLinks } from 'components/ContactForm/Modal';
import { Modal, links as modalLinks } from 'components/Modal';

// HOOKS
import { useToggleContactModal } from 'hooks/useModalPath';

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
	const { close } = useToggleContactModal();

	return (
		<Modal isVisible={isVisible} pathToClose={close}>
			<ContactFormModal />
		</Modal>
	);
};
