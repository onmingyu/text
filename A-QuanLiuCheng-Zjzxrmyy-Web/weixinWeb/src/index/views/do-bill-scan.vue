<template>
  <div class="container">
    <div class="bill-detail" v-show="showDetail">
      <div class="weui_cells_title">就诊卡：</div>
      <div class="weui_cells weui_cells_access" style="margin-top:10px;">
        <a class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{cardName}} <span style="margin-left:15px;" class="blue_tag">{{order.cardType}}</span></p>
            <p>{{cardNo}}</p>
          </div>
        </a>
      </div>
      <div class="weui_cells_title">扫码缴费详情：</div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
              <span class="info">{{orderNo}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单科室</span>
              <span class="info">{{deptName}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单医生</span>
              <span class="info">{{doctorName}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">缴费金额</span>
              <span class="info">{{personalMoney}} 元</span>
            </p>
          </div>
        </div>
      </div>
      <a @click="doBill" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">确认缴费</a>
      <div v-show="yiBaoStatus == 1">
        <a @click="payFailed" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_default">取消缴费</a>
        <p style="padding:10px;" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 如想去窗口缴费，请点击【取消缴费】按钮后再去窗口缴费。
        </p>
      </div>
      <div>
        <p style="padding:10px;" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> {{platform}}缴费支持自费，不支持公费缴费。
        </p>
      </div>
      <div class="weui_cells_title">明细列表：</div>
      <div v-for="b in bills" class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary" style="background-color:#F0FFF0">
            <p>
              <span style="display: block;">处方单号：<span style="color: #0ae;">{{b.ClinicNo}}</span></span>
              <span style="display: block;">开单时间：<span style="color: #0ae;">{{b.OrderDate}}</span></span>
            </p>
          </div>
        </div>
        <div v-for="item in b.Items" class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span style="display: block;">名称： <span style="color: #0ae;">{{item.Name}}</span></span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">数量：<span style="color: #0ae;">{{item.Account}}</span></span>
              <span style="display: inline-block;width: 50%;float: left;">单位：<span style="color: #0ae;">{{item.Unit}}</span></span>
              </span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">单价：<span style="color: #0ae;">{{item.ItemPrice}} 元</span></span>
              <span style="display: inline-block;width: 50%;float: left;">小计：<span style="color: #0ae;">{{item.Money}} 元</span></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bill-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">缴费成功</h2>
          <p class="weui_msg_desc">{{succeedMsg}}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="goOrderDetail" class="weui_btn weui_btn_primary">查看详情</a>
          </p>
        </div>
      </div>
    </div>
    <div class="bill-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">缴费失败</h2>
          <p class="weui_msg_desc">{{failedMsg}}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style>
.weui_msg_desc label {
  width: 80px;
  display: inline-block;
}

.weui_msg_desc span {
  color: #0ae;
  font-weight: bolder;
}

span.label {
  display: inline-block;
  width: 80px;
}

span.info {
  color: #0ae;
}

.blue_tag {
  background-color: #0ae;
  color: #fff;
  font-size: 13px;
  padding: 2px 4px;
  border: none;
  vertical-align: middle;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
</style>
<script>
/*global WeixinJSBridge*/

import $ from 'jquery'
import {
  setBillOrderNum,
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast
} from '../../vuex/actions'

// import _ from 'underscore'

export default {
  name: 'DoBillScanView',
  data: function () {
    return {
      isCity: false,
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      succeedMsg: '',
      isPaySucceed: false,
      doctorName: '',
      deptName: '',
      orderDate: '',
      orderNo: '',
      cardNo: '',
      cardName: '',
      yiBaoStatus: -1,
      yiBaoFailedMsg: '',
      personalMoney: '',
      yiBaoMoney: '',
      bills: [],
      platform: process.env.PLATFORM
    }
  },
  methods: {
    doBill: function () {
      if (this.order.id === -1) {
        return
      }
      var self = this

      this.showLoadingToast({ msg: '正在缴费...' }, false)
      this.$ajax.get('PayBill', 'Bill', {
        orderId: this.order.id
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.failedMsg = data.ResultMsg
          self.showDetail = false
          self.showSuccess = false
          self.showFailed = true
          self.hideLoadingToast()
        } else {
          self.callPay(data.PayString)
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    goOrderDetail: function () {
      this.$router.replace({ name: 'billOrderDetail', params: { orderId: this.order.id } })
    },
    callPay: function (payString) {
      var self = this
      if (process.env.PAY_TYPE === 'weixin') {
        WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(payString), function (res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // 因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；
          // 若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            self.paySucceed()
          } else {
            self.payFailed()
          }
        })
      } else {
        // 支付操作
        var form = $(payString)
        form.submit()
      }
    },
    payFailed: function () {
      this.cancelPay()
      this.hideLoadingToast()

      this.showCommonToast({ msg: '您已取消缴费' })
      window.history.go(-1)
    },
    paySucceed: function () {
      this.isPaySucceed = true

      var self = this
      this.$ajax.get('GetBillStatus', 'Bill', {
        orderId: this.order.id
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.hideLoadingToast()
          window.history.go(-1)
        } else {
          if (data.BillStatus === '1') {
            self.failedMsg = data.FailedMsg
            self.showDetail = false
            self.showSuccess = false
            self.showFailed = true
            self.hideLoadingToast()
          } else if (data.BillStatus === '0') {
            if (self.isCity) {
              self.citySucceed()
            } else {
              self.showDetail = false
              self.showSuccess = true
              self.showFailed = false
              self.succeedMsg = data.ResultMsg
              self.hideLoadingToast()
            }
          } else {
            window.setTimeout(function () {
              self.paySucceed()
            }, 500)
          }
        }
      })
    },
    cancelPay: function () {
      if (this.order.id !== -1 && !this.isPaySucceed) {
        this.$ajax.get('PayFailed', 'Bill', {
          orderId: this.order.id
        }, false).then(function (data) {

        })
      }
    },
    citySucceed: function () {
      var self = this

      this.$ajax.get('GetTemplateMsg', 'City', {
        orderId: this.order.id,
        msgtype: 'jiaofei'
      }, false).then(function (data) {
        self.showDetail = false
        self.showSuccess = true
        self.showFailed = false
        self.hideLoadingToast()
        window.location = data
      })
    }
  },
  vuex: {
    getters: {
      order: ({ billOrder }) => billOrder
    },
    actions: {
      setBillOrderNum,
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('CreateBillOrderByScan', 'Bill', {
      urlId: this.$route.query.urlId
    }).then(function (data) {
      if (data.ResultCode !== '0') {
        self.failedMsg = data.ResultMsg
        self.showDetail = false
        self.showSuccess = false
        self.showFailed = true
      } else {
        self.setBillOrderNum(data.OrderId, data.OrderNo)
        self.personalMoney = data.SumFee
        self.doctorName = data.DoctorName
        self.deptName = data.DeptName
        self.orderDate = data.OrderDate
        self.cardNo = data.CardNo
        self.cardName = data.CardName
        self.bills = data.Bills
        self.orderNo = data.OrderNo
      }
    })
  },
  route: {
    // activate: function (transition) {
    //   // 阻止页面刷新，刷新时直接跳往首页
    //   if (transition.from.name === undefined) {
    //     this.$router.go({ name: 'portal' })
    //   } else {
    //     transition.next()
    //   }
    // },
    deactivate: function (transition) {
      this.cancelPay()
      this.setBillOrderNum(-1, '')
      transition.next()
    }
  }
}
</script>
