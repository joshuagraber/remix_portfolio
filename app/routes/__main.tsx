// GLOBALS
import styles from 'styles/layout.css';

// COMPONENTS
import { AnimatePresence } from 'components/AnimatePresence';
import { Header, links as headerLinks } from 'components/Header';
import { Footer, links as footerLinks } from 'components/Footer';
import { ModalContactForm, links as modalContactFormLinks } from 'components/ModalContactForm';

// CONTEXT
import { useAppContext } from 'context/app';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
	return [
		...headerLinks(),
		...footerLinks(),
		...modalContactFormLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

export default function Layout(): JSX.Element {
	// HOOKS - CONTEXT
	// TODO: find a "Remixy" route way. Params? Splat?
	const { isContactModalDisplayed, setIsContactModalDisplayed } = useAppContext()!;

	return (
		<>
			<Header />
			{/* Route outlet via AnimatePresence component */}
			<AnimatePresence />
			<Footer />
			<ModalContactForm
				hide={() => setIsContactModalDisplayed(false)}
				isVisible={isContactModalDisplayed}
			/>
		</>
	);
}
