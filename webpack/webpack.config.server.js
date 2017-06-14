// Separate configuration for 'development'

const path = require('path'); // This is a node specific package
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
	hot: true, // Module replacement
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	stats: {
		color: true
	}
});

server.listen(8080, 'localhost');
