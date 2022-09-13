// GLOBALS
import React from 'react';
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';
import { ModalContactForm, links as modalContactFormLinks } from '~/components/ModalContactForm';

// EXPORTS
export function links() {
	return [
		...containerCenterLinks(),
		...layoutLinks(),
		...modalContactFormLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export default function Work() {
	// HOOKS - STATE
	const [isContactModalVisible, setIsContactModalVisible] = React.useState(false);

	return (
		<Layout>
			<ContainerCenter>
				<div onClick={() => setIsContactModalVisible(true)} role='button'>
					Open email modal
				</div>
			</ContainerCenter>
			{/* TODO: Since ModalContactForm can be accesed via Footer
			from anywhere in the app, move to Root and use isContactModalDisplayed
			or w/e as a piece of context that can be accessed from anywhere. */}
			<ModalContactForm
				hide={() => setIsContactModalVisible(false)}
				isVisible={isContactModalVisible}
			/>
		</Layout>
	);
}
