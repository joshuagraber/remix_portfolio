// UTIL
import { useTheme } from '~/theme';

import styles from './styles.css';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();
	const isDarkMode = theme === 'jdg-dark-mode';

	const handleChange = () => {
		toggleTheme();
	};

	return (
		<div className='jdg-theme-toggle'>
			<input
				checked={isDarkMode}
				className='jdg-theme-toggle-input'
				id='jdg-theme-toggle'
				onChange={handleChange}
				type='checkbox'
			/>
			<label htmlFor='jdg-theme-toggle' className='jdg-theme-toggle-label'></label>
		</div>
	);
};
