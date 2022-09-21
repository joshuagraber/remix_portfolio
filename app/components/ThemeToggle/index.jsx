// GLOBALS
import styles from '../../styles/toggle.css';

// UTIL
import { useTheme } from '~/theme';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

// TODO: Refactor to use react-aria
export const ThemeToggle = () => {
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
