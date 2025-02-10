import { default as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	// add custom config objects here:
	{
		files: ['**/tests/**/*.ts'],
		ignores: [
			'/node_modules/**',
			'/build/**',
			'/public/build/**',
			'/playwright-report/**',
			'/server-build/**',
			// TODO: investigate this. The node_modules are successfully ignored, but I need to pass this `react-router` dir from the command line to actually ignore it.
			'**/.react-router',
		],
		rules: {
			'react-hooks/rules-of-hooks': 'off',
		},
	},
]
