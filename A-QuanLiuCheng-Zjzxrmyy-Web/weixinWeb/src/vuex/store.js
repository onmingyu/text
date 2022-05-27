import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import global from './modules/global'
import card from './modules/card'
import regOrder from './modules/reg-order'
import billOrder from './modules/bill-order'
import inpatientRegist from './modules/inpatient-regist'
Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    global,
    card,
    regOrder,
    billOrder,
    inpatientRegist
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
