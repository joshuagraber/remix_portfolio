// GLOBALS
import { NavLink, Outlet, useMatches } from '@remix-run/react';
import styles from 'styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { links as buttonLinks } from 'components/Button';
import { links as inputLinks } from 'components/Input';

// SERVICES
import * as authenticator from 'services/auth.server';

// TYPES
import type { LinksFunction, LoaderFunction } from '@remix-run/node';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	return await authenticator.requireUserId(request);
};

export const links: LinksFunction = () => {
	// Adding input & button links here to avoid on every branching route
	return [
		...buttonLinks(),
		...inputLinks(),
		...containerCenterLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

export default function Admin() {
	const matches = useMatches();
	const getActiveRoute = () => {
		const routesToMatch = ['users', 'images', 'blog'];
		return routesToMatch.find((route) => matches.some((match) => match.pathname.includes(route)));
	};

	const activeRoute = getActiveRoute();

	return (
		<ContainerCenter className='jdg-admin-container-center jdg-admin'>
			<h2>Hello from Admin</h2>
			<div className='jdg-admin-container'>
				<div className='jdg-admin-sidebar'>
					<nav className='jdg-admin-nav'>
						{/* Users */}
						<ul className='jdg-admin-nav-primary-list'>
							<li className='jdg-admin-nav-primary-link'>
								<NavLink to='users'>Edit Users</NavLink>
							</li>
							{activeRoute === 'users' && (
								<ul className='jdg-admin-nav-secondary-list'>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='users/create'>Create user</NavLink>
									</li>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='users/update'>Update or delete user</NavLink>
									</li>
								</ul>
							)}
						</ul>

						{/* Images */}
						<ul className='jdg-admin-nav-primary-list'>
							<li className='jdg-admin-nav-primary-link'>
								<NavLink to='images'>Edit Images</NavLink>
							</li>
							{activeRoute === 'images' && (
								<ul className='jdg-admin-nav-secondary-list'>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='images/create'>Upload new image</NavLink>
									</li>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='images/update'>Update or delete images</NavLink>
									</li>
								</ul>
							)}
						</ul>

						{/* Blog */}
						<ul className='jdg-admin-nav-primary-list'>
							<li className='jdg-admin-nav-primary-link'>
								<NavLink to='blog'>Edit Blog</NavLink>
							</li>
							{activeRoute === 'blog' && (
								<ul className='jdg-admin-nav-secondary-list'>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='blog/create'>Create a new post</NavLink>
									</li>
									<li className='jdg-admin-nav-secondary-link'>
										<NavLink to='blog/update'>Update or delete a post</NavLink>
									</li>
								</ul>
							)}
						</ul>
					</nav>
				</div>

				<main className='jdg-admin-main'>
					<Outlet />
				</main>
			</div>
		</ContainerCenter>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
