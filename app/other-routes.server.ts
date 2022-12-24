// GLOBALS
import type { EntryContext } from '@remix-run/node';
import { getSitemapXml } from 'utils/utils.sitemap.server';

// TYPE
type Handler = (request: Request, remixContext: EntryContext) => Promise<Response> | null;

// EXPORTS
export const pathedRoutes: Record<string, Handler> = {
	'/sitemap.xml': async (request, remixContext) => {
		const sitemap = await getSitemapXml(request, remixContext);
		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Content-Length': String(Buffer.byteLength(sitemap)),
			},
		});
	},
};

export const routes: Array<Handler> = [
	...Object.entries(pathedRoutes).map(([path, handler]) => {
		return (request: Request, remixContext: EntryContext) => {
			if (new URL(request.url).pathname !== path) return null;

			return handler(request, remixContext);
		};
	}),
];
