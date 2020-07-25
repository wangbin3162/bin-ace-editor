const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackBaseConfig = require('./webpack.base.conf')

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'bin-ace-editor.js',
    library: 'bin-ace-editor',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'brace': 'brace'
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
})
