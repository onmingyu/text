var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    index: './src/index/main.js'
  },
  // output: {
  //   path: path.resolve(__dirname, '../dist/static'),
  //   publicPath: '/Alipay/h5/static/',
  //   filename: '[name].js'
  // },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    // publicPath: '/WxTest/h5/static/',
    // publicPath: '/h5/static/',
    publicPath: '/zjzxrmAliApp/AliApp/h5/static/',
    filename: '[name].js'
  },
  externals: {
    'jquery': 'jQuery',
    'underscore': '_'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: [
        path.join(__dirname, '../node_modules'),
        path.join(__dirname, '../src/assets/lib')
      ]
    }, {
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: [
        path.join(__dirname, '../node_modules'),
        path.join(__dirname, '../src/assets/lib')
      ]
    }],
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: [
        path.join(__dirname, '../node_modules'),
        path.join(__dirname, '../src/assets/lib')
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'vue-html'
    }, {
      test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash:7]'
      }
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
