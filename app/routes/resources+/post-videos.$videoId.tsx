import { prisma } from '#app/utils/db.server'
import { type Route } from './+types/post-videos.$videoId'

export async function loader({ params }: Route.LoaderArgs) {
	const video = await prisma.postVideo.findUnique({
		where: { id: params.videoId },
		select: { blob: true, contentType: true },
	})

	if (!video) {
		throw new Response('Not found', { status: 404 })
	}

	return new Response(video.blob, {
		headers: {
			'Content-Type': video.contentType,
			'Content-Length': Buffer.byteLength(video.blob).toString(),
			'Content-Disposition': 'inline',
		},
	})
}
