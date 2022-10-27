// TYPES
type FormValue = string | undefined;

interface ContactFormValues {
	[name_first: string]: FormValue;
	name_last: FormValue;
	email: FormValue;
	message: FormValue;
}

export interface ContactFormProps {
	data?: {
		errors?: ContactFormValues;
		fields?: ContactFormValues;
	};
}

export interface ContactFormModalProps {
	hide: () => void;
}
