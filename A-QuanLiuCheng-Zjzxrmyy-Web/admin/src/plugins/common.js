import Vue from 'vue'
import _ from 'underscore'

var getDateStr = function (daySpanToday) {
  if (daySpanToday === undefined) {
    daySpanToday = 0
  }
  var i = daySpanToday
  var now = new Date()
  var date = new Date(now.valueOf() + i * 24 * 60 * 60 * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var yearStr = year.toString()
  var monthStr = month < 10 ? ('0' + month) : month.toString()
  var dayStr = day < 10 ? ('0' + day) : day.toString()
  var dateStr = yearStr + '-' + monthStr + '-' + dayStr

  return dateStr
}

var parseWeekday = function (weekday) {
  if (weekday === '0') {
    return '日'
  }
  if (weekday === '1') {
    return '一'
  }
  if (weekday === '2') {
    return '二'
  }
  if (weekday === '3') {
    return '三'
  }
  if (weekday === '4') {
    return '四'
  }
  if (weekday === '5') {
    return '五'
  }
  if (weekday === '6') {
    return '六'
  }
}

var getDayTip = function (date) {
  if (date === getDateStr(0)) {
    return '今天'
  } else if (date === getDateStr(1)) {
    return '明天'
  } else if (date === getDateStr(2)) {
    return '后天'
  } else {
    return ''
  }
}

var dateDiffSecond = function (date1, date2) {
  var type1 = typeof date1
  var type2 = typeof date2
  if (type1 === 'string') {
    date1 = strToDateTime(date1)
  } else if (date1.getTime) {
    date1 = date1.getTime()
  }
  if (type2 === 'string') {
    date2 = strToDateTime(date2)
  } else if (date2.getTime) {
    date2 = date2.getTime()
  }
  // 结果是秒
  return (date1 - date2) / 1000
}

var strToDateTime = function (string) {
  var f = string.split(' ', 2)
  var d = (f[0] ? f[0] : '').split('-', 3)
  var t = (f[1] ? f[1] : '').split(':', 3)
  return (new Date(
    parseInt(d[0], 10) || null,
    (parseInt(d[1], 10) || 1) - 1,
    parseInt(d[2], 10) || null,
    parseInt(t[0], 10) || null,
    parseInt(t[1], 10) || null,
    parseInt(t[2], 10) || null
  )).getTime()
}

var commonPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $common: {
        get: function () {
          var self = this
          return {
            getDateStr: _.bind(getDateStr, self),
            parseWeekday: _.bind(parseWeekday, self),
            getDayTip: _.bind(getDayTip, self),
            dateDiffSecond: _.bind(dateDiffSecond, self)
          }
        }
      }
    })
  }
}

if (window.Vue) {
  Vue.use(commonPlugin)
}

export default commonPlugin

export const commonUtil = {
  getDateStr: getDateStr,
  parseWeekday: parseWeekday,
  getDayTip: getDayTip,
  dateDiffSecond: dateDiffSecond
}
