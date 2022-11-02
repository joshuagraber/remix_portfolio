export const useContactFormSubmitter = () => {
	let contactFormSubmitter: string | null = null;

	if (typeof sessionStorage !== 'undefined') {
		contactFormSubmitter = sessionStorage.getItem('submitter_name');
	}

	const setContactFormSubmitter = (name: string | undefined) => {
		if (typeof name === 'undefined') return;
		sessionStorage.setItem('submitter_name', name);
	};

	return { contactFormSubmitter, setContactFormSubmitter };
};
