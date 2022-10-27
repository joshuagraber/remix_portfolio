// GLOBALS
import { useLocation, useMatches, useOutlet } from '@remix-run/react';
import styles from '../../styles/layout.css';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

// COMPONENTS
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

export const Layout: React.FC = () => {
	// HOOKS - CONTEXT
	// TODO: find a "Remixy" route way. Params? Splat?
	const { isContactModalDisplayed, setIsContactModalDisplayed } = useAppContext()!;

	// HOOKs - GLOBAL
	const { pathname } = useLocation();

	// HOOKS - REMIX
	const outlet = useOutlet();

	// VARS
	const routeMatch = useMatches().find(
		(match) => match.pathname === pathname && match.id !== 'root'
	);

	const handle = routeMatch?.handle;
	const timeout = handle?.animatePresence ? 300 : 0;

	return (
		<>
			<Header />
			<SwitchTransition>
				<CSSTransition
					classNames='jdg-main'
					key={pathname}
					nodeRef={handle?.ref}
					timeout={timeout}
					unmountOnExit
				>
					{() => {
						return (
							<main className='jdg-main' ref={handle?.ref}>
								{outlet}
							</main>
						);
					}}
				</CSSTransition>
			</SwitchTransition>
			<Footer />
			<ModalContactForm
				hide={() => setIsContactModalDisplayed(false)}
				isVisible={isContactModalDisplayed}
			/>
		</>
	);
};
