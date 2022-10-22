// GLOBALS
import React, { EventHandler } from 'react';
import { NavLink } from '@remix-run/react';
import styles from 'styles/nav.css';

// EXTERNAL LIBS
import { getWindow } from 'ssr-window';
import { useLink } from 'react-aria';

// HOOKS
import { useEffectDidUpdate } from 'hooks/useEffectDidUpdate';

// COMPONENTS
import { Chevron } from 'components/SVG/Chevron';

// UTILS
import { handleKeyDownLikeClick } from 'utils/utils.client';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	isMobile: boolean;
}
interface NavLinkProps {
	route: string;
}

// CONSTANTS
import { NAV_ROUTES } from 'utils/constants';
const ACTIVE_CLASS_NAME = 'jdg-nav-link-active';
const CLASS_NAME = 'jdg-nav-link';

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Nav: React.FC<Props> = ({ isMobile }) => {
	// HOOKS - GLOBAL
	const window = getWindow();
	const navRef = React.useRef<HTMLElement>(null);

	// HOOKS - STATE
	const [isExpanded, setIsExpanded] = React.useState(false);

	// HOOKS - EFFECTS
	// Always force expanded state on desk
	React.useEffect(() => {
		if (!isMobile) {
			setIsExpanded(true);
		}
	}, [isMobile]);

	/* Leave collapsed on mobile on first render,
	 listen for re-size after that. */
	useEffectDidUpdate(() => {
		if (isMobile) {
			setIsExpanded((wasExpanded) => !wasExpanded);
		}
	}, [isMobile]);

	// If it's open and on mobile, we close it on a click anywhere other than the nav
	useEffectDidUpdate(() => {
		if (isMobile && isExpanded) {
			window.addEventListener('click', coerceClickEvent);
			window.addEventListener('keydown', coerceKeydownEvent);

			return () => {
				window.removeEventListener('click', coerceClickEvent);
				window.removeEventListener('keydown', coerceKeydownEvent);
			};
		}

		function clearingClick(event: React.MouseEvent | React.KeyboardEvent) {
			const isNavClick =
				navRef?.current?.contains(event?.target as Node) ?? event?.target === navRef.current;

			if (!isNavClick && isMobile) {
				event.stopPropagation();
				setIsExpanded(false);
			}
		}

		function clearingKeypress(event: React.KeyboardEvent) {
			handleKeyDownLikeClick(clearingClick, event);
		}

		function coerceClickEvent(event: MouseEvent) {
			clearingClick(event as unknown as React.MouseEvent);
		}
		function coerceKeydownEvent(event: KeyboardEvent) {
			clearingKeypress(event as unknown as React.KeyboardEvent);
		}
	}, [isExpanded, isMobile]);

	// HANDLER
	const onClick = () => {
		setIsExpanded((wasExpanded) => !wasExpanded);
	};

	const onLinkClick = () => {
		if (isMobile) {
			onClick();
		}
	};

	// SUBCOMPONENT
	const AriaNavLink: React.FC<NavLinkProps> = ({ route }) => {
		const navLinkRef = React.useRef<HTMLAnchorElement>(null);
		const ariaProps = {
			elementType: 'a',
		};

		const { linkProps } = useLink(ariaProps, navLinkRef);

		const routeTitleCased = route[0].toUpperCase() + route.slice(1);

		return (
			<NavLink
				{...linkProps}
				aria-hidden={!isExpanded}
				className={({ isActive }) =>
					isActive ? `${CLASS_NAME} ${ACTIVE_CLASS_NAME}` : `${CLASS_NAME}`
				}
				onClick={onLinkClick}
				prefetch='intent'
				ref={navLinkRef}
				role='menuitem'
				tabIndex={isExpanded ? 0 : -1}
				to={`/${route}`}
			>
				{routeTitleCased}
			</NavLink>
		);
	};

	return (
		<nav className='jdg-nav' ref={navRef}>
			<button
				aria-controls='jdg-nav-menu'
				aria-expanded={isExpanded}
				className='jdg-nav-open-button'
				onClick={onClick}
				tabIndex={0}
				type='button'
			>
				<Chevron direction='down' />
			</button>
			<menu aria-hidden={!isExpanded} className='jdg-nav-menu' id='jdg-nav-menu'>
				{NAV_ROUTES.map((route) => {
					return <AriaNavLink key={route} route={route} />;
				})}
			</menu>
		</nav>
	);
};
