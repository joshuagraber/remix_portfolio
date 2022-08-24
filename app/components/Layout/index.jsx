// GLOBALS
import { node } from 'prop-types';
import styles from './styles.css';

// COMPONENTS
import { Header, links as headerLinks } from '../Header';
import { Footer, links as footerLinks } from '../Footer';

export function links() {
	return [...headerLinks(), ...footerLinks(), { rel: 'stylesheet', href: styles }];
}

export const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className='jdg-main'>{children}</main>
			<Footer />
		</>
	);
};

Layout.propTypes = {
	children: node.isRequired,
};
