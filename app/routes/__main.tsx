// GLOBALS
import styles from 'styles/index.css';

// COMPONENTS
import { AnimatePresence } from 'components/AnimatePresence';
import { Header, links as headerLinks } from 'components/Header';
import { Footer, links as footerLinks } from 'components/Footer';

// TYPES
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
	return [...headerLinks(), ...footerLinks(), { rel: 'stylesheet', href: styles }];
};

export default function Layout(): JSX.Element {
	return (
		<div className='jdg-page'>
			<Header />
			<AnimatePresence />
			<Footer />
		</div>
	);
}
