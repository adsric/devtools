// separate configuration for 'development'

var path = require('path'); // this is a node specific package
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.default');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	hot: true, // module replacement
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	stats: {
		color: true
	}
});

server.listen(8080, 'localhost');
