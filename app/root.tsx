// GLOBALS
import { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
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

// COMPONENTS
import { ModalContactForm, links as modalContactFormLinks } from 'components/ModalContact';

// CONTEXT
import { ThemeProvider, ThemeValues } from 'context/theme';
import { getThemeSession } from 'services/theme.server';
import { stripParamsAndHash } from 'utils/utils.server';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: themes },
		{ rel: 'stylesheet', href: globalStyles },
		...modalContactFormLinks(),
	];
};

export const headers: HeadersFunction = () => {
	// Cacheing baseline
	return { 'Cache-Control': 'max-age=300, s-maxage=3600' };
};

export const loader: LoaderFunction = async ({ request }) => {
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

	return { userThemePreference };
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
