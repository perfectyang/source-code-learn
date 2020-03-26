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
    // m2: [path.resolve(__dirname, 'src/m2/main.js')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src')
    }
  },
  resolveLoader: {
    // path.resolve('./loaders')
    modules: ['node_modules', path.resolve('./loaders')]
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
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'local-inject-loader',
            options: {
              default: 'js',
              autoImport: [
                {
                  name: 'localSocket2',
                  paths: 'src/lib/socket/index.js'
                }
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          },
          // {
          //   loader: 'test-loader',
          // },
          // {
          //   loader: 'local-inject-loader',
          //   options: {
          //     autoImport: [
          //       {
          //         name: 'localSocket',
          //         paths: 'src/lib/socket/index.js'
          //       }
          //     ]
          //   }
          // }
        ]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            }
          } : 'vue-style-loader',
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 2
              }
          },
          // {
          //     loader: 'postcss-loader'
          // },
          {
              loader: 'less-loader'
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
    // new HtmlWebpackPlugin({
    //   title: '首页在这里',
    //   filename: 'm2/index.html',
    //   template: path.resolve(__dirname, 'src', 'm2/index.html'),
    //   hash: true
    // })
  ]
}