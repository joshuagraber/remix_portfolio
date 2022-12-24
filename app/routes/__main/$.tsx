import { redirect } from '@remix-run/node';
import { pathedRoutes } from 'other-routes.server';

import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ request }) => {
	// Explicitly check pathedRoutes first
	if (pathedRoutes[new URL(request.url).pathname]) return null;

	// If it doesn't exist there, redirect
	console.log('redirecting from unknown route:', { url: request.url });
	return redirect('/');
};

export default function noop() {
	return null;
}
