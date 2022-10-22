import fs from 'fs';
import path from 'path';

// Markdown files to string
export function resolveMarkdownFileToString(slug: string) {
	return fs.readFileSync(path.resolve(__dirname, `../app/assets/markdown/${slug}.md`)).toString();
}
