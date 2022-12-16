// GLOBALS
import { Link, useCatch } from '@remix-run/react';
import { useToggleContactModal } from 'hooks/useModalPath';

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
	const { open } = useToggleContactModal();

	return (
		<div className='jdg-error-boundary'>
			<h2>Caught</h2>
			<div>
				<p>Status: {caught?.status}</p>
				<p>If you're me, check out what went wrong below.</p>
				<p>
					If you're not me,{' '}
					<Link replace to={open}>
						Click here to send me a message about how this error occured.
					</Link>
				</p>
				<pre>
					<code>{JSON.stringify(caught?.data, null, 2)}</code>
				</pre>
			</div>
		</div>
	);
};
