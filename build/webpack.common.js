const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackBaseConfig = require('./webpack.base.conf')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'bin-ace-editor.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'bin-ace-editor',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
})
