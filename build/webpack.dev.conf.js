/**
 * 本地预览文档
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackBaseConfig = require('./webpack.base.conf.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const webpackConfig = merge(webpackBaseConfig, {
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: path.join(__dirname, '../docs'),
    publicPath: isProd ? '' : '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[hash:7].js'
  },
  resolve: {
    alias: {
      'bin-ace-editor': '../../src/index',
      vue: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    host: 'localhost',
    port: 8085,
    publicPath: '/',
    open: true,
    hot: true
  },
  optimization: {
    splitChunks: {},
    minimizer: []
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/favicon.ico'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {}
    })
  ]
})

if (isProd) {
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  )
  webpackConfig.plugins.push(
    new CleanWebpackPlugin()
  )
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  )
  webpackConfig.optimization.splitChunks = {
    chunks: 'async',
    minSize: 30000, // 模块大于30k会被抽离到公共模块
    minChunks: 1, // 模块出现1次就会被抽离到公共模块
    maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
    maxInitialRequests: 3, // 入口模块最多只能加载3个
    name: true,
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all'
      }
    }
  }
}

module.exports = webpackConfig
