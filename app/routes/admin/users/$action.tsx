// GLOBALS
import { json } from '@remix-run/node';

// SERVICES
import * as users from 'services/users.server';

// UTILS
import { isValidEmail, isValidPassword, isValidInputLength } from 'utils/utils.server';
import { titleCase } from 'utils/utils';

// TYPES
import type { ActionFunction } from '@remix-run/node';
import { AdminActions } from 'types/types';
import type { UserFormValues, UserFormValuesAllFormSubmission } from 'types/types.server';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	const submission: FormData = await request.formData();
	const fields: Partial<UserFormValuesAllFormSubmission> = Object.fromEntries(submission);
	const fieldsNormalizedForUpdateAction = { ...fields };

	// VALIDATION
	const errors: Record<keyof typeof fields, string | undefined> = {};
	switch (params.action) {
		// CREATE
		case AdminActions.CREATE:
			for (let input in fields) {
				// TODO: Create enum with input names, to standardize and add safety
				if (input === 'name_middle') continue; // Middle name not required

				if (!isValidInputLength(fields[input] as string, 1)) {
					// TODO: more elegant here. Use util to get "First Name," "Last Name" based on input name
					const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
					errors[input] = `User's ${fieldNameForDisplay} is required`;
				}
			}

			// Check for valid email
			if (!fields.email || !isValidEmail(fields.email)) {
				errors.email = 'Please provide a valid email address.';
			}

			// And valid password
			if (!fields.password || !isValidPassword(fields.password)) {
				errors.password =
					'A valid password needs 8 characters, including 1 uppercase letter, 1 lowercase, 1 number, and 1 special character.';
			}

			// Return all errors & field values for form validation on the client,
			if (Object.values(errors).some(Boolean)) {
				return json({ errors, fields }, { status: 422 });
			}

			break;

		// UPDATE
		case AdminActions.UPDATE:
			if (!fields.select_user) {
				errors.form = 'Please select a user to update.';
				return json({ errors, fields }, 404);
			}

			for (let input in fields) {
				if (input === 'name_middle') continue; // Middle name not required

				// Unadded inputs (all not required for updating)
				if (fields[input] === '' || !fields[input]) continue;

				// If input exists, validate it
				if (fields[input] && !isValidInputLength(fields[input] as string, 1)) {
					const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
					errors[input] = `User's ${fieldNameForDisplay} is required`;
				}
			}

			// Check for email and valid email
			if (fields.email && !isValidEmail(fields.email)) {
				errors.email = 'Please provide a valid email address.';
			}

			// Check for pw and valid pw
			if (fields.password && !isValidPassword(fields.password)) {
				errors.password =
					'A valid password needs 8 characters, including 1 uppercase letter, 1 lowercase, 1 number, and 1 special character.';
			}

			break;

		case AdminActions.DELETE:
			if (!fields.select_user) {
				errors.form = 'Sorry, please select a user to update.';
				return json({ errors, fields }, 404);
			}

			break;

		default:
			console.warn('No form validation happened, the action was not found :', request.url);
	}

	// ACTIONS
	switch (params.action) {
		case AdminActions.CREATE:
			try {
				const { id } = await users.createNewUser(fields as UserFormValues);
				const createdUser = await users.getUserByID(id);

				return json({ user: createdUser }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		case AdminActions.UPDATE:
			for (let input in fields) {
				// Removing empty fields to avoid updating db fields to '' or undefined
				// Removing 'select_user' because not needed in db
				if (fields[input] === '' || !fields[input] || input === 'select_user') {
					delete fieldsNormalizedForUpdateAction[input];
				}
			}

			try {
				const updatedUser = await users.updateUserByID(
					String(fields.select_user),
					fieldsNormalizedForUpdateAction as Partial<UserFormValues>
				);

				return json({ user: updatedUser }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		case AdminActions.DELETE:
			try {
				const deletedUser = await users.deleteUserByID(String(fields.select_user));
				return json({ user: deletedUser }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		default:
			throw new Error('That is not a valid users admin route');
	}
};

// To allow UI to persist when action param present
export default function () {
	return null;
}
