import Vue from 'vue'
import $ from 'jquery'
import _ from 'underscore'

$.ajaxSettings.xhrFields = {
  withCredentials: true
}
const debug = process.env.NODE_ENV !== 'production'

// var baseAddress = 'http://localhost:42297/api/'
var baseAddress = 'http://www.dr0759.cn/WxTest/api/'
// var baseAddress = 'http://www.dr0759.cn/api/'
// var ajax401Url = 'http://www.dr0759.cn/h5/index.html#!/index/401'
// var ajax500Url = 'http://www.dr0759.cn/h5/index.html#!/index/500'

// var baseAddress = 'http://www.dr0759.cn/Alipay/api/'
// var ajax401Url = 'http://www.dr0759.cn/Alipay/h5/index.html#!/index/401'
// var ajax500Url = 'http://www.dr0759.cn/Alipay/h5/index.html#!/index/500'

var clientGet = function (action, controller, query, ajaxGlobal) {
  if (debug) {
    query = _.extend(query || {}, { openid: 'oxKlnuJnTV6TgnZ7hqzG_0-spINI' })
      // query = _.extend(query || {}, { openid: 'oxKlnuLtEGuteb0dIi0nl4kY0q88' })
  }

  if (ajaxGlobal === undefined) {
    ajaxGlobal = true
  }

  var url = baseAddress + controller + '/' + action + '?' + $.param(query || {})

  var resolveProxy
  var promise = new Promise(function (resolve, reject) {
    resolveProxy = resolve
  })

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    cache: false,
    global: ajaxGlobal,
    success: function (res) {
      if (resolveProxy) resolveProxy(res)
    },
    error: function (xhr, errorType, error) {
      if (xhr.status === 401) {
        // document.location.href = ajax401Url
      } else {
        // document.location.href = ajax500Url
      }
      // if (preject) preject()
    }
  })

  return promise
}
var clientGetUrl = function (action, controller, query) {
  if (debug) {
    query = _.extend(query || {}, { openid: 'ommXPv0kQCHyKGg9Qj2fAATHDXmQ' })
  }
  var resolveProxy
  var promise = new Promise(function (resolve, reject) {
    resolveProxy = resolve
  })

  var url = baseAddress + controller + '/' + action + '?' + $.param(query || {})
  if (resolveProxy) resolveProxy(url)
  return promise
}
var clientPost = function (action, controller, query, data, ajaxGlobal) {
  if (debug) {
    query = _.extend(query || {}, { openid: 'oxKlnuJnTV6TgnZ7hqzG_0-spINI' })
  }

  if (ajaxGlobal === undefined) {
    ajaxGlobal = true
  }

  var url = baseAddress + controller + '/' + action + '?' + $.param(query || {})

  var resolveProxy
  var promise = new Promise(function (resolve, reject) {
    resolveProxy = resolve
  })

  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    cache: false,
    global: ajaxGlobal,
    success: function (res) {
      if (resolveProxy) resolveProxy(res)
    },
    error: function (xhr, errorType, error) {
      console.log(xhr.status)
    }
  })

  return promise
}

var ajaxPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $ajax: {
        get: function () {
          var self = this
          return {
            get: _.bind(clientGet, self),
            geturl: _.bind(clientGetUrl, self),
            post: _.bind(clientPost, self)
          }
        }
      }
    })
  }
}

if (window.Vue) {
  Vue.use(ajaxPlugin)
}

export default ajaxPlugin

export const ajaxUtil = {
  get: clientGet,
  post: clientPost,
  geturl: clientGetUrl
}
