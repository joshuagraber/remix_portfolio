import React from 'react';

import { ThemeProvider } from 'context/theme';

interface Props {
	children: React.ReactNode;
}

interface AppContext {
	isContactModalDisplayed: boolean;
	setIsContactModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContext | null>(null);

export const AppProvider: React.FC<Props> = ({ children }) => {
	// HOOKS - STATE
	const [isContactModalDisplayed, setIsContactModalDisplayed] = React.useState(false);

	return (
		<AppContext.Provider value={{ isContactModalDisplayed, setIsContactModalDisplayed }}>
			<ThemeProvider>{children}</ThemeProvider>
		</AppContext.Provider>
	);
};

// Declutter use
export function useIsContactModalDisplayed() {
	return React.useContext(AppContext);
}
