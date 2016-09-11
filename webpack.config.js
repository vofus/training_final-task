"use strict";

var webpack = require('webpack');
var path    = require('path');

var HOST = process.env.HOST || "127.0.0.1";
var PORT = process.env.PORT || "8080";

module.exports = {
  context: __dirname + '/app',
  entry: [
    // 'webpack-dev-server/client?http://${HOST}:${PORT}', // WebpackDevServer host and port
    // 'webpack/hot/only-dev-server',
      './index.js'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: __dirname + '/app',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      // {test: /\.js$/, loader: 'babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'}
    ]
  },
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./app",
    // noInfo: true, //  --no-info option
    hot: true,
    inline: true
  }
};