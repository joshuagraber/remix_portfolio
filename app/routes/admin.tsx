// GLOBALS
import { Outlet } from '@remix-run/react';

// SERVICES
import * as authenticator from 'services/auth.server';

// TYPES
import type { LoaderFunction } from '@remix-run/node';

// EXPORTS
export const loader: LoaderFunction = async ({ request }) => {
	return await authenticator.requireUserId(request);
};

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
