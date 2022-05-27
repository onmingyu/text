var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    publicPath: '/'
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: false,
      extract: false
    })
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
    //   chunks: ['index', 'list', 'about'], //提取哪些模块共有的部分
    //   minChunks: 3 // 提取至少3个模块共有的部分
    // }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"',
        PAY_TYPE: '"alipay"',
        PLATFORM: '"支付宝"',
        // PAY_TYPE: '"weixin"',
        // PLATFORM: '"微信"',
        HOSPITAL: '"湛江中心人民医院"'
      }
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index/index.html',
      inject: true,
      // chunks: ['common', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
    })
  ]
})
