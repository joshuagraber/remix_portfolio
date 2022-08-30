// GLOBALS
import { Link } from '@remix-run/react';
import styles from './styles.css';

// EXT LIBS
import clsx from 'clsx';

// HOOKS
import { useTheme } from '~/theme';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '../ContainerCenter';
import { SocialIcon } from '../SVG/Social';

// CONSTANTS
import { SOCIAL_LINKS } from '../../utils/constants';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export const Footer = () => {
	const classes = clsx('jdg-footer');
	const { theme } = useTheme();
	const iconColor = theme === 'jdg-light-mode' ? 'black' : 'white';

	return (
		<div className={classes}>
			<ContainerCenter>
				<div className='jdg-footer-attribution'>
					&copy; Joshua D. Graber, {new Date().getFullYear()}
				</div>
				<div className='jdg-footer-contact'>
					{SOCIAL_LINKS.map((link) => {
						const [type, url] = link;
						return (
							<a href={url} key={type} rel='noreferrer' target='blank'>
								{' '}
								<SocialIcon color={iconColor} type={type} />{' '}
							</a>
						);
					})}
				</div>
			</ContainerCenter>
		</div>
	);
};
