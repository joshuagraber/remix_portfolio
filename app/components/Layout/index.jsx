// GLOBALS
import style from './style.css';

// COMPONENTS
import { Header, links as headerLinks } from '../Header';
import { Footer, links as footerLinks } from '../Footer';

export function links() {
	return [...headerLinks(), ...footerLinks(), { rel: 'stylesheet', href: style }];
}

export const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};
