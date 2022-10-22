// GLOBALS
import React from 'react';
import { useFetcher } from '@remix-run/react';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/LoadingSpinner';

// TYPES
interface Props {
	hide: () => void;
}

// EXPORTS
export function links() {
	return [...loadingSpinnerLinks()];
}

export const ContactFormModal: React.FC<Props> = ({ hide }) => {
	// HOOKS - GLOBAL
	const fetcher = useFetcher();

	// HOOKS - REF
	const ref = React.useRef<HTMLFormElement>(null);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		// Do nothing if form not submitted.
		if (fetcher.type === 'init') {
			return;
		}
		// Use this to handle errors, etc.
	}, [fetcher]);

	React.useEffect(() => {
		// Only reset if ref is applied to el and action returns success
		if (ref?.current && fetcher?.type === 'done') {
			ref.current.reset();
		}
	}, [fetcher, ref]);

	return (
		<div className='jdg-contact-form-container'>
			<fetcher.Form action='/contact' className='jdg-contact-form' method='post' ref={ref}>
				<ContactFormFieldset />
				<button type='submit'>Send your message now</button>
			</fetcher.Form>
		</div>
	);
};
