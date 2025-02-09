import { type LinkPreviewData } from '#app/components/link-preview.tsx'

const CACHE_PREFIX = 'link-preview:'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

interface CacheEntry {
	data: LinkPreviewData
	timestamp: number
}

export function getCachedPreview(url: string): LinkPreviewData | null {
	const cached = localStorage.getItem(`${CACHE_PREFIX}${url}`)
	if (!cached) return null

	const entry = JSON.parse(cached) as CacheEntry
	if (Date.now() - entry.timestamp > CACHE_DURATION) {
		localStorage.removeItem(`${CACHE_PREFIX}${url}`)
		return null
	}

	return entry.data
}

export function setCachedPreview(url: string, data: LinkPreviewData) {
	const entry: CacheEntry = {
		data,
		timestamp: Date.now(),
	}
	localStorage.setItem(`${CACHE_PREFIX}${url}`, JSON.stringify(entry))
}
