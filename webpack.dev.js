let path = require('path')
let baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 6060,
    hot: true,
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})