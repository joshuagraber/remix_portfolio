import { type LoaderFunctionArgs } from 'react-router'
import { getOpenGraphData } from '#app/utils/link-preview.server'

export const cache = () => ({
	maxAge: 60 * 60 * 24, // 24 hours
	staleWhileRevalidate: 60 * 60, // 1 hour
	private: true,
})

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url).searchParams.get('url')
	if (!url) {
		throw new Response('URL parameter is required', { status: 400 })
	}

	try {
		const ogData = await getOpenGraphData(url)
		return {
			...ogData,
			domain: new URL(url).hostname,
		}
	} catch (error) {
		console.error('Failed to fetch metadata:', error)
		throw new Response('Failed to fetch metadata', { status: 500 })
	}
}
