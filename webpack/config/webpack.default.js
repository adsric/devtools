const webpack = require('webpack');
const path = require('path'); // this is a node specfic package
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");

const PROD = process.env.NODE_ENV === 'production';
const DEV  = process.env.NODE_ENV === 'development';

const entry = PROD
  ? ['./src/script.js']
  : [
    './src/script.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ];

const plugins = PROD
  ? [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
    }),
    new ExtractTextPlugin('style-[contenthash:12].min.css'),
    new HTMLWebpackPlugin({
      template: 'config/template.html',
      title: 'Webpack!!'
    })
  ]
  : [
    new webpack.HotModuleReplacementPlugin()
  ];

  const postcss = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer')()
      ]
    }
  }

  const cssLoaders = PROD
    ? ExtractTextPlugin.extract({
      use: ['css-loader', postcss, 'sass-loader']
    })
    : ['style-loader', 'css-loader', postcss, 'sass-loader'];

module.exports = {
  entry,
  plugins,
  devtool: PROD ? 'cheap-module-source-map' : 'inline-source-map',
  output: {
    filename: PROD ? 'bundle.[hash:12].min.js' : 'bundle.js',
    path: path.join(__dirname, '../dist'), //creating path on the root as __dirname points to this file
    publicPath: PROD ? '' : '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: cssLoaders,
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        use: ['url-loader?limit=10000'],
        exclude: /node_modules/
      }
    ]
  }
}
