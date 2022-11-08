import fs from 'fs';
import path from 'path';

// Remove any query string from URL
export function stripParamsAndHash(url: string): string {
	return url.split(/[?#]/)[0];
}

// Markdown files to string
export function resolveMarkdownFileToString(slug: string): string {
	return fs.readFileSync(path.resolve(__dirname, `../app/assets/markdown/${slug}.md`)).toString();
}

// Validate basic text fiels
export function isValidInputLength(input: FormDataEntryValue | undefined, length: number) {
	return Boolean(typeof input === 'string' && input.length >= length);
}

// Validate email
export function isValidEmail(
	input: FormDataEntryValue,
	matchEmail: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
) {
	return Boolean(typeof input === 'string' && matchEmail.test(input));
}

// Validate password
export function isValidPassword(
	input: FormDataEntryValue,
	// Default RegEx requires 1 upper, 1 lower, 1 number, 1 special char
	matchPassword: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g
) {
	if (typeof input !== 'string') return false;
	return Boolean(matchPassword.test(input));
}
