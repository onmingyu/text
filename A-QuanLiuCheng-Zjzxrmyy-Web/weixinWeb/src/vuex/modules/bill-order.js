/* 缴费订单模块，只包含当前操作订单的信息，不含历史订单等信息 */
import {
  SET_BILL,
  SET_BILL_CARD,
  SET_BILL_ORDER_NUM
} from '../mutation-types'

// initial state
const state = {
  // 订单ID
  id: -1,
  // 订单编号
  num: '',
  // 就诊流水号
  clinicNo: '',
  // 费用
  prescMoney: '',
  // 开单科室
  orderDept: '',
  // 开单时间
  orderDate: '',
  // 就诊卡ID
  cardId: -1,
  // 就诊卡号
  cardNum: '',
  // 就诊卡姓名
  cardName: '',
  // 就诊卡类型
  cardType: '',
  // 开单医生
  doctorName: '',
  idNumber: ''
}

const mutations = {
  [SET_BILL] (state, doctorName, orderDept) {
    state.doctorName = doctorName
    state.orderDept = orderDept
  },
  [SET_BILL_CARD] (state, cardId, cardNum, cardName, cardType, idNumber) {
    state.cardId = cardId
    state.cardNum = cardNum
    state.cardName = cardName
    state.cardType = cardType
    state.idNumber = idNumber
  },
  [SET_BILL_ORDER_NUM] (state, orderId, orderNum) {
    state.id = orderId
    state.num = orderNum
  }
}

export default {
  state,
  mutations
}
