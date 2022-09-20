import React from 'react';

// UTIL
import { useLayoutEffect } from '~/hooks/useLayoutEffectSSR';

// CONSTANTS
import { DEFAULT_THEME } from '~/utils/constants';

// CONTEXT
const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
	// HOOKS
	const [theme, setTheme] = React.useState('unset');

	// VARS
	let themeInUserPreferences = null;
	let themeInLocalStorage = null;

	// Check LS
	if (typeof localStorage !== 'undefined') {
		themeInLocalStorage = localStorage.getItem('theme');
	}

	if (typeof window !== 'undefined') {
		const userPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const userPrefersLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

		if (userPrefersDarkTheme) {
			themeInUserPreferences = 'jdg-dark-mode';
		}
		if (userPrefersLightTheme) {
			themeInUserPreferences = 'jdg-light-mode';
		}
	}

	// If exists, set theme to one found in LS on first render only
	React.useEffect(() => {
		// LS first preference, if user has been here before,
		// otherwise go with user preferences,
		// otherwise default
		const themeToSet = themeInLocalStorage ?? themeInUserPreferences ?? DEFAULT_THEME;
		if (themeToSet) {
			setTheme(themeToSet);
		}
	}, []);

	// Set both LS and root element
	useLayoutEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'jdg-dark-mode' ? 'jdg-light-mode' : 'jdg-dark-mode'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Declutter use
export function useTheme() {
	return React.useContext(ThemeContext);
}
