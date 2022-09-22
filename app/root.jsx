// GLOBALS
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';

import globalStyles from './styles/global.css';
import themes from './styles/themes.css';

// COMPONENTS
import { Layout, links as layoutLinks } from './components/Layout';

// CONTEXT
import { AppProvider } from './context';
import { ThemeProvider } from './theme';

export function links() {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
		...layoutLinks(),
	];
}

export const meta = () => ({
	charset: 'utf-8',
	title: 'Joshua D. Graber | Writer & JavaScript Developer',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
	return (
		<AppProvider>
			<ThemeProvider>
				<html lang='en'>
					<head>
						<Meta />

						<Links />
					</head>

					<body>
						<div id='app'>
							<Layout />

							<ScrollRestoration />

							<Scripts />

							<LiveReload />
						</div>
					</body>
				</html>
			</ThemeProvider>
		</AppProvider>
	);
}
