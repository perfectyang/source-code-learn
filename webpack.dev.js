let path = require('path')
let baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

console.log('process.env', process.env.npm_config_proxy)
console.log('process.argvargvargv', process.argv)
// console.log('process.env---npm_config_proxy', process.env.npm_config_proxy)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 6060,
    open: false,
    overlay:  {
        warnings: false,
        errors: true
    },
    // publicPath: config.dev.assetsPublicPath,
    proxy: {
    },
    quiet: true,
    // watchOptions: {
    //   poll: false,
    //   ignored: /\/node_modules\/.*/
    // }
  },
  stats: {
    env: false,
    chunks: false,
    chunkGroups: false,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,
    // 添加错误信息
    errors: true,
    cachedAssets: true,
    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,
    moduleTrace: false,
    modules: false,
    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})