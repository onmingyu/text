<template>
  <div class="container">
    <div class="reg-detail" v-show="showDetail">
      <div class="weui_cells_title">就诊卡：</div>
      <div class="weui_cells weui_cells_access" style="margin-top: 10px">
        <a class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{ cardName }}</p>
            <p>{{ cardNo }}</p>
          </div>
          <div v-show="canSelectCard" class="weui_cell_ft">选就诊卡</div>
        </a>
      </div>
      <div class="weui_cells_title">补交详情：</div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">订单类型</span>
              <span class="info">{{ orderType }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label"
                >科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</span
              >
              <span class="info">{{ deptName }}</span>
            </p>
          </div>
        </div>
        <!-- <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生</span>
              <span class="info">{{doctorName}}</span>
            </p>
          </div>
        </div> -->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">就诊日期</span>
              <span class="info">{{ regDate }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">总&nbsp;&nbsp;费&nbsp;&nbsp;用</span>
              <span class="info">{{ sumFee }} 元</span>
            </p>
          </div>
        </div>
        <!--  <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">支付时间</span>
              <span class="info">{{createDt}}</span>
            </p>
          </div>
        </div> -->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">退费时间</span>
              <span class="info">{{ refundTime }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell" v-show="status === '8'">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">补交状态</span>
              <span class="info">已补交</span>
            </p>
          </div>
        </div>
      </div>
      <a
        v-show="status === '99'"
        @click="doReg"
        href="javascript:;"
        style="margin: 10px 8px"
        class="weui_btn weui_btn_primary"
        >确认补交</a
      >
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_success weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">补交成功</h2>
          <p class="weui_msg_desc">感谢您的支持！</p>
        </div>
        <!-- <div class="weui_opr_are  a">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="goOrderDetail" class="weui_btn weui_btn_primary">查看详情</a>
          </p>
        </div> -->
      </div>
    </div>
    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">补交失败</h2>
          <p class="weui_msg_desc">{{ failedMsg }}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <!-- <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a> -->
          </p>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_msg_desc lab {
  width: 5em;
  display: inline-block;
}

.weui_msg_desc span {
  color: #0ae;
  font-weight: bolder;
}

span.label {
  display: inline-block;
  width: 5em;
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
  border-radius: px;
}
</style>
<script>/*global WeixinJSBridge*/

import {
  setDefaultRegCard,
  setCardRegFee,
  setRegSqNo,
  setRegOrderNum,
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast,
  showAlert
} from '../../vuex/actions'

export default {
  name: 'BjorderDetailView',
  vuex: {
    actions: {
      setDefaultRegCard,
      setCardRegFee,
      setRegOrderNum,
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast,
      setRegSqNo,
      showAlert
    }
  },
  data: function () {
    return {
      displayRegTime: '',
      week: this.$route.query.week,
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      canReg: true,
      canSelectCard: true,
      isFee: true,
      isCity: false,
      guahaoxuzhi: true,
      FeeType: '',
      PubType: '',
      cardNo: '',
      cardName: '',
      orderNo: '',
      orderId: this.$route.query.orderId,
      createDt: '',
      sumFee: '',
      deptName: '',
      doctorName: '',
      regDate: '',
      orderType: '',
      refundTime: '',
      status: ''
    }
  },
  methods: {
    selectCard: function () {
      if (!this.canReg || !this.canSelectCard) {
        return
      }
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    doReg: function () {
      if (!this.canReg) {
        return
      }
      this.canReg = false
      this.showLoadingToast({ msg: '正在补交...' }, false)
      var self = this
      this.$ajax.get('PayBill', 'Makeup', {
        orderId: this.orderId
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
      this.$router.replace({ name: 'departList' })
    },
    goXZDetail: function () {
      var self = this
      self.guahaoxuzhi = false
      self.showDetail = false
    },
    goOrderDetail: function () {
      this.$router.go(0)
    },
    callPay: function (payString) {
      var self = this
      if (payString === '') {
        this.paySucceed()
        return
      }
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
    },
    payFailed: function () {
      this.hideLoadingToast()

      this.showCommonToast({ msg: '您已取消支付' })
      window.history.go(-1)
    },
    paySucceed: function () {
      var self = this
      this.$ajax.get('GetRegStatus', 'Makeup', {
        orderId: this.orderId
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.hideLoadingToast()
          window.history.go(-1)
        } else {
          if (data.RegStatus === '1') {
            self.failedMsg = data.FailedMsg
            self.showDetail = false
            self.showSuccess = false
            self.showFailed = true
            self.hideLoadingToast()
          } else if (data.RegStatus === '0') {
            self.showDetail = false
            self.showSuccess = true
            self.showFailed = false
            self.hideLoadingToast()
          } else {
            window.setTimeout(function () {
              self.paySucceed()
            }, 500)
          }
        }
      })
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetBillOrder', 'Makeup', { orderId: this.orderId }, false
    ).then(function (data) {
      if (data.ResultCode !== '0') {
        self.failedMsg = data.ResultMsg
      } else {
        self.cardNo = data.CardNo
        self.cardName = data.CardName
        self.orderNo = data.NewOrderNo
        self.orderId = data.OrderId
        self.sumFee = data.PrescMoney
        self.deptName = data.OrderDept
        self.regDate = data.OrderDate
        self.orderType = data.OrderType
        self.refundTime = data.RefundTime
        self.status = data.OrderStatus
      }
    })
  }
}
</script>
