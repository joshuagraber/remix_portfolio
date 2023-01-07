// GLOBALS
import React from 'react';

// UTILS
import { startCase as _startCase, toLower as _toLower } from 'lodash';

// TYPES
import { FormValue } from 'types/types.server';

// Email validation (declaring here for client-side error-handling juice)
export function isValidEmail(
	input: FormValue,
	matchEmail: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
) {
	return Boolean(typeof input === 'string' && matchEmail.test(input));
}

// Title case string (blunt)
export function titleCase(s: string | undefined) {
	if (typeof s === 'undefined') {
		return '';
	}

	return _startCase(_toLower(s));
}

// Utils
// Check if we're in the client
export const canUseDOM = !!(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

// Keydown handler
export function handleKeyDownLikeClick(
	handler: (event: React.KeyboardEvent) => void,
	event: React.KeyboardEvent
) {
	if (!handler || !event) {
		throw new Error('Pass handleKeyDownLikeClick both a handler and a keyboard event, please.');
	}

	const whichCodesToMatch = [13, 32]; // Enter and spacebar keys
	const eventWhichCodeMatches = whichCodesToMatch.includes(event?.which);

	if (eventWhichCodeMatches) {
		event?.preventDefault();
		handler(event);
	}

	return;
}
