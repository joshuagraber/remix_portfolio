// UTILS
import { titleCase } from 'utils/utils';
import { getNameTypeForDisplay, isValidEmail, isValidInputLength } from 'utils/utils.server';

// SERVICES
import * as users from 'services/users.server';

// TYPES
import { ActionFunction, json } from '@remix-run/node';
import type { SubscriberFormValues } from 'types/types.server';

// EXPORTS
export const action: ActionFunction = async ({ request }) => {
	const submission = await request.formData();

	const fields = Object.fromEntries(submission);

	// VALIDATION
	const errors: Record<keyof typeof fields, string | undefined> = {};

	for (let input in fields) {
		if (input === 'name_middle') continue; // Middle name not required

		if (!isValidInputLength(fields[input], 1)) {
			const fieldNameForDisplay = input.includes('name')
				? getNameTypeForDisplay(input)
				: titleCase(input);
			Object.assign(errors, { [input]: `${fieldNameForDisplay} is required` });
		}
	}

	// Check for valid email
	if (!fields.email || !isValidEmail(fields.email)) {
		errors.email = 'Please provide a valid email address.';
	}

	// Check for subscriber with email
	const currentSubscriber = await users.getSubscriberByEmail(fields?.email as string);
	if (currentSubscriber) {
		Object.assign(errors, {
			form: 'A subscriber already exists with that email. If you would like to receive duplicates, please try adding a different one.',
		});
	}

	// If errors, return all errors & field values for form validation on the client,
	if (Object.values(errors).some(Boolean)) {
		return json({ errors, fields }, { status: 422 });
	}

	// If all is well, do the things
	try {
		const subscriber = await users.createNewSubscriber(fields as SubscriberFormValues);
		return json({ subscriber }, { status: 201 });
	} catch (error) {
		return json(error);
	}
};
