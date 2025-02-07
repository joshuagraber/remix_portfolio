import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '#app/utils/db.server'

export async function loader({ params }: LoaderFunctionArgs) {
	const image = await prisma.postImage.findUnique({
		where: { id: params.imageId },
		select: { blob: true, contentType: true },
	})

	invariantResponse(image, 'Not found', { status: 404 })

	return new Response(image.blob, {
		headers: {
			'Content-Type': image.contentType,
			'Content-Length': Buffer.from(image.blob).length.toString(),
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
}
