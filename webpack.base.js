const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const InlineSourePlugin = require('./plugins/inlinesource.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}


module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/main.js')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitError: true,
      //     autofix: true
      //   }
      // },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          },
          // {
          //   loader: 'ts-loader'
          // }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // 用babel-loader 需要把es6-es5
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: "usage",
                  'corejs': 2
                }
              ]
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", {
                "legacy": true
              }],
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            }
          } : 'vue-style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'test-loader',
            options: {
              name: 'aa'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '首页在这里',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true
    })
  ]
}