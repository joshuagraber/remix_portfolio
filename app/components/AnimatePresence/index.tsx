// GLOBALS
import { Outlet, useLocation, useMatches, useOutlet } from '@remix-run/react';

// COMPONENTS
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const AnimatePresence = () => {
	// HOOKs - GLOBAL
	const { pathname } = useLocation();

	// VARS
	const routeMatch = useMatches().find(
		(match) => match.pathname === pathname && match.id !== 'root'
	);

	const handle = routeMatch?.handle;
	const timeout = handle?.animatePresence ? 300 : 0;

	return (
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
							<Outlet />
						</main>
					);
				}}
			</CSSTransition>
		</SwitchTransition>
	);
};
