// GLOBALS
import { useLocation, useMatches, useOutlet } from '@remix-run/react';
import styles from '../../styles/layout.css';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

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

export const Layout = () => {
	// HOOKS - CONTEXT
	const { isContactModalDisplayed, setIsContactModalDisplayed } = useIsContactModalDisplayed();

	// HOOKs - GLOBAL
	const { pathname } = useLocation();

	// HOOKS - REMIX
	const outlet = useOutlet();

	// VARS
	const routeMatch = useMatches().find(
		(match) => match.pathname === pathname && match.id !== 'root'
	);

	const { animatePresence, ref } = routeMatch.handle;
	const timeout = animatePresence ? 300 : 0;

	return (
		<>
			<Header />
			<SwitchTransition>
				<CSSTransition
					classNames='jdg-main'
					key={pathname}
					nodeRef={ref}
					timeout={timeout}
					unmountOnExit
				>
					{() => {
						return (
							<main className='jdg-main' ref={ref}>
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
