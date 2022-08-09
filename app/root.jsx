import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

// Stylesheets
import themes from './theme/themes';
import variables from './theme/variables';

export function links() {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: variables },
	];
}

export const meta = () => ({
	charset: 'utf-8',
	title: 'Joshua D. Graber | Writer & JavaScript Developer',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
	return (
		<html lang='en'>
			<head>
				<Meta />

				<Links />
			</head>

			<body>
				<Outlet />

				<ScrollRestoration />

				<Scripts />

				<LiveReload />
			</body>
		</html>
	);
}
