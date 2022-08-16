import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

// STYLESHEETS
import globalStyles from './theme/global.css';
import themes from './theme/themes.css';
import variables from './theme/variables.css';

// CONTEXT
import { ThemeProvider } from './theme';

export function links() {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: variables },
		{ rel: 'stylesheet', href: globalStyles },
	];
}

export const meta = () => ({
	charset: 'utf-8',
	title: 'Joshua D. Graber | Writer & JavaScript Developer',
	viewport: 'width=device-width,initial-scale=1',
});

function App() {
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

export default function AppWrapped() {
	return (
		<ThemeProvider>
			<App />
		</ThemeProvider>
	);
}
