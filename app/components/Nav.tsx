// GLOBALS
import React from 'react';
import { NavLink } from '@remix-run/react';
import styles from 'styles/nav.css';

// EXTERNAL LIBS
import { getWindow } from 'ssr-window';

// HOOKS
import { useEffectDidUpdate } from 'hooks/useEffectDidUpdate';

// COMPONENTS
import { Chevron } from 'components/SVG/Chevron';

// UTILS
import { handleKeyDownLikeClick } from 'utils/utils';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	isMobile: boolean;
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

	return (
		<nav className='jdg-nav'>
			<menu className='jdg-nav-menu'>
				<ul>
					{NAV_ROUTES.map((route) => {
						const routeTitleCased = route[0].toUpperCase() + route.slice(1);
						return (
							<li key={route}>
								<NavLink
									// TODO: use CLSX instead
									className={({ isActive }) =>
										isActive ? `${CLASS_NAME} ${ACTIVE_CLASS_NAME}` : `${CLASS_NAME}`
									}
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
