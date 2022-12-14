// GLOBALS
import {
	json,
	unstable_composeUploadHandlers,
	unstable_createMemoryUploadHandler,
	writeAsyncIterableToWritable,
} from '@remix-run/node';

// MISC
import cloudinary, { ResourceApiResponse } from 'cloudinary';

// TYPES
import type { UploadApiResponse } from 'cloudinary';
import type { UploadHandler } from '@remix-run/node';

// CONFIG
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CREATE
export const uploadImage = async (data: AsyncIterable<Uint8Array>) => {
	const uploadPromise = new Promise<UploadApiResponse>(async (resolve, reject) => {
		const uploadStream = cloudinary.v2.uploader.upload_stream(
			{
				folder: 'portfolio',
			},
			(error, result) => {
				if (error || !result) {
					reject(error);
					return;
				}
				resolve(result);
			}
		);
		await writeAsyncIterableToWritable(data, uploadStream);
	});

	return uploadPromise;
};

export const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
	// our custom upload handler
	async ({ name, contentType, data, filename }) => {
		if (name !== 'img') {
			return undefined;
		}

		const uploadedImage = await uploadImage(data);
		return uploadedImage.public_id;
	},
	// fallback to memory for everything else
	unstable_createMemoryUploadHandler()
);

// READ
export const getImagesAll = async () => {
	try {
		const allImages = await cloudinary.v2.search
			.expression('folder:portfolio && resource_type:image')
			.with_field('tags')
			.sort_by('created_at', 'desc')
			.execute()
			.then((result) => result);
		return allImages;
	} catch (error) {
		throw json(error);
	}
};

export const getImageByAssetID = async (id: string) => {
	try {
		const searchExpression = `asset_id:${id}`;
		const image = await cloudinary.v2.search
			.expression(searchExpression)
			.with_field('tags')
			.execute()
			.then((result) => result);

		return image.resources[0];
	} catch (error) {
		throw json(error);
	}
};

export const getImageByPublicID = async (id: string) => {
	try {
		const searchExpression = `public_id:${id}`;

		const image = await cloudinary.v2.search
			.expression(searchExpression)
			.with_field('tags')
			.execute()
			.then((result) => result);

		return image.resources[0];
	} catch (error) {
		throw json(error);
	}
};

export const getImageByUrl = async (url: string) => {
	try {
		const images: ResourceApiResponse = await getImagesAll();
		const image = images.resources.find((image) => image.secure_url === url);

		return image;
	} catch (error) {
		throw json(error);
	}
};

// UPDATE
export const addImageTagsByImageIDs = async (tags: string[], ids: string[]) => {
	try {
		const response = tags.map(async (tag) => {
			await cloudinary.v2.uploader
				.add_tag(tag, ids, { resource_type: 'image' })
				.then((result) => result);
		});
		return response.length === tags.length;
	} catch (error) {
		throw json(error);
	}
};

export const deleteImageTagsByImageIDs = async (tags: string[], ids: string[]) => {
	try {
		const responses = tags.map(async (tag) => {
			await cloudinary.v2.uploader
				.remove_tag(tag, ids, { resource_type: 'image' })
				.then((result) => result);
		});
		return responses.length === tags.length;
	} catch (error) {
		throw json(error);
	}
};

// DELETE
export const deleteImageByPublicID = async (id: string) => {
	try {
		return await cloudinary.v2.uploader.destroy(id);
	} catch (error) {
		throw json(error);
	}
};
