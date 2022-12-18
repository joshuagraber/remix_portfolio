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
import { Form } from '@remix-run/react';
interface Props {
	path: string;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const Footer: React.FC<Props> = ({ path = '/' }) => {
	return (
		<div className='jdg-footer'>
			<ContainerCenter>
				<div className='jdg-footer-attribution'>
					&copy; Joshua D. Graber, {new Date().getFullYear()}
				</div>
				<div className='jdg-footer-contact'>
					{SOCIAL_LINKS.map((link) => {
						const [type, url] = link;
						if (path === 'contact' && type === 'email') return;
						if (type === 'email') {
							return (
								<Form action={path} key={type} replace>
									<button
										className='jdg-button-unset jdg-footer-contact-link'
										name='contact'
										type='submit'
									>
										<SocialIcon type={type} />{' '}
									</button>
								</Form>
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
