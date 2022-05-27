import Vue from 'vue'
import Router from 'vue-router'

// plugins
import Ajax from '../plugins/ajax'
import Cookie from '../plugins/cookie'
import Common from '../plugins/common'

// root View
import AppView from './app'
import * as filters from '../fiiter/index.js'
// console.log(filters);
// 全局注册过滤器
Object.keys(filters).forEach((key) => {
	// console.log(filters[key]);
  Vue.filter(key, filters[key])
})
// 全局引入global
import global from '../global/global.js'
Vue.prototype.global = global
// views
import Ajax401View from './views/401'
import Ajax500View from './views/500'
import HospSchedulingView from './views/hosp-scheduling'
import PortalView from './views/portal'
import HospDescView from './views/hosp-desc'
import DepartListView from './views/depart-list'
import DepartDetailView from './views/depart-detail'
import DrDetailView from './views/dr-detail'
import SelectRegSliceView from './views/select-reg-slice'
import SelectRegSliceTodayView from './views/select-reg-slice-today'
import SelectRegPointView from './views/select-reg-point'
import SelectHealthCardView from './views/select-health-card'
import SelectCardView from './views/select-card'
import AddBindingCardView from './views/add-binding-card'
import AddNewCardView from './views/add-new-card'
import ManageCardView from './views/manage-card'
import CardDetailView from './views/card-detail'
import DoRegView from './views/do-reg'
import DoRegPayView from './views/do-reg-pay'
import DoBillScanView from './views/do-bill-scan'
import MenuScanView from './views/menu-scan'
import MenuScanSelectView from './views/menu-scan-select'
import RegOrderListView from './views/reg-order-list'
import RegOrderDetailView from './views/reg-order-detail'
import ApptOrderListView from './views/appt-order-list'
import ApptOrderDetailView from './views/appt-order-detail'
import GetOtherApptView from './views/get-other-appt'
import GetBillView from './views/get-bill'
import GetBillNewView from './views/get-bill-new'
import DoBillView from './views/do-bill'
import OrderListView from './views/order-list'
import BillOrderListView from './views/bill-order-list'
import BillOrderDetailView from './views/bill-order-detail'
import GetQueueView from './views/get-queue'
import GetInspectionView from './views/get-inspection'
import GetInspectionAliView from './views/get-inspection-ali'
import GetCheckView from './views/get-check'
import GetCheckDetailView from './views/get-check-detail'
import GetInpatientView from './views/get-inpatient'
import GetInpatientBillView from './views/get-inpatient-bill'
import DoPrepayView from './views/do-prepay'
import PrepayOrderList from './views/prepay-order-list'
import PrepayOrderDetail from './views/prepay-order-detail'
import CityPortalView from './views/city-portal'

import EducationTypeView from './views/education-type'
import EducationListsView from './views/education-lists'
import EducationDetailView from './views/education-detail'

import PaperListView from './views/paper-list'
import PaperDetailView from './views/paper-detail'
import HaizhuNoticeView from './views/haizhu-notice'
import HospServiceDescView from './views/hosp-service-desc'

import SelectInpatientAddressView from './views/select-inpatient-address'
import SetInpatientRegistView from './views/set-inpatient-regist'
import DoRegCallbackView from './views/do-reg-callback'
import DoBillCallbackView from './views/do-bill-callback'
import DoPrepayCallbackView from './views/do-prepay-callback'

import BodyListView from './views/body-list'
import BodySecondListView from './views/body-second-list'
import SymptomsDetailView from './views/symptoms-detail'
import BodyNavigateView from './views/body-navigate'

import HospContactView from './views/hosp-contact'
import GetOrderListView from './views/get-order-list'
import SelectRegSliceDoctorView from './views/select-reg-slice-doctor'
import HealthCardDetailView from './views/health-card-detail'
import ManageHealthCardView from './views/manage-health-card'
import NewHealthCardView from './views/new-health-card'
import MenuInpayView from './views/menu-inpay'
import HospListView from './views/hosp-list'
import DoDnaView from './views/do-Dna'
import DoDnaOrderListView from './views/doDna-order-list'
import DoDnaOrderDetailView from './views/doDna-order-detail'
import HealthQuestionView from './views/health-question'
import HealthQuestionInfoView from './views/health-question-info'
import GetInspectionDetalView from './views/get-inspection-detal'
import ServiceListView from './views/service-list'
import TjJumpView from './views/tj-jump'
import BjorderDetailView from './views/bjorder-detail'
import ThirdpartyMenuView from './views/thirdparty-menu'
import GetBillListView from './views/get-bill-list'
import GetHsCheckView from './views/get-hscheck'

// install plugins
Vue.use(Router)
Vue.use(Ajax)
Vue.use(Cookie)
Vue.use(Common)
// <div style="height:8px;"></div>div class="am-ft-center am-ft-13 am-ft-darkgray" ><img src="http://www.dr0759.cn/h5/static/cmb.png" alt="logo" width="100" height="20"/>;技术支持：<img src="http://www.dr0759.cn/h5/static/favicon.png" alt="logo"/>倍康益众<img src="http://www.dr0759.cn/h5/static/liantong.png" alt="logo" width="15" height="15"/>中国联通</div><div style="height:8px;"></div>
// registe partial
Vue.partial('footer-copyright', '')

// routing
var router = new Router()

router.map({
  '/index/401': {
    name: '401',
    component: Ajax401View
  },
  '/index/500': {
    name: '500',
    component: Ajax500View
  },
  '/index/portal': {
    name: 'portal',
    component: PortalView
  },
  '/index/hosp-desc': {
    name: 'hospDesc',
    component: HospDescView
  },
  '/index/hosp-scheduling/:deptName/:departId/:drId/:selectedDay': {
    name: 'hospScheduling',
    component: HospSchedulingView
  },
  // query:
  // purpose -- 行为意图
  //   detail 查看详情
  //   appt 预约挂号 含 当日挂号
  // branchName -- 分院名称
  //   panyu 番禺
  //   yuexiu 越秀
  //   haizhu 海珠
  '/index/depart-list': {
    name: 'departList',
    component: DepartListView
  },
  // departId -- 科室id
  '/index/depart-detail/:departId': {
    name: 'departDetail',
    component: DepartDetailView
  },
  // departId -- 科室id
  // drId -- 医生id
  // selectedDay -- 默认已选日期，为空则使用服务器的已选日期
  '/index/dr-detail/:departId/:drId/:selectedDay': {
    name: 'drDetail',
    component: DrDetailView
  },
  '/index/select-reg-slice-doctor': {
    name: 'selectRegDoctorSlice',
    component: SelectRegSliceDoctorView
  },
  // departId -- 要挂号的科室id
  // drId -- 要挂号的医生id， -1表示不限定医生
  // selectedDay -- 默认已选日期，为空则使用服务器的已选日期
  '/index/select-reg-slice/:departId/:drId/:selectedDay': {
    name: 'selectRegSlice',
    component: SelectRegSliceView
  },
  // departId -- 要挂号的科室id
  // drId -- 要挂号的医生id， -1表示不限定医生
  // selectedDay -- 默认已选日期，为空则使用服务器的已选日期
  '/index/select-reg-slice-today/:departId/:drId/:selectedDay': {
    name: 'selectRegSliceToday',
    component: SelectRegSliceTodayView
  },
  // 从vuex regOrder 中获取 已选时段的信息
  '/index/select-reg-point': {
    name: 'selectRegPoint',
    component: SelectRegPointView
  },
  // 从vuex regOrder 中获取 挂号信息
  '/index/do-reg': {
    name: 'doReg',
    component: DoRegView
  },
  '/index/do-reg-pay': {
    name: 'doRegPay',
    component: DoRegPayView
  },
  '/index/do-bill-scan': {
    name: 'doBillScan',
    component: DoBillScanView
  },
  // 返回时直接走历史回退，已选择的卡从vuex modules card 中获取
  // 如果 query.nextRoutePath 有值，则完成后跳转到这个路由路径
  '/index/select-card': {
    name: 'selectCard',
    component: SelectCardView
  },
  '/index/select-health-card': {
    name: 'selectHealthCard',
    component: SelectHealthCardView
  },
  // 返回时直接走历史回退
  // 如果 query.nextRoutePath 有值，则完成后跳转到这个路由路径
  '/index/add-binding-card': {
    name: 'addBindingCard',
    component: AddBindingCardView
  },
  // 返回时直接走历史回退
  // 如果 query.nextRoutePath 有值，则完成后跳转到这个路由路径
  '/index/add-new-card': {
    name: 'addNewCard',
    component: AddNewCardView
  },
  '/index/manage-card': {
    name: 'manageCard',
    component: ManageCardView
  },
  // cardId -- 就诊卡id
  '/index/card-detail/:cardId': {
    name: 'cardDetail',
    component: CardDetailView
  },
  '/index/reg-order-list': {
    name: 'regOrderList',
    component: RegOrderListView
  },
  '/index/appt-order-list': {
    name: 'apptOrderList',
    component: ApptOrderListView
  },
  '/index/appt-order-detail': {
    name: 'apptOrderDetail',
    component: ApptOrderDetailView
  },
  // orderId -- 订单Id
  '/index/reg-order-detail/:orderId': {
    name: 'regOrderDetail',
    component: RegOrderDetailView
  },
  '/index/get-other-appt': {
    name: 'getOtherAppt',
    component: GetOtherApptView
  },
  '/index/get-bill': {
    name: 'getBill',
    component: GetBillView
  },
  '/index/get-bill-new': {
    name: 'getBillNew',
    component: GetBillNewView
  },
  // query
  // clinicNo -- 就诊流水号
  // prescMoney -- 金额
  // orderDept -- 开单科室
  // orderDate -- 开单时间
  '/index/do-bill': {
    name: 'doBill',
    component: DoBillView
  },
  '/index/order-list': {
    name: 'orderList',
    component: OrderListView
  },
  '/index/bill-order-list': {
    name: 'billOrderList',
    component: BillOrderListView
  },
  '/index/bill-order-detail/:orderId': {
    name: 'billOrderDetail',
    component: BillOrderDetailView
  },
  '/index/get-queue': {
    name: 'getQueue',
    component: GetQueueView
  },
  '/index/get-inspection': {
    name: 'getInspection',
    component: GetInspectionView
  },
  '/index/get-inspection-detal': {
    name: 'getInspectiondetal',
    component: GetInspectionDetalView
  },
  '/index/get-inspection-ali': {
    name: 'getInspectionAli',
    component: GetInspectionAliView
  },
  '/index/get-check': {
    name: 'getCheck',
    component: GetCheckView
  },
  '/index/get-check-detail/:index/:appNo': {
    name: 'getCheckDetail',
    component: GetCheckDetailView
  },
  '/index/menu-scan': {
    name: 'menuScan',
    component: MenuScanView
  },
  '/index/menu-scan-select': {
    name: 'menuScanSelect',
    component: MenuScanSelectView
  },
  '/index/get-inpatient': {
    name: 'getInpatient',
    component: GetInpatientView
  },
  '/index/get-inpatient-bill': {
    name: 'getInpatientBill',
    component: GetInpatientBillView
  },
  '/index/do-prepay': {
    name: 'doPrepay',
    component: DoPrepayView
  },
  '/index/prepay-order-list': {
    name: 'prepayOrderList',
    component: PrepayOrderList
  },
  '/index/prepay-order-detail/:orderId': {
    name: 'prepayOrderDetail',
    component: PrepayOrderDetail
  },
  '/index/education-type': {
    name: 'educationType',
    component: EducationTypeView
  },
  '/index/education-lists/:educationType': {
    name: 'educationLists',
    component: EducationListsView
  },
  '/index/education-detail/:educationId': {
    name: 'educationDetail',
    component: EducationDetailView
  },
  '/index/paper-list': {
    name: 'paperList',
    component: PaperListView
  },
  '/index/paper-detail/:paperId': {
    name: 'paperDetail',
    component: PaperDetailView
  },
  '/index/hosp-service-desc': {
    name: 'hospServiceDesc',
    component: HospServiceDescView
  },
  '/index/haizhu-notice': {
    name: 'haizhuNotice',
    component: HaizhuNoticeView
  },
  '/index/city-portal': {
    name: 'cityPortal',
    component: CityPortalView
  },
  '/index/select-inpatient-address': {
    name: 'selectInpatientAddress',
    component: SelectInpatientAddressView
  },
  '/index/set-inpatient-regist': {
    name: 'setInpatientRegist',
    component: SetInpatientRegistView
  },
  '/index/do-reg-callback': {
    name: 'doRegCallback',
    component: DoRegCallbackView
  },
  '/index/do-bill-callback': {
    name: 'doBillCallback',
    component: DoBillCallbackView
  },
  '/index/do-prepay-callback': {
    name: 'doPrepayCallback',
    component: DoPrepayCallbackView
  },
  '/index/body-list': {
    name: 'bodyList',
    component: BodyListView
  },
  '/index/body-second-list/:parentId/:groupId/:code/:bodyName': {
    name: 'bodySecondList',
    component: BodySecondListView
  },
  '/index/symptoms-detail/:symptomsId': {
    name: 'symptomsDetail',
    component: SymptomsDetailView
  },
  '/index/body-navigate/': {
    name: 'bodyNavigate',
    component: BodyNavigateView
  },
  '/index/get-order-list': {
    name: 'getOrderList',
    component: GetOrderListView
  },
  '/index/hosp-contact/': {
    name: 'HospContact',
    component: HospContactView
  },
  '/index/manage-health-card': {
    name: 'manageHealthCard',
    component: ManageHealthCardView
  },
  '/index/health-card-detail': {
    name: 'healthCardDetail',
    component: HealthCardDetailView
  },
  '/index/new-health-card': {
    name: 'newHealthCard',
    component: NewHealthCardView
  },
  '/index/menu-inpay': {
    name: 'menuInpay',
    component: MenuInpayView
  },
  '/index/hosp-list': {
    name: 'hospList',
    component: HospListView
  },
  '/index/do-Dna': {
    name: 'doDna',
    component: DoDnaView
  },
  '/index/doDna-order-list': {
    name: 'doDnaOrderList',
    component: DoDnaOrderListView
  },
  '/index/doDna-order-detail': {
    name: 'doDnaOrderDetail',
    component: DoDnaOrderDetailView
  },
  '/index/health-question': {
    name: 'healthQuestion',
    component: HealthQuestionView
  },
  '/index/health-question-info': {
    name: 'healthQuestionInfo',
    component: HealthQuestionInfoView
  },
  '/index/service-list': {
    name: 'servicelist',
    component: ServiceListView
  },
  '/index/tj-jump': {
    name: 'tjjump',
    component: TjJumpView
  },
  '/index/bjorder-detail': {
    name: 'bjorderDetail',
    component: BjorderDetailView
  },
  '/index/thirdparty-menu': {
    name: 'thirdpartyMenu',
    component: ThirdpartyMenuView
  },
  '/index/get-bill-list': {
    name: 'getbilllist',
    component: GetBillListView
  },
  '/index/get-hscheck': {
    name: 'getHsCheck',
    component: GetHsCheckView
  }
})
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/index/portal'
})

router.start(AppView, 'app')
