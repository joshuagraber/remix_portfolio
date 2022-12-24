// GLOBALS
import { DataFunctionArgs, json, LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useSearchParams,
} from '@remix-run/react';
import { DynamicLinks } from 'remix-utils';
import globalStyles from 'styles/global.css';
import themes from 'styles/themes.css';
import { pathedRoutes } from 'other-routes.server';

// COMPONENTS
import { ModalContactForm, links as modalContactFormLinks } from 'components/ModalContact';

// CONTEXT
import { ThemeProvider, ThemeValues } from 'context/theme';
import { getThemeSession } from 'services/theme.server';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
		...modalContactFormLinks(),
	];
};

async function loader({ request }: DataFunctionArgs) {
	// THEME
	// Check theme session for previously saved theme
	const themeSession = await getThemeSession(request);
	let userThemePreferenceFromCookie = themeSession.getTheme();

	// If 'UNSET' happens to get stored in cookie, ignore it.
	if (userThemePreferenceFromCookie === ThemeValues.UNSET) {
		userThemePreferenceFromCookie = null;
	}

	// Check client hints header for general user theme preference
	const userThemePreferenceFromHeader = request.headers.get('sec-ch-prefers-color-scheme');

	/*
	 * First check cookie, then fall back to header preference if it exists,
	 * and hook will check matchMedia on CSS prefers-color-scheme query as a
	 * final client-side fallback for non-Chromium browsers
	 */
	const userThemePreference = userThemePreferenceFromCookie
		? userThemePreferenceFromCookie
		: userThemePreferenceFromHeader
		? `jdg-${userThemePreferenceFromHeader}-mode`
		: null;

	return json({ userThemePreference });
}

export { loaderImpl as loader };

async function loaderImpl({ request, ...rest }: DataFunctionArgs) {
	// because this is called for every route, we'll do an early return for anything
	// that has a other route setup. The response will be handled there.
	if (pathedRoutes[new URL(request.url).pathname]) {
		return new Response();
	}
	const result = await loader({ request, ...rest });
	return result;
}

export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		description: 'Award-winning writer, literary editor, full stack JavaScript web developer.',
		title: 'Joshua D. Graber | Writer & JavaScript Developer',
		viewport: 'width=device-width,initial-scale=1',
	};
};

export default function App() {
	// HOOKS - GLOBAL
	const [searchParams] = useSearchParams();
	const { userThemePreference } = useLoaderData();

	const isContactModalOpen = typeof searchParams.get('contact') === 'string';

	return (
		<ThemeProvider userThemePreference={userThemePreference}>
			<html lang='en'>
				<head>
					<Meta />

					<DynamicLinks />
					<Links />
				</head>

				<body>
					<div id='app'>
						<Outlet />

						{/* Render contact modal here so it can be raised from any route */}
						<ModalContactForm isVisible={isContactModalOpen} />

						<ScrollRestoration />

						<Scripts />

						<LiveReload />
					</div>
				</body>
			</html>
		</ThemeProvider>
	);
}
