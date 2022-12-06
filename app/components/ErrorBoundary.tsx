// TYPES
interface Props {
	error: any;
}

export const ErrorBoundary: React.FC<Props> = ({
	error = { message: 'Server error', stack: 'This error occurred while trying to authenticate' },
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
