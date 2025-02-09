import { type LoaderFunctionArgs } from '@remix-run/node'
import { getOpenGraphData } from '#app/utils/link-preview.server'

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
