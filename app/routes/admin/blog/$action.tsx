// GLOBALS
import { json } from '@remix-run/node';

// SERVICES
import * as blog from 'services/blog.server';

// UTILS
import { isValidInputLength, parseCommaSeparatedStringToArray } from 'utils/utils.server';

// TYPES
import type { ActionFunction } from '@remix-run/node';
import { AdminActions } from 'types/types';
import type { BlogFormValues } from 'types/types.server';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	// GET FORM DATA
	const submission = await request.formData();
	const fields: Partial<BlogFormValues> = Object.fromEntries(submission);
	const images = submission.getAll('images');
	const tags = parseCommaSeparatedStringToArray(submission.get('tags') as string);
	Object.assign(fields, { images, tags });
	const fieldsNormalizedForUpdateAction = { ...fields };

	// VALIDATION
	const errors: Record<keyof typeof fields, string> = {};
	switch (params.action) {
		// Validation - Create
		case AdminActions.CREATE:
			for (let input in fields) {
				// If array, check for at least one value
				if (Array.isArray(fields[input])) {
					if (!fields[input]) {
						Object.assign(errors, { [input]: `${input} is required` });
					}
				}

				// If string, check for at least 1 char
				if (typeof fields[input] === 'string') {
					if (!isValidInputLength(fields[input] as string, 1)) {
						// TODO: use Obj.assign in other actions. Better.
						Object.assign(errors, { [input]: `${input} is required` });
					}
				}
			}
			break;

		// Validation - update
		case AdminActions.UPDATE:
			if (!fields.select_post) {
				Object.assign(errors, { form: 'Please select a post to update' });
				return json({ errors, fields }, { status: 404 });
			}
			break;

		// Validation - delete
		case AdminActions.DELETE:
			if (!fields.select_post) {
				Object.assign(errors, { form: 'Please select a post to delete' });
				return json({ errors, fields }, { status: 404 });
			}
			break;

		default:
			console.error('No validation was performed, that is not a valid route');
	}

	// Return all errors & field values for form validation on the client,
	if (Object.values(errors).some(Boolean)) {
		return json({ errors, fields }, { status: 422 });
	}

	// MUTATIONS
	switch (params.action) {
		// Mutations - Create
		case AdminActions.CREATE:
			try {
				// Casting okay because fields object will be validated first
				const postUpdated = await blog.createNewPost(fields as BlogFormValues);
				return json({ postUpdated }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		// Mutations - Update
		case AdminActions.UPDATE:
			for (let input in fieldsNormalizedForUpdateAction) {
				// Removing empty fields to avoid updating db fields to '' or undefined
				// Removing 'select_user' because not needed in db
				if (fields[input] === '' || !fields[input] || input === 'select_post') {
					delete fieldsNormalizedForUpdateAction[input];
				}
			}

			try {
				const postUpdated = await blog.updatePostByID(
					fields.select_post as string,
					fieldsNormalizedForUpdateAction
				);

				return json({ postUpdated }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		// Mutations - Delete
		case AdminActions.DELETE:
			try {
				const postUpdated = await blog.deletePostByID(fields.select_post as string);
				return json({ postUpdated }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		default:
			throw new Error('This is not a valid blogPush route');
	}
};

// Default export to keep UI from changing on fetcher call
export default function noop() {
	return null;
}
