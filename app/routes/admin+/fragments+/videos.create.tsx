import { data } from 'react-router'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'
import { fileToBlob } from '#app/utils/post-images.server'
import { type Route } from './+types/videos.create'

export async function action({ request }: Route.ActionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()

	const file = formData.get('file') as File | null
	if (!file) {
		return data({ error: 'File is required' }, { status: 400 })
	}

	const altText = formData.get('altText')
	const title = formData.get('title')

	try {
		const { blob, contentType } = await fileToBlob({ file })
		const video = await prisma.postVideo.create({
			data: {
				altText: altText ? String(altText) : null,
				title: title ? String(title) : null,
				contentType,
				blob,
			},
			select: {
				id: true,
				altText: true,
				title: true,
			},
		})
		return { status: 'success', video }
	} catch (error) {
		return data(
			{ error: 'Error uploading video', details: error },
			{ status: 500 },
		)
	}
}
