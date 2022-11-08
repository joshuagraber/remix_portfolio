// GLOBALS
import { Outlet } from '@remix-run/react';

// EXPORTS
export default function UsersAdmin() {
	return (
		<div>
			<h2>Users</h2>
			<Outlet />
		</div>
	);
}
