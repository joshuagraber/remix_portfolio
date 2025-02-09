// app/routes/admin.posts.tsx
import { invariantResponse } from '@epic-web/invariant'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const id = formData.get('postId')

	invariantResponse(typeof id === 'string', 'Invalid request', { status: 400 })

	const deleted = await prisma.post.delete({
		where: { id },
	})

	invariantResponse(deleted, 'Not found', { status: 404 })

	return deleted
}
