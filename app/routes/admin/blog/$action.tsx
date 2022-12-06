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
	// Create fields obj
	const fields: Partial<BlogFormValues> = Object.fromEntries(submission);
	// Images has multiple, tags need processing, so we get those directly.
	const images = submission.getAll('images');
	console.log({ images });
	const tags = parseCommaSeparatedStringToArray(submission.get('tags'));
	// Update fields obj with images and tags
	Object.assign(fields, { images, tags });

	// VALIDATION
	const errors: Record<keyof typeof fields, string> = {};

	switch (params.action) {
		// Validation - Create
		case AdminActions.CREATE:
			for (let input in fields) {
				// If array, check for at least one value
				if (Array.isArray(fields[input])) {
					const validateArray = fields[input] as string[];
					console.log({ validateArray });
					if (!validateArray[0]) {
						Object.assign(errors, { [input]: `${input} is required` });
					}
				}

				// If string, check for at least 1 char
				if (typeof fields[input] === 'string') {
					if (!isValidInputLength(fields[input], 1)) {
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
			console.error('No validation was performed, this is not a valid route');
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
			const { select_post: postID } = fields;

			for (let input in fields) {
				// Removing empty fields to avoid updating db fields to '' or undefined
				// Removing 'select_user' because not expected in db
				if (fields[input] === '' || !fields[input] || input === 'select_post') {
					delete fields[input];
				}
			}

			try {
				const postUpdated = await blog.updatePostByID(String(postID), fields);

				return json({ postUpdated }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		// Mutations - Delete
		case AdminActions.DELETE:
			try {
				const postUpdated = await blog.deletePostByID(String(fields.select_post));
				return json({ postUpdated }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		default:
			throw new Error('This is not a valid blog admin route');
	}
};

// Default export to keep UI from changing on fetcher call
export default function noop() {
	return null;
}
