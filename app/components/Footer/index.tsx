// GLOBALS
import styles from 'styles/footer.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { SocialIcon } from 'components/SVG/Social';

// UTILS
import { handleKeyDownLikeClick } from 'utils/utils.client';

// CONSTANTS
import { SOCIAL_LINKS } from 'utils/constants';
import { useAppContext } from 'context/app';
import React from 'react';

// TYPES
import type { LinksFunction } from '@remix-run/node';

// EXPORTS
export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const Footer: React.FC = () => {
	// CONTEXT
	const { setIsContactModalDisplayed } = useAppContext()!;

	// HANDLER
	const onClick = () => {
		setIsContactModalDisplayed(true);
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		handleKeyDownLikeClick(onClick, event);
	};

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
									aria-label='Open contact form'
									className='jdg-footer-contact-link'
									key={type}
									onClick={onClick}
									onKeyDown={onKeyDown}
									role='button'
									tabIndex={0}
								>
									<SocialIcon type={type} />
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
								<SocialIcon type={type} />{' '}
							</a>
						);
					})}
				</div>
			</ContainerCenter>
		</div>
	);
};
