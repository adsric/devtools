// separate configuration for 'development'

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.default');
var path = require('path');

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
