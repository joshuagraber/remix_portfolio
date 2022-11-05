// GLOBALS
import styles from 'styles/footer.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { SocialIcon } from 'components/SVG/Social';

// CONSTANTS
import { SOCIAL_LINKS } from 'utils/constants';
import React from 'react';

// TYPES
import type { LinksFunction } from '@remix-run/node';
import { useToggleContactModal } from 'hooks/useModalPath';
import { Link } from '@remix-run/react';

// EXPORTS
export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const Footer: React.FC = () => {
	const { open } = useToggleContactModal();

	return (
		<div className='jdg-footer'>
			<ContainerCenter>
				<div className='jdg-footer-attribution'>
					&copy; Joshua D. Graber, {new Date().getFullYear()}
				</div>
				<div className='jdg-footer-contact'>
					{SOCIAL_LINKS.map((link) => {
						// TODO: useRouteMatches to check if on /contact. If so, don't render email link b/c redundant
						const [type, url] = link;

						if (type === 'email') {
							return (
								<Link className='jdg-footer-contact-link' to={open} key={type}>
									{' '}
									<SocialIcon type={type} />{' '}
								</Link>
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

export { ErrorBoundary } from 'components/ErrorBoundary';
