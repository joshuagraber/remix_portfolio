import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter'
import { flatRoutes } from 'remix-flat-routes'

export default remixRoutesOptionAdapter((defineRoutes) => {
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
