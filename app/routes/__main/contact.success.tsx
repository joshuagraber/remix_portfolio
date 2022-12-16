// GLOBALS
import { Link } from '@remix-run/react';
import styles from 'styles/index.css';
import React from 'react';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// TYPES
import { LinksFunction, MetaFunction } from '@remix-run/node';
import { useContactFormSubmitter } from 'hooks/useContactFormSubmitter';

// EXPORTS
export const handle = {
	animatePresence: true,
	ref: React.createRef(),
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return {
		content: { name: 'robots', content: 'noindex' },
	};
};

export default function ContactFormSuccess() {
	// HOOKS - CONTEXT
	const { contactFormSubmitter } = useContactFormSubmitter();

	return (
		<ContainerCenter className='jdg-contact-success-container-center'>
			<h3>Thank you for your message{contactFormSubmitter ? `, ${contactFormSubmitter}` : ''}.</h3>
			<p>It has been received!</p>
			<Link to='/'>Take me to the home page</Link>
		</ContainerCenter>
	);
}
