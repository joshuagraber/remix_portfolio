// TODO: didn't realize Cloudinary had a widget. Just fucking use that.

// GLOBALS
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import React from 'react';

// COMPONENTS
import { Button } from 'components/Button';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Input } from 'components/Input';

// SERVICES
import * as media from 'services/media.server';

// UTILS
import { parseCommaSeparatedStringToArray } from 'utils/utils.server';

// TYPES
import type { ActionFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import { AdminActions } from 'types/types';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	// Get image publicID
	const { imageID } = params;
	const imageToUpdate = await media.getImageByAssetID(imageID as string);
	const { public_id } = imageToUpdate;

	const submission = await request.formData();

	// Get action from button value
	const action = submission.get('intent');

	// Tags to add / delete
	const tags = submission.get('tags') as string;
	const tagsToAdd = parseCommaSeparatedStringToArray(tags);
	const tagsToDelete = submission.getAll('delete_tags') as string[];

	// All fields to pass back to client in case of error
	const fields = Object.fromEntries(submission);
	const errors: Record<keyof typeof fields, string | string[]> = {};
	// Updating fields object with full array of values
	Object.assign(fields, { delete_tags: [...tagsToDelete] });

	// VALIDATION
	if (action === AdminActions.UPDATE) {
		if (tags.length === 0 && tagsToDelete.length === 0) {
			errors.form = 'No data submitted for updating. Please add or delete a tag and try again.';
		}
	}

	if (Object.values(errors).some(Boolean)) {
		return json({ errors, fields, status: 422 });
	}

	// DO STUFF
	if (action === AdminActions.UPDATE) {
		try {
			const areTagsAdded = await media.addImageTagsByImageIDs(tagsToAdd, [public_id]);
			const areTagsRemoved = await media.deleteImageTagsByImageIDs(tagsToDelete, [public_id]);

			if (areTagsAdded && areTagsRemoved) {
				return json({ imageUpdated: imageToUpdate }, { status: 200 });
			}
		} catch (error) {
			return json(error);
		}
	}

	if (action === AdminActions.DELETE) {
		try {
			const isDeleted = await media.deleteImageByPublicID(public_id);

			if (isDeleted) {
				return redirect('/admin/images');
			}
		} catch (error) {
			return json(error);
		}
	}
};

export const loader: LoaderFunction = async ({ params }) => {
	const { imageID } = params;
	if (typeof imageID === 'undefined') return;

	const imageToUpdate = await media.getImageByAssetID(imageID);

	return json({ imageToUpdate }, { status: 200 });
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks()];
};

export default function EditImage() {
	// HOOKS - GLOBALS
	const actionData = useActionData();
	const { imageToUpdate } = useLoaderData();

	// HOOKS - STATE
	const [errors, setErrors] = React.useState(actionData?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		actionData?.errors?.form ?? actionData?.message
	);
	const [fields, setFields] = React.useState(actionData?.fields);
	const [imageUpdated, setImageUpdated] = React.useState(actionData?.fields);

	// HOOKS - EFFECTS
	// On action data change
	React.useEffect(() => {
		setErrors(actionData?.errors);
		setFields(actionData?.fields);
		setErrorMessage(actionData?.errors?.form ?? actionData?.message);
		setImageUpdated(actionData?.imageUpdated);
	}, [actionData]);

	// HANDLERS
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		const deleteButton = event?.currentTarget.querySelector(`button[value=${AdminActions.DELETE}]`);
		const nativeEvent = event.nativeEvent as unknown as SubmitEvent;

		if (nativeEvent?.submitter === deleteButton) {
			return !confirm('Are you sure?') ? event.preventDefault() : true;
		}
	}

	return (
		<ContainerCenter className='jdg-admin-image-edit'>
			<h4>Update Image</h4>

			<ul>
				Image details
				<ul>
					tags:{' '}
					{imageToUpdate.tags.map((tag: string) => (
						<li key={tag}>{tag}</li>
					))}
				</ul>
				<li>url: {imageToUpdate.secure_url}</li>
			</ul>

			{/* Status updates */}
			{errorMessage && <div className='jdg-admin-error-message'>{errorMessage}</div>}
			{imageUpdated && (
				<div className='jdg-admin-update-message'>
					Image with the public ID {actionData?.imageUpdated.public_id} was updated.
				</div>
			)}

			<Form method='post' onSubmit={handleSubmit}>
				<fieldset>
					<legend>Add tags</legend>
					<Input
						defaultValue={fields?.tags}
						error={errors?.tags}
						label='Comma-separated tags to add'
						name='tags'
						type='text'
					/>
				</fieldset>

				<fieldset>
					<legend>Delete Tags</legend>
					{imageToUpdate &&
						imageToUpdate.tags.map((tag: string) => {
							const isChecked = Boolean(
								fields?.delete_tags.some((deleteTag: string) => deleteTag === tag)
							);

							return (
								<Input
									defaultChecked={isChecked}
									defaultValue={tag}
									key={tag}
									label={tag}
									name='delete_tags'
									type='checkbox'
								/>
							);
						})}
				</fieldset>

				<Button name='intent' type='submit' value={AdminActions.UPDATE}>
					Update Image
				</Button>

				<fieldset>
					<legend>Danger: Delete this image!</legend>
					{/* Delete button changes action of form to $imageID/delete */}
					<Button name='intent' type='submit' value={AdminActions.DELETE}>
						Delete Image
					</Button>
				</fieldset>
			</Form>
		</ContainerCenter>
	);
}
