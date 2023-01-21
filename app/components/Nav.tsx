// GLOBALS
import React from 'react';
import { NavLink } from '@remix-run/react';
import styles from 'styles/nav.css';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	isMobile: boolean;
}
// CONSTANTS
import { NAV_ROUTES } from 'utils/constants';
import clsx from 'clsx';
const ACTIVE_CLASS_NAME = 'jdg-nav-link-active';
const CLASS_NAME = 'jdg-nav-link';

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Nav: React.FC<Props> = ({ isMobile }) => {
	// HOOKS - GLOBAL

	return (
		<nav className='jdg-nav'>
			<menu className='jdg-nav-menu'>
				<ul>
					{NAV_ROUTES.map((route) => {
						const routeTitleCased = route[0].toUpperCase() + route.slice(1);
						return (
							<li key={route}>
								<NavLink
									className={({ isActive }) => clsx(CLASS_NAME, isActive && ACTIVE_CLASS_NAME)}
									prefetch='intent'
									role='menuitem'
									to={`/${route}`}
								>
									{routeTitleCased}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</menu>
		</nav>
	);
};
