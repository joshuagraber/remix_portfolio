// GLOBALS
import { createHash } from 'crypto';
import { json } from '@remix-run/node';

// TYPES
import { FormValue } from 'types/types.server';

// TODO: ORGANIZE THIS

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

// Get name field for display
// TODO: use this everywhere name fields are used
export function getNameTypeForDisplay(input: string) {
	switch (input) {
		case 'name_first':
			return 'First Name';
		case 'name_last':
			return 'Last Name';
		case 'name_middle':
			return 'Middle Name';
		default:
			throw new Error('getNameTypeForDisplay is being used on a field other than names.');
	}
}

// Cacheing
// e-tag
export function createETag(html: string) {
	return createHash('md5').update(html).digest('hex');
}

/**
 * Handles loader response cacheing
 * @param request request object
 * @param data loader data
 * @param maxAge Optional: cacheing duration (defaults to 10)
 * @returns 304 if not modified, 200 with data if etags mismatched
 */
export function cachedLoaderResponse(request: Request, data: any, maxAge: number = 10) {
	const responseEtag = createETag(JSON.stringify(data));
	const requestEtag = request.headers.get('If-None-Match');

	// If our etag equals browser's, return 304, browser should fall back to cache
	// Return canonical with cached response regardless
	if (responseEtag === requestEtag) {
		return json({ canonical: data?.canonical ?? null }, { status: 304 });
	} else {
		return json(data, {
			headers: {
				'Cache-Control': `max-age=${maxAge}`,
				etag: responseEtag,
			},
			status: 200,
		});
	}
}
