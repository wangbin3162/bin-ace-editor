/**
 * 公共配置
 */
const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader'
            ],
            stylus: [
              'vue-style-loader', 'css-loader', 'stylus-loader'
            ]
          },
          postLoaders: {
            html: 'babel-loader?sourceMap'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('src')]
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          publicPath: 'img/',
          outputPath: 'img/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          publicPath: 'media/',
          outputPath: 'media/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          publicPath: 'fonts/',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    })
  ]
}
