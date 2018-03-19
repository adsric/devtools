const path = require('path'); // This is a node specific package
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env, argv) {
	return {
		entry: {
			main: './src/javascript/index.js'
		},
		devtool: env === 'production' ? 'cheap-module-source-map' : 'inline-source-map',
		output: {
			filename: env === 'production' ? 'bundle.[hash].js' : 'bundle.js',
			path: path.join(__dirname, '/dist') // Creating path on the root as __dirname points to this file
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						use: [
							`css-loader?sourceMap${env === 'production' ? '&minimize' : ''}`,
							'postcss-loader?sourceMap',
						],
						fallback: 'style-loader?sourceMap&singleton'
					})
		 		}
			]
		},
		plugins: [
			new ExtractTextPlugin({ filename: env === 'production' ? 'bundle.[hash].css' : 'bundle.css', allChunks: true })
		]
	};
};
