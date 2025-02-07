export function formatDateStringForPostDefault(dateString: string | null) {
	if (!dateString) return dateString
	return dateString.split('T')[0]
}

export function stripFrontmatter(content: string) {
	// Match frontmatter pattern: starts with ---, contains any characters (non-greedy), ends with ---
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/

	// Return the content with frontmatter removed, or the original content if no frontmatter exists
	return content.replace(frontmatterRegex, '').trim()
}

export function makePostSlug(title: string, slug?: string) {
	if (slug) return slug

	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}

/**
 * Use this to integrate form fields with controlled MD editor and keep the front matter in sync.
 */
export function formatContentForEditor({
	title,
	slug,
	description,
	publishAt,
	content,
}: {
	title: string
	slug?: string
	description?: string
	publishAt?: Date | string
	content: string
}) {
	const frontmatterFields: string[] = []
	const existingFrontmatter = content.match(/^---\n([\s\S]*?)\n---\n/)

	// If there's existing frontmatter, preserve fields we don't manage
	if (existingFrontmatter?.[1]) {
		const existingLines = existingFrontmatter[1].split('\n')
		for (const line of existingLines) {
			const [field] = line.split(':')
			const fieldName = field?.trim()
			if (
				fieldName &&
				!['title', 'slug', 'description', 'published'].includes(fieldName)
			) {
				frontmatterFields.push(line)
			}
		}
	}

	// Add or update managed fields
	frontmatterFields.push(`title: ${title}`)

	if (slug) {
		frontmatterFields.push(`slug: ${makePostSlug(title, slug)}`)
	}

	if (description) {
		frontmatterFields.push(`description: ${description}`)
	}

	if (publishAt) {
		frontmatterFields.push(`published: ${publishAt}`)
	}

	const frontmatter = frontmatterFields.join('\n')

	return `---
${frontmatter}
---

${stripFrontmatter(content)}`
}
