/* global __dirname, require, module*/
'use strict'

const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2

let libraryName = 'cooltimer'
let plugins = []

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Cool Timer',
    })
  )
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    publicPath: '/assets/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true,
        },
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },

      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins: plugins,
}

module.exports = config
