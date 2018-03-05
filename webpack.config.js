const path = require('path');

module.exports = {
	entry: './test/test.js',
	// mode: 'development',
	watch: true,
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};