// GLOBALS
import { Form, Link, useCatch } from '@remix-run/react';

// TYPES
interface Props {
	error: any;
}

export const ErrorBoundary: React.FC<Props> = ({ error }) => {
	return (
		<div className='jdg-error-boundary'>
			<h2>Error</h2>
			<div>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		</div>
	);
};

export const CatchBoundary: React.FC = () => {
	const caught = useCatch();

	return (
		<div className='jdg-error-boundary'>
			<h2>Caught</h2>
			<div>
				<p>Status: {caught?.status}</p>
				<p>If you're me, check out what went wrong below.</p>
				<p>
					If you're not me,{' '}
					<Form replace>
						<button className='jdg-button-unset' name='contact' type='submit'>
							Click here to send me a message about how this error occured.
						</button>
					</Form>
				</p>
				<pre>
					<code>{JSON.stringify(caught?.data, null, 2)}</code>
				</pre>
			</div>
		</div>
	);
};
