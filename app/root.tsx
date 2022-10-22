// GLOBALS
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { DynamicLinks } from 'remix-utils';
import globalStyles from 'styles/global.css';
import themes from 'styles/themes.css';

// COMPONENTS
import { Layout, links as layoutLinks } from 'components/Layout';

// CONTEXT
import { AppProvider as Context } from 'context/app';
import { LinksFunction, MetaFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
		...layoutLinks(),
	];
};

export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		description: 'Award-winning writer, literary editor, full stack JavaScript web developer.',
		title: 'Joshua D. Graber | Writer & JavaScript Developer',
		viewport: 'width=device-width,initial-scale=1',
	};
};

export default function App() {
	return (
		<Context>
			<html lang='en'>
				<head>
					<Meta />

					<DynamicLinks />
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
		</Context>
	);
}
