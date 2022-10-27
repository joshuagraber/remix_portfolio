import React from 'react';

import { ThemeProvider } from 'context/theme';

interface Props {
	children: React.ReactNode;
}

interface AppContext {
	contactFormSubmitter?: string;
	isContactModalDisplayed: boolean;
	setContactFormSubmitter: React.Dispatch<React.SetStateAction<string>>;
	setIsContactModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContext | null>(null);

export const AppProvider: React.FC<Props> = ({ children }) => {
	// HOOKS - STATE
	// TODO:
	// 1. Modal display: use routing
	// 2. Form submitter: use a cookie or session storage instead
	const [isContactModalDisplayed, setIsContactModalDisplayed] = React.useState(false);
	const [contactFormSubmitter, setContactFormSubmitter] = React.useState('');

	return (
		<AppContext.Provider
			value={{
				contactFormSubmitter,
				isContactModalDisplayed,
				setContactFormSubmitter,
				setIsContactModalDisplayed,
			}}
		>
			<ThemeProvider>{children}</ThemeProvider>
		</AppContext.Provider>
	);
};

// Declutter use
export function useAppContext() {
	return React.useContext(AppContext);
}
