// GLOBALS
import React from 'react';
import { NavLink } from '@remix-run/react';
import { bool } from 'prop-types';
import styles from './styles.css';

// EXTERNAL LIBS
import { getWindow } from 'ssr-window';

// HOOKS
import { useEffectDidUpdate } from '~/hooks/useEffectDidUpdate';
import { useTheme } from '~/theme';

// COMPONENTS
import { Chevron } from '../SVG/Chevron';

// UTILS
import { handleKeyDownLikeClick } from '~/utils/utils';

// CONSTANTS
import { NAV_ROUTES } from '../../utils/constants';
const ACTIVE_CLASS_NAME = 'jdg-nav-link-active';
const CLASS_NAME = 'jdg-nav-link';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Nav = ({ isMobile }) => {
	const window = getWindow();
	// HOOKS - STATE
	const [isExpanded, setIsExpanded] = React.useState(false);

	// HOOKS - CUSTOM
	const { theme } = useTheme();

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
			window.addEventListener('click', clearingClick);
			window.addEventListener('keydown', clearingKeypress);

			return () => {
				window.removeEventListener('click', clearingClick);
				window.removeEventListener('keydown', clearingKeypress);
			};
		}

		function clearingClick(event) {
			if (!event?.target?.classList?.contains('jdg-nav-link')) {
				event.preventDefault();
			}
			event.stopPropagation();

			if (!event?.target?.classList?.contains('jdg-nav')) {
				setIsExpanded(false);
			}
		}

		function clearingKeypress(event) {
			handleKeyDownLikeClick(clearingClick, event);
		}
	}, [isExpanded, isMobile]);

	// VARS
	const chevronDirection = isExpanded ? 'up' : 'down';
	const chevronStroke = theme === 'jdg-light-mode' ? 'black' : 'white';

	// HANDLER
	const onClick = () => {
		setIsExpanded((wasExpanded) => !wasExpanded);
	};

	return (
		<nav className='jdg-nav'>
			<button
				aria-controls='jdg-nav-menu'
				aria-expanded={isExpanded}
				className='jdg-nav-open-button'
				onClick={onClick}
				tabIndex='0'
				type='button'
			>
				<Chevron direction={chevronDirection} stroke={chevronStroke} />
			</button>
			<menu aria-hidden={!isExpanded} className='jdg-nav-menu' id='jdg-nav-menu'>
				{NAV_ROUTES.map((route) => {
					const routeTitleCased = route[0].toUpperCase() + route.slice(1);
					return (
						<NavLink
							aria-hidden={!isExpanded}
							className={({ isActive }) =>
								isActive ? `${CLASS_NAME} ${ACTIVE_CLASS_NAME}` : `${CLASS_NAME}`
							}
							key={route}
							prefetch='intent'
							role='menuitem'
							tabIndex={isExpanded ? '0' : '-1'}
							to={`/${route}`}
						>
							{routeTitleCased}
						</NavLink>
					);
				})}
			</menu>
		</nav>
	);
};

Nav.propTypes = {
	isMobile: bool.isRequired,
};
