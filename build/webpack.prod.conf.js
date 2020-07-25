const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf.js')
const CompressionPlugin = require('compression-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'bin-ace-editor.min.js',
    library: 'bin-ace-editor',
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
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
