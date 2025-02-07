import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	unstable_parseMultipartFormData as parseMultipartFormData,
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { getPostImageSource } from '#app/utils/misc.tsx'
import { fileToBlob } from '#app/utils/post-images.server'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5 // 5MB

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)

	const formData = await parseMultipartFormData(
		request,
		createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE }),
	)

	const file = formData.get('file') as File | null
	const postId = formData.get('postId') as string | null
	const altText = formData.get('altText') as string | null
	const title = formData.get('title') as string | null

	if (!(file instanceof File && file.size)) {
		return json({ error: 'No file to upload' }, { status: 400 })
	}
	if (!altText) {
		return json({ error: 'Alt text is required' }, { status: 400 })
	}

	try {
		const imageData = await fileToBlob({ file, altText, title })

		const image = await prisma.postImage.create({
			data: {
				...imageData,
				// Only include postId if it exists
				...(postId ? { posts: { connect: { id: postId } } } : {}),
			},
		})

		return json(getPostImageSource(image.id))
	} catch {
		return json({ error: 'Error uploading image' }, { status: 500 })
	}
}
