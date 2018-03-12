const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './test/tests.js',],
	// mode: 'development',
	watch: true,
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};