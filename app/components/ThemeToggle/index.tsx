// GLOBALS
import { LinksFunction } from '@remix-run/node';
import styles from 'styles/toggle.css';

// UTIL
import { useTheme } from '../../context/theme';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

// TODO: Refactor to use react-aria,
export const ThemeToggle: React.FC = () => {
	// HOOKS - CUSTOM
	const { theme, toggleTheme } = useTheme();

	// VARS
	const isDarkMode = theme === 'jdg-dark-mode';

	// HANDLERS
	const handleChange = () => {
		toggleTheme();
	};

	return (
		<div className='jdg-theme-toggle'>
			<input
				aria-label='toggle dark and light theme'
				aria-checked={isDarkMode}
				checked={isDarkMode}
				className='jdg-theme-toggle-input'
				id='jdg-theme-toggle'
				onChange={handleChange}
				type='checkbox'
			/>
			<label htmlFor='jdg-theme-toggle' className='jdg-theme-toggle-label' />
		</div>
	);
};
