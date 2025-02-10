import { data } from 'react-router'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'
import { type Route } from './+types/videos.delete'

export async function action({ request }: Route.ActionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()

	const videoId = formData.get('id')
	if (typeof videoId !== 'string') {
		return data({ error: 'Video ID is required' }, { status: 400 })
	}

	try {
		await prisma.postVideo.delete({
			where: { id: videoId },
		})
		return data({ status: 'success' })
	} catch (error) {
		return data(
			{ error: 'Error deleting video', details: error },
			{ status: 500 },
		)
	}
}
