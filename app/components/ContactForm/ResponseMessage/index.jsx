export const ContactFormResponseMessage = ({ data, isResponseFinished }) => {
	// VARS
	const isError = data?.error;
	const isErrorMessageFinishedDisplaying = isError && isResponseFinished;

	const renderErrorMessage = data && isError && !isErrorMessageFinishedDisplaying;
	const renderSuccessMessage = data && !isError;
	const responseMessage = data?.success ?? data?.error;

	if (renderErrorMessage || renderSuccessMessage) {
		return (
			<div className='jdg-contact-form-response'>
				<h5>{responseMessage.heading}</h5>
				<p>{responseMessage.body}</p>
			</div>
		);
	}
	return null;
};
