"use strict";

var webpack = require('webpack');
var path    = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    path: __dirname + '/public',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      // {test: /\.js$/, loader: 'babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 2 version')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 2 version!less')},
      {test: /\.(png|jp*g|gif|svg)$/, loader: "file?name=[path][name].[ext]?[hash]"},
      {test: /\.(woff|ttf|eot)$/, loader: "file?name=[path][name].[ext]?[hash]"}
    ]
  },
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('styles.css', {allChunks: true})
  ],
  devServer: {
    contentBase: "./public",
    // noInfo: true, //  --no-info option
    hot: true,
    inline: true
  }
};