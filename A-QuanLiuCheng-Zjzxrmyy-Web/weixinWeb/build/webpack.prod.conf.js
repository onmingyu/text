var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false

module.exports = merge(baseConfig, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    // naming output files with hashes for better caching.
    // dist/index.html will be auto-generated with correct URLs.
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: SOURCE_MAP,
      extract: true
    })
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
    //   chunks: ['index', 'list', 'about'], //提取哪些模块共有的部分
    //   minChunks: 3 // 提取至少3个模块共有的部分
    // }),
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        PAY_TYPE: '"alipay"',
        PLATFORM: '"支付宝"',
        // PAY_TYPE: '"weixin"',
        // PLATFORM: '"微信"',
        HOSPITAL: '"湛江中心人民医院"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css'),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index/index.html',
      inject: true,
      // chunks: ['common', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ]
})
