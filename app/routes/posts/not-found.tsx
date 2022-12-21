// GLOBALS
import { useLocation } from '@remix-run/react';

// COMPONENTS
import { Header, links as headerLinks } from 'components/Header';
import { Footer, links as footerLinks } from 'components/Footer';

// TYPES
import type { LinksFunction } from '@remix-run/node';

// EXPORTS
export const links: LinksFunction = () => {
	return [...headerLinks(), ...footerLinks()];
};

export const NotFound = () => {
	const location = useLocation();
	return (
		<div className='jdg-page jdg-page-post'>
			<Header />
			<NotFound />
			<Footer path={location.pathname + location.search} />
		</div>
	);
};
