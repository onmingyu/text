/* 挂号订单模块，只包含当前操作订单的信息，不含历史订单等信息 */
import {
  SET_REG_SLICE,
  SET_REG_POINT,
  SET_REG_ORDER_TYPE,
  SET_REG_CARD,
  SET_CARD_REG_FEE,
  SET_REG_ORDER_NUM
} from '../mutation-types'

// initial state
const state = {
  // 订单ID
  id: -1,
  // 订单编号
  num: '',
  // 订单类型，'当日有序','当日无序','预约有序','预约无序','预约取号'
  type: '',
  // 科室ID
  departId: '',
  // 科室名称
  departName: '',
  // 医生科室名称
  drDepartName: '',
  // 医生ID
  drId: '',
  // 医生名称
  drName: '',
  // 医生职称
  drTitle: '',
  // 就诊日期
  regDt: '',
  // 号源类型
  regType: '',
  // 排班名称
  timeSlice: '',
  // 排班开始时间
  startTime: '',
  // 排班结束时间
  endTime: '',
  // 挂号费
  fee: 0,
  // 诊疗费
  treatFee: 0,
  // 其它费
  otherFee: 0,
  // 总费用
  sumFee: 0,
  // 就诊序号
  seqNo: '',
  // 序号开始时间
  seqStartTime: '',
  // 序号结束时间
  seqEndTime: '',
  // 就诊卡ID
  cardId: -1,
  // 就诊卡号
  cardNum: '',
  // 就诊卡姓名
  cardName: '',
  // 就诊卡类型
  cardType: '',
  // 就诊卡相关的挂号费
  cardFee: 0,
  // 就诊卡相关的诊疗费
  cardTreatFee: 0,
  // 就诊卡相关的其他费
  cardOtherFee: 0,
  // 就诊卡相关的总费用
  cardSumFee: 0,
  idNumber: ''
}

// mutations
const mutations = {
  [SET_REG_SLICE] (state, departId, departName, drDepartName, drId, drName, drTitle, regDt, regType, timeSlice, startTime, endTime,
    fee, treatFee, otherFee, sumFee) {
    state.departId = departId
    state.departName = departName
    state.drDepartName = drDepartName
    state.drId = drId
    state.drName = drName
    state.drTitle = drTitle
    state.regDt = regDt
    state.regType = regType
    state.timeSlice = timeSlice
    state.startTime = startTime
    state.endTime = endTime
    state.fee = fee
    state.treatFee = treatFee
    state.otherFee = otherFee
    state.sumFee = sumFee
    state.cardFee = fee
    state.cardTreatFee = treatFee
    state.cardOtherFee = otherFee
    state.cardSumFee = sumFee
  },
  [SET_REG_POINT] (state, seqNo, seqStartTime, seqEndTime) {
    state.seqNo = seqNo
    state.seqStartTime = seqStartTime
    state.seqEndTime = seqEndTime
  },
  [SET_REG_ORDER_TYPE] (state, orderType) {
    state.type = orderType
  },
  [SET_REG_CARD] (state, cardId, cardNum, cardName, cardType, idNumber) {
    state.cardId = cardId
    state.cardNum = cardNum
    state.cardName = cardName
    state.cardType = cardType
    state.idNumber = idNumber
  },
  [SET_CARD_REG_FEE] (state, regFee, treatFee, otherFee) {
    state.cardFee = regFee
    state.cardTreatFee = treatFee
    state.cardOtherFee = otherFee
    state.cardSumFee = regFee + treatFee + otherFee
  },
  [SET_REG_ORDER_NUM] (state, orderId, orderNum) {
    state.id = orderId
    state.num = orderNum
  }
}

export default {
  state,
  mutations
}
