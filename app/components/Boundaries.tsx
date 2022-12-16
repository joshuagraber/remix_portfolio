// GLOBALS
import { Link, useCatch } from '@remix-run/react';
import { useToggleContactModal } from 'hooks/useModalPath';

// TYPES
interface Props {
	error: any;
}

export const ErrorBoundary: React.FC<Props> = ({
	error = { message: 'Server error', stack: 'This error occurred' },
}) => {
	return (
		<div className='jdg-error-boundary'>
			<h1>Error</h1>
			<p>{error.message}</p>
			<p>The stack trace is:</p>
			<pre>{error.stack}</pre>
		</div>
	);
};

export const CatchBoundary: React.FC<Props> = () => {
	const caught = useCatch();
	const { open } = useToggleContactModal();

	return (
		<div>
			<h1>Caught</h1>
			<p>Status: {caught.status}</p>
			<p>If you're me, check out what went wrong below.</p>
			<p>
				If you're not me,{' '}
				<Link replace to={open}>
					Click here to send me a message about how this error occured.
				</Link>
			</p>
			<pre>
				<code>{JSON.stringify(caught.data, null, 2)}</code>
			</pre>
		</div>
	);
};
