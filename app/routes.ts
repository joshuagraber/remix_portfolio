import { remixRoutesOptionAdapter } from '@remix-run/routes-option-adapter'
import { flatRoutes } from 'remix-flat-routes'

export const routes = remixRoutesOptionAdapter((defineRoutes) => {
	return flatRoutes('routes', defineRoutes, {
		ignoredRouteFiles: [
			'**/.*',
			'**/*.css',
			'**/*.test.{js,jsx,ts,tsx}',
			'**/__*.*',
			'**/*.server.*',
			'**/*.client.*',
		],
		//appDir: 'app',
		//routeDir: 'routes',
		//basePath: '/',
		//paramPrefixChar: '$',
		//nestedDirectoryChar: '+',
		//routeRegex: /((\${nestedDirectoryChar}[\/\\][^\/\\:?*]+)|[\/\\]((index|route|layout|page)|(_[^\/\\:?*]+)|([^\/\\:?*]+\.route)))\.(ts|tsx|js|jsx|md|mdx)$$/,
	})
})
