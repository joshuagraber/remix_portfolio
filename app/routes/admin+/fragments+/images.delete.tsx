// app/routes/admin+/fragments+/images.delete.tsx
import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from 'react-router'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const imageId = formData.get('imageId')

	invariantResponse(typeof imageId === 'string', 'Invalid request', {
		status: 400,
	})

	const deleted = await prisma.postImage.delete({
		where: { id: imageId },
	})

	return deleted
}
