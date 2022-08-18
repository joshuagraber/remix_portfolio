// GLOBALS
import { NavLink } from '@remix-run/react';
import styles from './styles.css';
import { NAV_ROUTES } from './data';

// CONSTANTS
const CLASS_NAME = 'jdg-nav-link';
const ACTIVE_CLASS_NAME = 'jdg-nav-link-active';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Nav = () => {
	return (
		<nav className='jdg-nav'>
			{NAV_ROUTES.map((route) => {
				const routeTitleCased = route[0].toUpperCase() + route.slice(1);
				return (
					<NavLink
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
		</nav>
	);
};
