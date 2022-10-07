// GLOBALS
import React from 'react';
import { useFetcher } from '@remix-run/react';
import { func } from 'prop-types';

// COMPONENTS
import { ContactFormFieldset } from '../Fieldset';
import { ContactFormResponseMessage } from '../ResponseMessage';
import { LoadingSpinner, links as loadingSpinnerLinks } from '~/components/LoadingSpinner';

// EXPORTS
export function links() {
	return [...loadingSpinnerLinks()];
}

export const ContactFormModal = ({ hide }) => {
	// HOOKS - GLOBAL
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
				{fetcher.state === 'idle' && !hasResponseMessageFinishedDisplaying && (
					<>
						<ContactFormFieldset />
						<button type='submit'>Send your message now</button>
					</>
				)}
			</fetcher.Form>
			<LoadingSpinner
				isDisplayed={fetcher.state === 'submitting'}
				text='Your message is sending...'
			/>

			<ContactFormResponseMessage
				data={fetcher.data}
				isDisplayed={fetcher.data && fetcher.state === 'idle'}
				isResponseFinished={hasResponseMessageFinishedDisplaying}
			/>
		</div>
	);
};

ContactFormModal.propTypes = {
	hide: func,
};
