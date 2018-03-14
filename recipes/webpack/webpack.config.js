const path = require('path'); // This is a node specific package
const webpack = require('webpack');

module.exports = function(env, argv) {
	return {
		entry: {
			main: './src/javascript/index.js'
		},
		devtool: env === 'production' ? 'cheap-module-source-map' : 'inline-source-map',
		output: {
			filename: env === 'production' ? 'bundle.[hash:12].js' : 'bundle.js',
			path: path.join(__dirname, '/dist') // Creating path on the root as __dirname points to this file
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				}
			]
		}
	};
};
