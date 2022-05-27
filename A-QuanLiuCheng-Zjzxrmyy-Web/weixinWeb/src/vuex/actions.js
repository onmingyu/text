import * as types from './mutation-types'
import { ajaxUtil } from '../plugins/ajax'
import _ from 'underscore'
import wx from 'weixin-js-sdk'

/* actions for global */

var alertResolve = null

export const showAlert = ({ dispatch }, options) => {
  options = _.extend({
    title: '标题',
    msg: '正文',
    btnText: '确定'
  }, options)

  dispatch(types.SHOW_ALERT, options)
  var promise = new Promise(function (resolve, reject) {
    alertResolve = resolve
  })

  return promise
}

export const closeAlert = ({ dispatch }) => {
  dispatch(types.HIDE_ALERT)
  if (alertResolve) {
    alertResolve()
  }
}

var confirmResolve = null

export const showConfirm = ({ dispatch }, options) => {
  options = _.extend({
    title: '标题',
    msg: '正文',
    btnNoText: '取消',
    btnYesText: '确定'
  }, options)

  dispatch(types.SHOW_CONFIRM, options)
  var promise = new Promise(function (resolve, reject) {
    confirmResolve = resolve
  })

  return promise
}

export const closeConfirm = ({ dispatch }, clickedBtn) => {
  dispatch(types.HIDE_CONFIRM)
  if (confirmResolve) {
    confirmResolve(clickedBtn)
  }
}

export const showCommonToast = ({ dispatch }, options, autoClose) => {
  options = _.extend({
    msg: '内容'
  }, options)

  if (autoClose === undefined) {
    autoClose = true
  }

  dispatch(types.SHOW_COMMON_TOAST, options)

  if (autoClose) {
    window.setTimeout(function () { dispatch(types.HIDE_COMMON_TOAST) }, 5000)
  }
}

export const hideCommonToast = ({ dispatch }) => {
  dispatch(types.HIDE_COMMON_TOAST)
}

export const showLoadingToast = ({ dispatch }, options, autoClose) => {
  options = _.extend({
    msg: '加载中...'
  }, options)

  if (autoClose === undefined) {
    autoClose = true
  }

  dispatch(types.SHOW_LOADING_TOAST, options)
  if (autoClose) {
    window.setTimeout(function () { dispatch(types.HIDE_LOADING_TOAST) }, 2000)
  }
}

export const hideLoadingToast = ({ dispatch }) => {
  dispatch(types.HIDE_LOADING_TOAST)
}

export const showSuccessToast = ({ dispatch }, options, autoClose) => {
  options = _.extend({
    msg: '已完成'
  }, options)

  if (autoClose === undefined) {
    autoClose = true
  }

  dispatch(types.SHOW_SUCCESS_TOAST, options)

  if (autoClose) {
    window.setTimeout(function () { dispatch(types.HIDE_SUCCESS_TOAST) }, 2000)
  }
}

export const hideSuccessToast = ({ dispatch }) => {
  dispatch(types.HIDE_SUCCESS_TOAST)
}

/* actions for card */

// 从服务器读取就诊卡列表
export const loadCardsFromServer = (store, cardId) => {
  var state = store.state
  var dispatch = store.dispatch
  dispatch(types.DELETE_CARDS)
  var selectingCardId = -1
  if (state.card.cards.length <= 0) {
    ajaxUtil.get('GetAll', 'Card').then(data => {
      var lCards = _.map(data.Cards, (val) => {
        if (val.IsDefault) {
          selectingCardId = val.Id
        }
        return {
          id: val.Id,
          type: val.Type,
          num: val.Num,
          name: val.Name,
          isDefault: val.IsDefault,
          isSelected: false,
          idNumber: val.IdNumber,
          qrCode: val.QrCode,
          phone: val.Phone,
          qrCodeText: val.QrCodeText,
          PatientId: val.PatientId
        }
      })
      dispatch(types.ADD_CARDS, lCards)
      if (cardId) {
        selectingCardId = cardId
      }
      if (selectingCardId !== -1) {
        selectCard(store, selectingCardId, false)
      }
    })
  }
}

// 设定默认就诊卡
export const setDefaultCard = (store, cardId) => {
  var dispatch = store.dispatch
  ajaxUtil.get('SetDefault', 'Card', { id: cardId }).then(data => {
    if (data.ResultCode === '0') {
      dispatch(types.SET_DEFAULT_CARD, cardId)
    }
  })
}

// 获取默认就诊卡
export const getDefaultCard = (store) => {
  var state = store.state
  var defaultCard = _.findWhere(state.card.cards, { isDefault: true })
  return defaultCard
}

// 选择就诊卡
export const selectCard = (store, cardId, setDefault) => {
  var dispatch = store.dispatch
  var state = store.state
  dispatch(types.SELECT_CARD, cardId)

  if (setDefault) {
    setDefaultCard(store, cardId)
  }

  var selectedCard = _.findWhere(state.card.cards, { isSelected: true })
  if (selectedCard) {
    // 选择挂号的就诊卡
    dispatch(types.SET_REG_CARD, selectedCard.id, selectedCard.num, selectedCard.name, selectedCard.type, selectedCard.idNumber)
      // 选择缴费的就诊卡
    dispatch(types.SET_BILL_CARD, selectedCard.id, selectedCard.num, selectedCard.name, selectedCard.type, selectedCard.idNumber)
  }
}

// 绑定就诊卡
export const addBindingCard = (store, card) => {
  var dispatch = store.dispatch

  var pResolve = null
  var promise = new Promise(function (resolve, reject) {
    pResolve = resolve
  })

  ajaxUtil.get('AddBinding', 'Card', card).then(data => {
    if (data.ResultCode === '0') {
      var newCard = {
        id: data.Id,
        type: data.Type,
        num: data.Num,
        name: data.Name,
        isDefault: data.IsDefault,
        isSelected: data.IsSelected
      }
      dispatch(types.ADD_CARDS, [newCard])
      if (newCard.isDefault) {
        setDefaultCard(store, newCard.id)
      }
      pResolve({ isSucceed: true, msg: '绑定成功' })
    } else {
      pResolve({ isSucceed: false, msg: data.ResultMsg })
    }
  })
  return promise
}

// 初诊建卡
export const addNewCard = (store, card) => {
  var dispatch = store.dispatch

  var pResolve = null
  var promise = new Promise(function (resolve, reject) {
    pResolve = resolve
  })

  ajaxUtil.get('AddNew', 'Card', card).then(data => {
    if (data.ResultCode === '0') {
      var newCard = {
        id: data.Id,
        type: data.Type,
        num: data.Num,
        name: data.Name,
        isDefault: data.IsDefault,
        isSelected: data.IsSelected
      }
      dispatch(types.ADD_CARDS, [newCard])
      if (newCard.isDefault) {
        setDefaultCard(store, newCard.id)
      }
      pResolve({ isSucceed: true, msg: '建卡成功' })
    } else {
      pResolve({ isSucceed: false, msg: data.ResultMsg })
    }
  })

  return promise
}

// 删除就诊卡
export const deleteCard = (store, cardId) => {
  var state = store.state
  var dispatch = store.dispatch
  var pResolve = null
  var promise = new Promise(function (resolve, reject) {
    pResolve = resolve
  })

  ajaxUtil.get('Delete', 'Card', { id: cardId }).then(data => {
    if (data.ResultCode === '0') {
      dispatch(types.DELETE_CARD, cardId)
      var defaultCard = getDefaultCard(store)
      if (!defaultCard && state.card.cards.length > 0) {
        setDefaultCard(store, state.card.cards[0].id)
      }

      pResolve({ isSucceed: true, msg: '删除成功' })
    } else {
      pResolve({ isSucceed: false, msg: '删除失败' })
    }
  })

  return promise
}

// 初诊建卡
export const addNewHealthCard = (store, card) => {
  // var dispatch = store.dispatch
  var pResolve = null
  var promise = new Promise(function (resolve, reject) {
    pResolve = resolve
  })

  ajaxUtil.get('AddNewHealthCard', 'Card', card).then(data => {
    if (data.ResultCode === '0') {
      var newCard = {
        id: data.HealthCardInfo.Id,
        type: data.HealthCardInfo.Type,
        num: data.HealthCardInfo.Num,
        name: data.HealthCardInfo.Name,
        isDefault: data.HealthCardInfo.IsDefault,
        isSelected: data.HealthCardInfo.IsSelected,
        idNumber: data.HealthCardInfo.IdNumber,
        qrCode: data.HealthCardInfo.QrCode,
        phone: data.HealthCardInfo.Phone,
        qrCodeText: data.HealthCardInfo.QrCodeText,
        idenNo: data.HealthCardInfo.IdenNo,
        gender: data.HealthCardInfo.Gender,
        birthdate: data.HealthCardInfo.Birthdate,
        idenType: data.HealthCardInfo.IdenType
      }
      loadCardsFromServer(store, newCard.id)
      if (newCard.isDefault) {
        setDefaultCard(store, newCard.id)
      }
      pResolve({ isSucceed: true, msg: '建卡成功', cardInfo: newCard })
    } else {
      pResolve({ isSucceed: false, msg: data.ResultMsg })
    }
  })

  return promise
}

/* actions for reg-order */

// 获取默认挂号就诊卡
export const setDefaultRegCard = (store) => {
  var dispatch = store.dispatch
  var defaultCard = getDefaultCard(store)
  if (defaultCard) {
    dispatch(types.SET_REG_CARD, defaultCard.id, defaultCard.num, defaultCard.name, defaultCard.type, defaultCard.idNumber)
    return true
  } else {
    dispatch(types.SET_REG_CARD, -1, '', '', '', '')
    return false
  }
}

// 清空挂号就诊卡
export const clearRegCard = (store) => {
  var dispatch = store.dispatch
  dispatch(types.SET_REG_CARD, -1, '', '', '', '')
}

// 设定挂号订单的类型，'当日有序','当日无序','预约有序','预约无序','预约取号'
export const setRegOrderType = (store, orderType) => {
  var dispatch = store.dispatch
  dispatch(types.SET_REG_ORDER_TYPE, orderType)
}

// 设置要挂号的排班信息
export const setRegSlice = (store, departId, departName, drDepartName, drId, drName, drTitle, regDt, regType, timeSlice, startTime, endTime,
  fee, treatFee, otherFee, sumFee) => {
  var dispatch = store.dispatch
  dispatch(types.SET_REG_SLICE, departId, departName, drDepartName, drId, drName, drTitle, regDt, regType, timeSlice, startTime, endTime,
    fee, treatFee, otherFee, sumFee)
}

// 设置要挂号的分时信息
export const setRegPoint = (store, seqNo, seqStartTime, seqEndTime) => {
  var dispatch = store.dispatch
  dispatch(types.SET_REG_POINT, seqNo, seqStartTime, seqEndTime)
}

// 设置挂号费用
export const setCardRegFee = (store, regFee, treatFee, otherFee) => {
  var dispatch = store.dispatch
  dispatch(types.SET_CARD_REG_FEE, regFee, treatFee, otherFee)
}

// 设置挂号订单Id 和 订单号
export const setRegOrderNum = (store, orderId, orderNum) => {
  var dispatch = store.dispatch
  dispatch(types.SET_REG_ORDER_NUM, orderId, orderNum)
}

/* actions for bill-order */

// 获取默认缴费就诊卡
export const setDefaultBillCard = (store) => {
  var dispatch = store.dispatch
  var defaultCard = getDefaultCard(store)
  if (defaultCard) {
    dispatch(types.SET_BILL_CARD, defaultCard.id, defaultCard.num, defaultCard.name, defaultCard.type, defaultCard.idNumber)
    return true
  } else {
    dispatch(types.SET_BILL_CARD, -1, '', '', '', '')
    return false
  }
}

// 清空缴费就诊卡
export const clearBillCard = (store) => {
  var dispatch = store.dispatch
  dispatch(types.SET_BILL_CARD, -1, '', '', '', '')
}

// 设置要缴费的缴费单信息
export const setBill = (store, doctorName, orderDept) => {
  var dispatch = store.dispatch
  dispatch(types.SET_BILL, doctorName, orderDept)
}

// 设置缴费订单Id 和 订单号
export const setBillOrderNum = (store, orderId, orderNum) => {
  var dispatch = store.dispatch
  dispatch(types.SET_BILL_ORDER_NUM, orderId, orderNum)
}

export const loadWxJsConfig = (store) => {
  ajaxUtil.get('GetJsSignature', 'PatientClinic').then(data => {
    wx.config({
      debug: false,
      appId: data.AppId,
      timestamp: data.Timestamp,
      nonceStr: data.NonceStr,
      signature: data.Signature,
      jsApiList: [
        'getNetworkType',
        'openLocation',
        'getLocation',
        'requestWxFacePictureVerify',
        'scanQRCode'
      ],
      openTagList: ['wx-open-launch-weapp']
    })
  })
}

