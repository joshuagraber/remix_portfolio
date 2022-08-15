// UTIL
import { useTheme } from '~/theme';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();
	const isDarkMode = theme === 'jdg-dark-mode';

	return (
		<input
			checked={isDarkMode}
			className='jdg-theme-toggle'
			id='jdg-theme-toggle'
			onChange={toggleTheme}
			type='checkbox'
		>
			<label for='jdg-theme-toggle' class='jdg-theme-toggle-label'>
				<span class='jdg-theme-toggle-label-background' />
			</label>
		</input>
	);
};
