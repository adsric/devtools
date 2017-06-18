const path = require('path'); // This is a node specific package
const webpack = require('webpack');

const ENV = process.env.NODE_ENV;

const plugins = ENV === 'production' ? [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(ENV)
	}),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		mangle: false
	})
] : [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(ENV)
	})
];

module.exports = {
	entry: {
		main: './src/js/app.js'
	},
	plugins,
	devtool: ENV === 'production' ? 'cheap-module-source-map' : 'inline-source-map',
	output: {
		filename: ENV === 'production' ? 'bundle.[hash:12].js' : 'bundle.js',
		path: path.join(__dirname, '/dist') // Creating path on the root as __dirname points to this file
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	}
};
