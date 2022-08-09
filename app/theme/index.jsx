import React from 'react';

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

	// If so, set theme to one found in LS
	if (themeInLocalStorage) {
		setTheme(themeInLocalStorage);
	}

	// useLayoutEffect setting both LS and root element
	React.useLayoutEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	// Ternary toggling based on previous value, since there are only 2 options
	const toggleTheme = () => {
		setTheme((prev) => (prev === 'jdg-dark-mode' ? 'jdg-light-mode' : 'jdg-dark-mode'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Declutter use
export function useTheme() {
	return React.useContext(ThemeContext);
}
