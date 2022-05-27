import Vue from 'vue'
import _ from 'underscore'

var getCookie = function (key) {
  var result
  return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null
}

var cookiePlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $cookie: {
        get: function () {
          var self = this
          return {
            get: _.bind(getCookie, self)
          }
        }
      }
    })
  }
}

if (window.Vue) {
  Vue.use(cookiePlugin)
}

export default cookiePlugin

export const cookieUtil = {
  get: getCookie
}
