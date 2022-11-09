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
import type {
	UserFormValuesCreate,
	UserFormValuesAllFormSubmission,
	UserFormValuesUpdate,
} from 'types/types.server';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	const submission: FormData = await request.formData();
	const fields: UserFormValuesAllFormSubmission = Object.fromEntries(submission);
	const fieldsNormalized = { ...fields };

	// VALIDATION
	const errors: Record<keyof typeof fields, string | undefined> = {};
	switch (params.action) {
		// CREATE
		case AdminActions.CREATE:
			for (let input in fields) {
				if (input === 'name_middle') continue; // Middle name not required

				if (!isValidInputLength(fields[input], 1)) {
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

			// Return all errors for form validation on the client,
			if (Object.values(errors).some(Boolean)) {
				return json({ errors, fields }, { status: 422 });
			}
			break;

		// UPDATE
		case AdminActions.UPDATE:
			if (!fields.select_user) {
				errors.form = 'Sorry, please select a user to update.';
				return json({ errors, fields }, 404);
			}

			for (let input in fields) {
				if (input === 'name_middle') continue; // Middle name not required

				// Unadded inputs (all not required for updating)
				if (fields[input] === '' || !fields[input]) continue;

				// If input exists, validate it
				if (fields[input] && !isValidInputLength(fields[input], 1)) {
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
			console.log('No validation happened, the route is not found :', request.url);
	}

	// Removing empty fields to avoid updating things to '' or undefined
	for (let input in fields) {
		if (fields[input] === '' || !fields[input] || input === 'select_user') {
			delete fieldsNormalized[input];
		}
	}

	// ACTIONS
	switch (params.action) {
		case AdminActions.CREATE:
			try {
				const { id } = await users.createNewUser(fields as UserFormValuesCreate);
				const updatedUser = await users.getUserByID(id);

				return json(updatedUser, { status: 200 });
			} catch (error) {
				return json(error);
			}

		case AdminActions.UPDATE:
			try {
				const updatedUser = await users.updateUserByID(
					String(fields.select_user),
					fieldsNormalized as UserFormValuesUpdate
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
			throw new Error('That is not a valid admin route');
	}
};

// To allow UI to persist when action param present
export default function () {
	return null;
}
