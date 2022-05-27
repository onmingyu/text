/*
  全站 store 模块
*/

import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  SHOW_COMMON_TOAST,
  SHOW_LOADING_TOAST,
  SHOW_SUCCESS_TOAST,
  HIDE_COMMON_TOAST,
  HIDE_LOADING_TOAST,
  HIDE_SUCCESS_TOAST
} from '../mutation-types'

// initial state
const state = {
  alertIsShow: false,
  alertOptions: {
    title: '标题',
    msg: '正文',
    btnText: '确定'
  },

  confirmIsShow: false,
  confirmOptions: {
    title: '标题',
    msg: '正文',
    btnNoText: '取消',
    btnYesText: '确定'
  },

  commonToastIsShow: false,
  commonToastOptions: {
    msg: '内容'
  },
  loadingToastIsShow: false,
  loadingToastOptions: {
    msg: '加载中...'
  },
  successToastIsShow: false,
  successToastOptions: {
    msg: '已完成'
  }
}

// mutations
const mutations = {
  [SHOW_ALERT] (state, options) {
    state.alertIsShow = true
    state.alertOptions = options
  },
  [HIDE_ALERT] (state) {
    state.alertIsShow = false
  },
  [SHOW_CONFIRM] (state, options) {
    state.confirmIsShow = true
    state.confirmOptions = options
  },
  [HIDE_CONFIRM] (state) {
    state.confirmIsShow = false
  },
  [SHOW_COMMON_TOAST] (state, options) {
    state.commonToastIsShow = true
    state.commonToastOptions = options
  },
  [HIDE_COMMON_TOAST] (state) {
    state.commonToastIsShow = false
  },
  [SHOW_LOADING_TOAST] (state, options) {
    state.loadingToastIsShow = true
    state.loadingToastOptions = options
  },
  [HIDE_LOADING_TOAST] (state) {
    state.loadingToastIsShow = false
  },
  [SHOW_SUCCESS_TOAST] (state, options) {
    state.successToastIsShow = true
    state.successToastOptions = options
  },
  [HIDE_SUCCESS_TOAST] (state) {
    state.successToastIsShow = false
  }
}

export default {
  state,
  mutations
}
