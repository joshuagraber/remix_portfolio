import React from 'react';

// Util
import { useLayoutEffect } from '~/hooks/useLayoutEffectSSR';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
	// HOOKS
	const [theme, setTheme] = React.useState('jdg-dark-mode');

	// VARS
	let themeInLocalStorage = null;

	// First check LS
	if (typeof localStorage !== 'undefined') {
		themeInLocalStorage = localStorage.getItem('theme');
	}

	// If exists, set theme to one found in LS on first render only
	React.useEffect(() => {
		if (themeInLocalStorage) {
			setTheme(themeInLocalStorage);
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
