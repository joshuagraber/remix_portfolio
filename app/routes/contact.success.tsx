import { Link } from '@remix-run/react';
import { ContainerCenter } from 'components/ContainerCenter';
import { useAppContext } from 'context/app';

export default function ContactFormSuccess() {
	// HOOKS - GLOBAL
	const { contactFormSubmitter } = useAppContext()!;

	return (
		<ContainerCenter>
			<div className='jdg-contact-form-success'>
				<h3>
					Thank you for your message {contactFormSubmitter ? `, ${contactFormSubmitter}` : ''}
				</h3>
				<p>It has been received!</p>
				<Link to='/'>Take me to the home page</Link>
			</div>
		</ContainerCenter>
	);
}
