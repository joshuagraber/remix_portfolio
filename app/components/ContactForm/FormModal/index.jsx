// GLOBALS
import React from 'react';
import { useFetcher } from '@remix-run/react';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { ContactFormResponseMessage } from '../ResponseMessage';

export const ContactFormModal = ({ hide }) => {
	// HOOKS - REMIX
	const fetcher = useFetcher();

	// HOOKS - REF
	const ref = React.useRef();

	// HOOKS - STATE
	const [hasResponseMessageFinishedDisplaying, setHasResponseMessageFinishedDisplaying] =
		React.useState(false);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		// Do nothing if form not submitted.
		if (fetcher.type === 'init') {
			return;
		}

		let timeout = null;

		if (fetcher?.data?.success) {
			timeout = setTimeout(() => {
				hide();
			}, 2500);
		}
		// Only reset if ref is applied to el and action returns success
		if (ref.current && fetcher.type === 'done') {
			ref.current.reset();
		}
		if (fetcher?.data?.error && !hasResponseMessageFinishedDisplaying) {
			timeout = setTimeout(() => {
				setHasResponseMessageFinishedDisplaying(true);
			}, 4500);
		}
		if (timeout) {
			return () => clearTimeout(timeout);
		}
	}, [hasResponseMessageFinishedDisplaying, fetcher, ref]);

	React.useEffect(() => {
		// Only reset if ref is applied to el and action returns success
		if (ref?.current && fetcher?.type === 'done') {
			ref.current.reset();
		}
	}, [fetcher, ref]);

	return (
		<div className='jdg-contact-form-container'>
			<fetcher.Form action='/contact' className='jdg-contact-form' method='post'>
				<ContactFormFieldset />
				<button type='submit'>Send your message now</button>
			</fetcher.Form>
			<ContactFormResponseMessage
				data={fetcher.data}
				isResponseFinished={hasResponseMessageFinishedDisplaying}
			/>
		</div>
	);
};
