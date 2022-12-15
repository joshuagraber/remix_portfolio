// GLOBALS
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

// TYPES
import { EntryContext } from '@remix-run/node';

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

	// Theme preference headers (read in root)
	responseHeaders.set('Content-Type', 'text/html');
	responseHeaders.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
	responseHeaders.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
	responseHeaders.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');

	return new Response('<!DOCTYPE html>' + markup, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
