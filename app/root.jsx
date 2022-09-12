import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

// STYLESHEETS
import globalStyles from './theme/global.css';
import themes from './theme/themes.css';

// CONTEXT
import { ThemeProvider } from './theme';

export function links() {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
	];
}

export const meta = () => ({
	charset: 'utf-8',
	title: 'Joshua D. Graber | Writer & JavaScript Developer',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
	return (
		<ThemeProvider>
			<html lang='en'>
				<head>
					<Meta />

					<Links />
				</head>

				<body>
					<div id='app'>
						<Outlet />

						<ScrollRestoration />

						<Scripts />

						<LiveReload />
					</div>
				</body>
			</html>
		</ThemeProvider>
	);
}
