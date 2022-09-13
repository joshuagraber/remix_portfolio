import React from 'react';

// COMPONENTS
import { ContactForm, links as contactFormLinks } from '../ContactForm';
import { Modal, links as modalLinks } from '../Modal';

// EXPORTS
export function links() {
	return [...contactFormLinks(), ...modalLinks()];
}

export const ModalContactForm = ({ hide, isVisible }) => {
	return (
		<Modal hide={hide} isVisible={isVisible}>
			<ContactForm hide={hide} type='modal' />
		</Modal>
	);
};
