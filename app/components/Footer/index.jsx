// GLOBALS
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
import { useIsContactModalDisplayed } from '~/context';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export const Footer = () => {
	// CONTEXT
	const { setIsContactModalDisplayed } = useIsContactModalDisplayed();
	const { theme } = useTheme();

	// VARS
	const iconColor = theme === 'jdg-light-mode' ? 'black' : 'white';

	return (
		<div className='jdg-footer'>
			<ContainerCenter>
				<div className='jdg-footer-attribution'>
					&copy; Joshua D. Graber, {new Date().getFullYear()}
				</div>
				<div className='jdg-footer-contact'>
					{SOCIAL_LINKS.map((link) => {
						const [type, url] = link;
						if (type === 'email') {
							return (
								<div
									className='jdg-footer-contact-link'
									key={type}
									onClick={() => setIsContactModalDisplayed(true)}
									// onKeyDown={} TODO
									role={'button'}
								>
									<SocialIcon color={iconColor} type={type} />
								</div>
							);
						}
						return (
							<a
								className='jdg-footer-contact-link'
								href={url}
								key={type}
								rel='noreferrer'
								target='blank'
							>
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
