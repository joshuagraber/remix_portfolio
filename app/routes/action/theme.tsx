import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';

import { getThemeSession } from 'services/theme.server';
import { isTheme, Themes, ThemeValues } from 'context/theme';

export const action: ActionFunction = async ({ request }) => {
	const themeSession = await getThemeSession(request);
	const requestText = await request.text();
	const form = new URLSearchParams(requestText);
	const theme = form.get('theme') as Themes;

	if (!isTheme(theme)) {
		return json({
			error: {
				message: `theme value of ${theme} is not a valid theme`,
				status: 404,
			},
		});
	}

	if (theme !== ThemeValues.UNSET) {
		themeSession.setTheme(theme);
		return json({ success: true }, { headers: { 'Set-Cookie': await themeSession.commit() } });
	} else {
		return json({ success: false });
	}
};
