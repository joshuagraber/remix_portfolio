type MetaDescriptor = {
	title?: string
	name?: string
	property?: string
	content?: string
	charset?: string
	[key: string]: any
}

export function mergeMeta(
	parentMeta: MetaDescriptor[],
	childMeta: MetaDescriptor[],
) {
	const merged = new Map()

	// Add parent meta tags first
	parentMeta.forEach((tag) => {
		const key = tag.name || tag.property || (tag.title ? 'title' : null)
		if (key) {
			merged.set(key, tag)
		}
	})

	// Override with child meta tags
	childMeta.forEach((tag) => {
		const key = tag.name || tag.property || (tag.title ? 'title' : null)
		if (key) {
			merged.set(key, tag)
		}
	})

	return [...Array.from(merged.values())] as MetaDescriptor[]
}
