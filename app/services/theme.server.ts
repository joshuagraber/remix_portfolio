import { createCookieSessionStorage } from '@remix-run/node';

import { Theme, isTheme } from 'context/theme';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error('SESSION_SECRET must be set');
}

const themeStorage = createCookieSessionStorage({
	cookie: {
		name: 'jdg_theme',
		secure: true,
		secrets: [sessionSecret],
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
	},
});

export async function getThemeSession(request: Request) {
	const session = await themeStorage.getSession(request.headers.get('Cookie'));
	return {
		getTheme: () => {
			const themeValue = session.get('theme');
			return isTheme(themeValue) ? themeValue : null;
		},
		setTheme: (theme: Theme) => session.set('theme', theme),
		commit: () => themeStorage.commitSession(session),
	};
}
