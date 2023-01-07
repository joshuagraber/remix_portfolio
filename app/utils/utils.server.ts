// GLOBALS
import { createHash } from 'crypto';

// TYPES
import { FormValue } from 'types/types.server';

export function typedBoolean<T>(value: T): value is Exclude<T, '' | 0 | false | null | undefined> {
	return Boolean(value);
}

export function getDomainUrl(request: Request) {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
	if (!host) {
		throw new Error('Could not determine domain URL.');
	}
	const protocol = host.includes('localhost') ? 'http' : 'https';
	return `${protocol}://${host}`;
}

export function removeDoubleSlashes(s: string) {
	return s.replace('//', '/');
}

// e-tag
export function createETag(html: string) {
	return createHash('md5').update(html).digest('hex');
}

// Remove any query string from URL
export function stripParamsAndHash(url: string): string {
	return url.split(/[?#]/)[0];
}

// Comma-separated string to array
export function parseCommaSeparatedStringToArray(tags: FormDataEntryValue | null) {
	// Type predicate
	if (typeof tags !== 'string') return [];

	return tags.split(',').map((tag) => tag.trim());
}

// VALIDATION
// Validate basic text fiels
export function isValidInputLength(input: FormValue, length: number) {
	return Boolean(typeof input === 'string' && input.length >= length);
}

// Validate email
// Declared in ./utils because needed client-side
export { isValidEmail } from './utils';

// Validate password
export function isValidPassword(
	input: FormValue,
	// Default RegEx requires 1 upper, 1 lower, 1 number, 1 special char
	matchPassword: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g
) {
	if (typeof input !== 'string') return false;
	return Boolean(matchPassword.test(input));
}
