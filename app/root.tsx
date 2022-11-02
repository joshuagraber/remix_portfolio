// GLOBALS
import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useSearchParams,
} from '@remix-run/react';
import { DynamicLinks } from 'remix-utils';
import globalStyles from 'styles/global.css';
import themes from 'styles/themes.css';

// COMPONENTS
import { ModalContactForm, links as modalContactFormLinks } from 'components/ModalContactForm';

// CONTEXT
import { ThemeProvider } from 'context/theme';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
		...modalContactFormLinks(),
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
	const [searchParams] = useSearchParams();

	const isContactModalOpen = searchParams.get('contact') === 'open';

	return (
		<ThemeProvider>
			<html lang='en'>
				<head>
					<Meta />

					<DynamicLinks />
					<Links />
				</head>

				<body>
					<div id='app'>
						<Outlet />

						{isContactModalOpen && <ModalContactForm isVisible={isContactModalOpen} />}

						<ScrollRestoration />

						<Scripts />

						<LiveReload />
					</div>
				</body>
			</html>
		</ThemeProvider>
	);
}
