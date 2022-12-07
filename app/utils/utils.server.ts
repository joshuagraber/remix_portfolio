import fs from 'fs';
import path from 'path';

// TYPES
import { FormValue } from 'types/types.server';

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
export function isValidEmail(
	input: FormValue,
	matchEmail: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
) {
	return Boolean(typeof input === 'string' && matchEmail.test(input));
}

// Validate password
export function isValidPassword(
	input: FormValue,
	// Default RegEx requires 1 upper, 1 lower, 1 number, 1 special char
	matchPassword: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g
) {
	if (typeof input !== 'string') return false;
	return Boolean(matchPassword.test(input));
}
