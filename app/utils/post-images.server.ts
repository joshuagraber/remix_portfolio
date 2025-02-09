export async function fileToBlob({
	file,
	altText,
	title,
}: {
	file: File
	altText?: string | null
	title?: string | null
}) {
	const contentType = file.type
	const blob = Buffer.from(await file.arrayBuffer())

	return {
		contentType,
		altText: altText ?? file.name,
		title: title ?? file.name,
		blob,
	}
}
