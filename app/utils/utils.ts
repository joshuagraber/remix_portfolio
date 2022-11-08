import React from 'react';

import { startCase as _startCase, toLower as _toLower } from 'lodash';

// Title case
// TODO: import and replace where lodash funcs used
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
