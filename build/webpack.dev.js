const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: 'eval-source-map',
  entry: {
    app: './examples/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: isProd ? '' : '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[hash:7].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js'),
          },
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        // todo: 这种写法有待调整
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue',
      'bin-ace-editor': '../src/index.js',
      examples: path.resolve(__dirname),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/favicon.ico',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    port: 8087,
    publicPath: '/',
    contentBase: __dirname,
    overlay: true,
    open: true
  },
  optimization: {
    splitChunks: {},
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
}

if (isProd) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  )

  config.optimization.splitChunks = {
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
        reuseExistingChunk: true,
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all',
      },
    },
  }
}
config.plugins.push(
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }),
)
module.exports = config
