import { data } from 'react-router'
import { getOpenGraphData } from '#app/utils/link-preview.server'
import { type Route } from './+types/link-preview'

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url).searchParams.get('url')
	if (!url) {
			throw new Response('URL parameter is required', { status: 400 })
	}

	try {
			const ogData = await getOpenGraphData(url)
			return data(
					{
							...ogData,
							domain: url.startsWith('data:') ? 'data-url' : new URL(url).hostname,
					},
					{
							headers: {
									'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
							},
					},
			)
	} catch (error) {
			console.error('Failed to fetch metadata:', error)
			throw new Response('Failed to fetch metadata', { status: 500 })
	}
}