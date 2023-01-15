// GLOBALS
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { routes as otherRoutes } from 'other-routes.server';

// TYPES
import { EntryContext } from '@remix-run/node';

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

	// Handling path routes
	for (const handler of otherRoutes) {
		// eslint-disable-next-line no-await-in-loop
		const otherRouteResponse = await handler(request, remixContext);
		if (otherRouteResponse) return otherRouteResponse;
	}

	// Theme preference headers (read in root)
	responseHeaders.set('Content-Type', 'text/html');
	responseHeaders.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
	responseHeaders.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
	responseHeaders.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');

	// Access — for mongoDB????
	responseHeaders.set(
		'Access-Control-Allow-Origin',
		'https://master--portfolio-test-011423.netlify.app/'
	);

	return new Response('<!DOCTYPE html>' + markup, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}

// import type { EntryContext } from "@remix-run/node";
// import { RemixServer } from "@remix-run/react";
// import { renderToString } from "react-dom/server";

// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   const markup = renderToString(
//     <RemixServer context={remixContext} url={request.url} />
//   );

//   responseHeaders.set("Content-Type", "text/html");

//   return new Response("<!DOCTYPE html>" + markup, {
//     headers: responseHeaders,
//     status: responseStatusCode,
//   });
// }
