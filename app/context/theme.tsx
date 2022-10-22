import React from 'react';

// UTIL
import { useLayoutEffect } from 'hooks/useLayoutEffectSSR';

// CONSTANTS
import { DEFAULT_THEME } from 'utils/constants';
const THEMES = ['unset', 'jdg-light-mode', 'jdg-dark-mode'];

// TYPES
enum ThemeValues {
	UNSET = 'unset',
	LIGHT = 'jdg-light-mode',
	DARK = 'jdg-dark-mode',
}

type Theme = typeof THEMES[number];
type Themes = `${ThemeValues}`;

interface ThemeContext {
	theme: Themes;
	toggleTheme: () => void;
}

interface Props {
	children: React.ReactNode;
}

// UTIL
const isTheme = (themeValueToSet: string): themeValueToSet is ThemeValues => {
	return Object.values(THEMES).some((theme) => theme === themeValueToSet);
};

// CONTEXT
const ThemeContext: React.Context<ThemeContext | null> = React.createContext<ThemeContext | null>(
	null
);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
	// HOOKS
	const [theme, setTheme] = React.useState<Themes>('unset');

	// VARS
	let themeInUserPreferences: Theme | null = null;
	let themeInLocalStorage: Theme | null = null;

	// Check LS
	if (typeof localStorage !== 'undefined') {
		themeInLocalStorage = localStorage.getItem('theme');
	}

	if (typeof window !== 'undefined') {
		const userPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const userPrefersLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

		if (userPrefersDarkTheme) {
			themeInUserPreferences = ThemeValues.DARK;
		}
		if (userPrefersLightTheme) {
			themeInUserPreferences = ThemeValues.LIGHT;
		}
	}

	// If exists, set theme to one found in LS on first render only
	React.useEffect(() => {
		// LS first preference, if user has been here before,
		// otherwise go with user preferences,
		// otherwise default
		const themeToSet = themeInLocalStorage ?? themeInUserPreferences ?? DEFAULT_THEME;
		if (isTheme(themeToSet)) {
			setTheme(themeToSet);
		}
	}, []);

	// Set both LS and root element
	useLayoutEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.dataset.theme = theme;
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
