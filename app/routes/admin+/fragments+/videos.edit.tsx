import { data } from 'react-router'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'
import { type Route } from './+types/videos.edit'

export async function action({ request }: Route.ActionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()

	const videoId = formData.get('id')
	if (typeof videoId !== 'string') {
		return data({ error: 'Video ID is required' }, { status: 400 })
	}

	const altText = formData.get('altText')
	const title = formData.get('title')

	try {
		const video = await prisma.postVideo.update({
			where: { id: videoId },
			data: {
				altText: altText ? String(altText) : null,
				title: title ? String(title) : null,
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
			{ error: 'Error updating video metadata', details: error },
			{ status: 500 },
		)
	}
}
