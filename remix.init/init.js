const init = require('./index.js')

// Call it with the root directory path
init({ rootDirectory: process.cwd() }).catch(console.error)
