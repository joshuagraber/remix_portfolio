// GLOBALS
import { node } from 'prop-types';
import styles from './styles.css';

// COMPONENTS
import { Header, links as headerLinks } from '../Header';
import { Footer, links as footerLinks } from '../Footer';
import { ModalContactForm, links as modalContactFormLinks } from '../ModalContactForm';

// CONTEXT
import { useIsContactModalDisplayed } from '~/context';

export function links() {
	return [
		...headerLinks(),
		...footerLinks(),
		...modalContactFormLinks(),
		{ rel: 'stylesheet', href: styles },
	];
}

export const Layout = ({ children }) => {
	// CONTEXT
	const { isContactModalDisplayed, setIsContactModalDisplayed } = useIsContactModalDisplayed();

	return (
		<>
			<Header />
			<main className='jdg-main'>{children}</main>
			<Footer />
			<ModalContactForm
				hide={() => setIsContactModalDisplayed(false)}
				isVisible={isContactModalDisplayed}
			/>
		</>
	);
};

Layout.propTypes = {
	children: node.isRequired,
};
