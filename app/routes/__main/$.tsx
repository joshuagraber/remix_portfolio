import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = ({ request }) => {
	console.log('redirecting from unknown route:', { url: request.url });
	return redirect('/');
};
