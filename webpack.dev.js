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
  devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 6060,
    open: true,
    overlay:  {
        warnings: false,
        errors: true
    },
    // publicPath: config.dev.assetsPublicPath,
    proxy: {
    },
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /\/node_modules\/.*/
    }
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})