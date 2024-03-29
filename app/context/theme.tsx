// GLOBALS
import React from 'react';
import { getWindow } from 'ssr-window';
import { useFetcher } from '@remix-run/react';

// UTIL
import { useLayoutEffect } from 'hooks/useLayoutEffectSSR';

// CONSTANTS
import { DEFAULT_THEME } from 'utils/constants';
const THEMES = ['unset', 'jdg-light-mode', 'jdg-dark-mode'];

// TYPES
export enum ThemeValues {
	UNSET = 'unset',
	LIGHT = 'jdg-light-mode',
	DARK = 'jdg-dark-mode',
}

export type Theme = typeof THEMES[number];
export type Themes = `${ThemeValues}`;

interface ThemeContext {
	theme: Themes;
	toggleTheme: () => void;
}

interface Props {
	children: React.ReactNode;
	userThemePreference: Themes;
}

// UTIL
export const isTheme = (themeValueToSet: string): themeValueToSet is ThemeValues => {
	return Object.values(THEMES).some((theme) => theme === themeValueToSet);
};

// CONTEXT
const ThemeContext = React.createContext<ThemeContext>({
	theme: ThemeValues.UNSET,
	toggleTheme: () => undefined,
});

export const ThemeProvider: React.FC<Props> = ({ children, userThemePreference }) => {
	// HOOKS - GLOBAL
	const window = getWindow();
	const themePersistence = useFetcher();

	// HOOKS - STATE
	const [theme, setTheme] = React.useState<Themes>(ThemeValues.UNSET);

	let themeInUserPreferences: Themes | undefined;

	if (userThemePreference) {
		themeInUserPreferences = userThemePreference;
	}

	if (typeof window !== 'undefined' && !userThemePreference) {
		themeInUserPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches
			? ThemeValues.DARK
			: window.matchMedia('(prefers-color-scheme: light)').matches
			? ThemeValues.LIGHT
			: undefined;
	}

	React.useEffect(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			setTheme(darkModeQuery.matches ? ThemeValues.DARK : ThemeValues.LIGHT);
		};
		darkModeQuery.addEventListener('change', handleChange);
		return () => darkModeQuery.removeEventListener('change', handleChange);
	}, []);

	// HOOKS - EFFECTS
	// On render or user preference change
	React.useEffect(() => {
		// Nullish coalescing to get theme to set
		const themeToSet = themeInUserPreferences ?? DEFAULT_THEME;

		if (isTheme(themeToSet)) {
			setTheme(themeToSet);
		}
	}, [themeInUserPreferences]);

	// Set both LS and root element
	useLayoutEffect(() => {
		document.documentElement.dataset.theme = theme;
		if (theme !== ThemeValues.UNSET) {
			themePersistence.submit({ theme }, { action: 'action/theme', method: 'post' });
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === ThemeValues.DARK ? ThemeValues.LIGHT : ThemeValues.DARK));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Declutter use
export function useTheme() {
	return React.useContext(ThemeContext);
}
