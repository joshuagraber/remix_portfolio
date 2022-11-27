// GLOBALS
import { LoaderFunction, json, unstable_parseMultipartFormData } from '@remix-run/node';
import React from 'react';
import { Form, Link, NavLink, Outlet, useActionData, useLoaderData } from '@remix-run/react';

// COMPONENTS
import { Button } from 'components/Button';
import { Input } from 'components/Input';

// SERVICES
import * as media from 'services/media.server';

// UTILS
import { parseCommaSeparatedStringToArray } from 'utils/utils.server';

// MISC
import clsx from 'clsx';

// TYPES
import type { ActionFunction } from '@remix-run/node';
import { UploadApiResponse } from 'cloudinary';

// CONSTANTS
const ACTIVE_CLASS_NAME = 'jdg-admin-image-open-link-active';
const CLASS_NAME = 'jdg-admin-image-open-link';

// EXPORTS
export const action: ActionFunction = async ({ request }) => {
	try {
		// Form data
		const formData = await unstable_parseMultipartFormData(request, media.uploadHandler);
		const imageID = formData.get('img') as string;
		const tags = formData.get('tags') as string;

		// Format tags
		const tagsSplit = parseCommaSeparatedStringToArray(tags);

		// Add tags
		await media.addImageTagsByImageIDs(tagsSplit, [imageID]);

		// Return
		return json({ imageID, tags }, { status: 200 });

		// Handle error
	} catch (error) {
		return json(error);
	}
};

export const loader: LoaderFunction = async () => {
	try {
		const images = await media.getImagesAll();
		const testImage = await media.getImageByAssetID(images.resources[0].asset_id);
		return { images: images.resources, testImage };
	} catch (error) {
		return json(error);
	}
};

export default function ImagesAdmin() {
	// HOOKS - GLOBALS
	const actionData = useActionData();
	const { images, testImage } = useLoaderData();

	// HOOKS - REF
	const imageInputRef = React.useRef<HTMLInputElement>(null);

	// HOOKS - STATE
	const [isDragOver, setIsDragOver] = React.useState(false);
	const [errors, setErrors] = React.useState(actionData?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		actionData?.errors?.form ?? actionData?.message
	);
	const [fields, setFields] = React.useState(actionData?.fields);

	// UTILS
	function preventDefault(event: React.DragEvent<HTMLInputElement>) {
		console.log('preventing default for event: ', event);
		event.preventDefault();
		event.stopPropagation();
	}

	function handleImageDrop(event: React.DragEvent<HTMLInputElement>) {
		preventDefault(event);
		if (!imageInputRef.current) return;
		if (event.dataTransfer && event.dataTransfer.files[0]) {
			imageInputRef.current.files = event.dataTransfer.files;
			event.dataTransfer.clearData();
		}
	}

	// CONSTANTS
	const labelClasses = clsx(
		'jdg-input-image-uploader-label',
		isDragOver && 'jdg-input-image-uploader-label-dragging'
	);

	return (
		<div>
			<h2>Hello from ImagesAdmin</h2>

			<div>
				{/* Upload images */}
				<div>
					<h3>Upload Images</h3>

					<Form encType='multipart/form-data' method='post'>
						{errorMessage && <div className='jdg-admin-error-message'>{errorMessage}</div>}

						<fieldset>
							<legend>Upload new image</legend>
							<div className='jdg-input-image-uploader'>
								{/* File upload component */}
								<label className={labelClasses}>
									<span hidden>Choose an image to upload</span>
									<input
										accept='image/*'
										className='jdg-input-image-uploader-input'
										id='jdg-input-image-uploader-input'
										name='img'
										// onChange={handleImageInputChange}
										onDrag={preventDefault}
										onDragEnter={() => setIsDragOver(true)}
										onDragLeave={() => setIsDragOver(false)}
										onDragEnd={preventDefault}
										onDragOver={preventDefault}
										onDragStart={preventDefault}
										onDrop={handleImageDrop}
										ref={imageInputRef}
										type='file'
									/>
								</label>
							</div>

							{/* Text input for tags */}
							<Input
								defaultValue={fields?.tags}
								error={errors?.tags}
								label='Tags'
								name='tags'
								type='text'
							/>
							<Button type='submit'>Upload File</Button>
						</fieldset>
					</Form>
				</div>

				{/* Update or delete images (depending on action param) */}
				<div>
					<h3>Update Images</h3>
					<h4>Select Image to update</h4>
					{/* TODO: create component to display preview and url of images uploaded, paginate,
						loader will be called on every update from action. */}
					{images &&
						images.map(({ asset_id, secure_url }: Partial<UploadApiResponse>) => {
							return (
								<NavLink
									className={({ isActive }) =>
										isActive ? `${CLASS_NAME} ${ACTIVE_CLASS_NAME}` : `${CLASS_NAME}`
									}
									key={asset_id}
									to={asset_id as string}
								>
									<img src={secure_url} alt={secure_url} />
								</NavLink>
							);
						})}

					<div>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
