import { Outlet } from '@remix-run/react';

export default function Admin() {
	return (
		<div>
			Hello
			<span>from Admin</span>
			<Outlet />
		</div>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
