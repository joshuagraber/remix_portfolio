// GLOBALS
import { useFetcher } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';
import React, { SyntheticEvent } from 'react';
import styles from 'styles/toggle.css';

// COMPONENTS
import { Moon } from 'components/SVG/Moon';
import { Sun } from 'components/SVG/Sun';

// UTIL
import { ThemeValues, useTheme } from '../context/theme';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const ThemeToggle: React.FC = () => {
	// HOOKS - GLOBAL
	const toggleThemePersistence = useFetcher();

	// HOOKS - REFS
	const darkIconContainerRef = React.useRef<HTMLDivElement>(null);
	const lightIconContainerRef = React.useRef<HTMLDivElement>(null);

	// HOOKS - CUSTOM
	/* TODO: Asserting non-null because it will always exist
	 * in code rendered on server, think about how to use a
	 * loader to deliver instead? */
	const { theme } = useTheme()!;

	// VARS
	const isDarkMode = theme === ThemeValues.DARK;
	const iconContainerRef = isDarkMode ? darkIconContainerRef : lightIconContainerRef;

	return (
		<div className='jdg-theme-toggle'>
			<toggleThemePersistence.Form action='action/theme' method='post'>
				{/* Icon */}

				<button
					aria-label='toggle dark and light theme'
					className='jdg-theme-toggle-button'
					name='theme'
					type='submit'
					// Value attr. is what we want to change TO
					value={isDarkMode ? ThemeValues.LIGHT : ThemeValues.DARK}
				>
					<div className='jdg-theme-toggle-button-icons-container'>
						<SwitchTransition>
							<CSSTransition
								classNames='jdg-theme-toggle-button-icon-container'
								// in={isDarkMode}
								key={isDarkMode ? 'dark mode' : 'light mode'}
								nodeRef={iconContainerRef}
								timeout={300}
							>
								<div className='jdg-theme-toggle-button-icon-container' ref={iconContainerRef}>
									{isDarkMode ? <Moon /> : <Sun />}
								</div>
							</CSSTransition>
						</SwitchTransition>
					</div>
				</button>

				<span hidden>
					{`toggle theme: Light Mode or Dark Mode. currently set to: ${
						isDarkMode ? 'Dark Mode' : 'Light Mode'
					}
					`}
				</span>
			</toggleThemePersistence.Form>
		</div>
	);
};
