// module.exports = async (...args) => {
// 	const { default: main } = await import('./index.mjs')
// 	await main(...args)
// }
module.exports = async (...args) => {
	try {
		// First log the args to see what we're getting
		console.log('Args received:', args)

		// Properly await the dynamic import
		const { default: main } = await import('./index.mjs')

		// Call the main function with the args
		await main(...args)
	} catch (error) {
		console.error('Error:', error)
	}
}
