// keys.js - figure out what set of credentials to return
// process.env.NODE_ENV is provided from the hosting server of our app
if (process.env.NODE_ENV === 'production') {
	// we are production - return the prod set of keys
	module.exports = require('./prod');
}
else {
	// we are in development - return the dev keys
	module.exports = require('./dev');
}