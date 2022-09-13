import React from 'react';

// Util
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	// HOOKS - STATE
	const [isContactModalDisplayed, setIsContactModalDisplayed] = React.useState(false);

	return (
		<AppContext.Provider value={{ isContactModalDisplayed, setIsContactModalDisplayed }}>
			{children}
		</AppContext.Provider>
	);
};

// Declutter use
export function useIsContactModalDisplayed() {
	return React.useContext(AppContext);
}
