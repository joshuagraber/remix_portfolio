// GLOBALS
import React from 'react';
import { NavLink } from '@remix-run/react';
import styles from './styles.css';

// EXTERNAL LIBS
import clsx from 'clsx';

// HOOKS
import { useTheme } from '~/theme';

// COMPONENTS
import { Chevron } from '../SVG/Chevron';

// CONSTANTS
import { NAV_ROUTES } from './data';
const ACTIVE_CLASS_NAME = 'jdg-nav-link-active';
const CLASS_NAME = 'jdg-nav-link';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Nav = ({ isMobile }) => {
	// HOOKS - STATE
	const [isExpanded, setIsExpanded] = React.useState(true);

	// HOOKS - CUSTOM
	const { theme } = useTheme();

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (isMobile) {
			setIsExpanded(false);
		}
	}, [isMobile]);

	// CLASSES
	const classes = clsx('jdg-nav', {
		'jdg-nav-mobile': isMobile,
	});

	// VARS
	const chevronDirection = isExpanded ? 'up' : 'down';
	const chevronStroke = theme === 'jdg-light-mode' ? 'black' : 'white';

	// HANDLER
	const onMenuButtonClick = () => {
		setIsExpanded((wasExpanded) => !wasExpanded);
	};

	return (
		<nav className={classes}>
			<button
				aria-controls='menu-list'
				aria-expanded={isExpanded}
				className='jdg-nav-open-button'
				onClick={onMenuButtonClick}
			>
				<Chevron direction={chevronDirection} stroke={chevronStroke} />
			</button>
			<div className='jdg-nav-links-container'>
				{NAV_ROUTES.map((route) => {
					const routeTitleCased = route[0].toUpperCase() + route.slice(1);
					return (
						<NavLink
							aria-hidden={!isExpanded}
							className={({ isActive }) =>
								isActive ? `${CLASS_NAME} ${ACTIVE_CLASS_NAME}` : `${CLASS_NAME}`
							}
							key={route}
							to={`/${route}`}
						>
							{routeTitleCased}
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
};
