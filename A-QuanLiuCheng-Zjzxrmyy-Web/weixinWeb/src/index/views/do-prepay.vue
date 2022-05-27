<template>
  <div class="container">
    <div v-show="showDetail">
      <!-- <div class="weui_cells_title">就诊卡：</div>
      <div class="weui_cells weui_cells_access" style="margin-top:10px;">
        <a @click="selectCard" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{card?card.name:''}} <span style="margin-left:15px;" class="blue_tag">{{card?card.type:''}}</span></p>
            <p>{{card?card.num:''}}</p>
          </div>
          <div class="weui_cell_ft">
            选就诊卡
          </div>
        </a>
      </div> -->
      <div class="weui_cells_title">健康卡:</div>
      <div class="weui_cells weui_cells_access" style="margin-top: 10px">
        <a
          @click="selectCard"
          class="weui_cell"
          href="javascript:;"
          v-if="card.id !== -1"
        >
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{ card.name }}</p>
            <p>{{ card.idNumber }}</p>
          </div>
          <div class="weui_cell_ft">另选</div>
        </a>
        <a @click="selectCard" class="weui_cell" href="javascript:;" v-else>
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>暂无健康卡</p>
          </div>
          <div class="weui_cell_ft">新建</div>
        </a>
      </div>
      <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
      <div v-show="!showEmpty">
        <div class="weui_cells" style="margin-top: 10px">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">入院日期</span>
                <span class="info">{{ inDate }}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">住院号</span>
                <span class="info">{{ patientId }}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">预缴金余额</span>
                <span class="info">{{ prepayBalance }} 元</span>
              </p>
            </div>
          </div>
        </div>
        <div class="weui_cells weui_cells_form">
          <div class="weui_cell" :class="{ weui_cell_warn: invalidPrepayFee }">
            <div class="weui_cell_hd">
              <label class="weui_label">充值金额</label>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <a
                @click="updatefee(500)"
                href="javascript:;"
                style="margin: 1px 1px"
                :class="
                  prepayFee == '500'
                    ? 'weui_btn weui_btn_mini weui_btn_primary'
                    : 'weui_btn weui_btn_mini weui_btn_default'
                "
                >500</a
              >
              <a
                @click="updatefee(1000)"
                href="javascript:;"
                style="margin: 1px 1px"
                :class="
                  prepayFee == '1000'
                    ? 'weui_btn weui_btn_mini weui_btn_primary'
                    : 'weui_btn weui_btn_mini weui_btn_default'
                "
                >1000</a
              >
              <a
                @click="updatefee(1500)"
                href="javascript:;"
                style="margin: 1px 1px"
                :class="
                  prepayFee == '1500'
                    ? 'weui_btn weui_btn_mini weui_btn_primary'
                    : 'weui_btn weui_btn_mini weui_btn_default'
                "
                >1500</a
              >
              <input
                class="weui_input"
                v-model="prepayFee"
                style="padding-left: 15px"
                type="number"
                placeholder="其他金额"
              />
            </div>
            <div class="weui_cell_ft">
              <i class="weui_icon_warn"></i>
            </div>
          </div>
        </div>
        <a
          @click="doPrepay"
          href="javascript:;"
          style="margin: 10px 8px"
          class="weui_btn weui_btn_primary"
          >确认缴纳</a
        >
        <div>
          <p
            v-show="sugFee != ''"
            style="padding: 3px"
            class="am-ft-sm am-ft-gray"
          >
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
            建议充值金额为：{{ sugFee }} 元！
          </p>
          <!--  <p style="padding:3px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 充值金额请输入100的倍数！
          </p>
          <p style="padding:3px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 充值后,您的预交金余额不能大于1万元！
          </p>-->
        </div>
      </div>
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_success weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">缴纳成功</h2>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a
              href="javascript:;"
              @click="goOrderDetail"
              class="weui_btn weui_btn_primary"
              >查看详情</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">缴纳失败</h2>
          <p class="weui_msg_desc">{{ failedMsg }}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a
              href="javascript:;"
              @click="gotoPortal"
              class="weui_btn weui_btn_primary"
              >返回首页</a
            >
          </p>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
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

.orange_tag {
  background-color: #ff8208;
  color: #fff;
  font-size: 13px;
  padding: 2px 4px;
  border: none;
  vertical-align: middle;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

span.label {
  display: inline-block;
  width: 100px;
}

span.info {
  color: #0ae;
}

.weui_label {
  display: block;
  width: 80px;
}
</style>
<script>
/*global WeixinJSBridge*/

import $ from 'jquery'
import {
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast
} from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'doPrepayView',
  data: function () {
    return {
      showEmpty: false,
      emptyMsg: '',
      inDate: '',
      prepayBalance: '',
      patientId: '',
      sugFee: '',
      prepayFee: '500',
      invalidPrepayFee: false,
      orderId: -1,
      orderNo: '',
      canPrepay: true,
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      platform: process.env.PLATFORM,
      failedMsg: '',
      lowerLimit: '',
      uppeLimit: '',
      depositMoney: '',
      bedNo: '',
      departmentName: '',
      patientName: '',
      visitId: ''
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast
    }
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    getInpatientPrepayInfo: function () {
      if (!this.card) {
        return
      }
      var self = this

      this.$ajax.get('GetInpatientPrepayInfo', 'Inpatient', {
        cardId: this.card.id
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
        } else {
          self.inDate = data.InDate
          self.prepayBalance = data.PrepayBalance
          self.patientId = data.PatientId
          self.patientName = data.patientName
          self.departmentName = data.departmentName
          self.bedNo = data.bedNo
          self.depositMoney = data.depositMoney
          self.uppeLimit = data.uppeLimit
          self.lowerLimit = data.lowerLimit
          self.visitId = data.VisitId
        }
      })
    },
    updatefee: function (fee) {
      var self = this
      self.prepayFee = fee
      console.log(self.prepayFee)
    },
    doPrepay: function () {
      if (!this.canPrepay) {
        return
      }

      if (!this.card || !this.card.id || this.card.id === -1) {
        this.showCommonToast({ msg: '请选择健康卡' })
        return
      }

      if (this.prepayFee === '') {
        this.invalidPrepayFee = true
        this.showCommonToast({ msg: '请输入充值金额' })
        return false
      }

      // var prepayFee = parseInt(this.prepayFee)
      // if (isNaN(prepayFee) || prepayFee <= 0) {
      //   this.invalidPrepayFee = true
      //   this.showCommonToast({ msg: '充值金额必须为正整数' })
      //   return false
      // }
      // if (prepayFee % 100 !== 0) {
      //   this.invalidPrepayFee = true
      //   this.showCommonToast({ msg: '充值金额必须为100的倍数' })
      //   return false
      // }

      // var prepayBalance = Number(this.prepayBalance)
      // if (prepayBalance + prepayFee > 10000) {
      //   this.invalidPrepayFee = true
      //   this.showCommonToast({ msg: '充值后,您的预交金余额不能大于1万元' })
      //   return false
      // }

      this.canPrepay = false
      this.showLoadingToast({ msg: '正在缴纳...' }, false)
      var self = this
      this.$ajax.get('CreatePrepayOrder', 'Inpatient', {
        cardId: this.card.id,
        patientId: this.patientId,
        visitId: this.visitId,
        money: this.prepayFee
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.failedMsg = data.ResultMsg
          self.showDetail = false
          self.showSuccess = false
          self.showFailed = true
          self.hideLoadingToast()
        } else {
          self.orderId = data.OrderId
          self.orderNo = data.OrderNo
          self.callPay(data.PayString)
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    goOrderDetail: function () {
      this.$router.replace({ name: 'prepayOrderDetail', params: { orderId: this.orderId } })
    },
    callPay: function (payString) {
      var self = this
      if (payString === '') {
        this.paySucceed()
        return
      }
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
      this.$ajax.get('PayFailed', 'Inpatient', {
        orderId: this.orderId
      }, false).then(function (data) {

      })

      this.hideLoadingToast()

      this.showCommonToast({ msg: '您已取消支付' })
      window.history.go(-1)
    },
    paySucceed: function () {
      var self = this
      this.$ajax.get('GetPrepayStatus', 'Inpatient', {
        orderId: this.orderId
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.hideLoadingToast()
          window.history.go(-1)
        } else {
          if (data.PrepayStatus === '1') {
            self.failedMsg = data.FailedMsg
            self.showDetail = false
            self.showSuccess = false
            self.showFailed = true
            self.hideLoadingToast()
          } else if (data.PrepayStatus === '0') {
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
    var sugFee = this.$route.query.sugFee
    if (sugFee) {
      this.sugFee = sugFee
    }

    this.$watch('card', function (val) {
      this.getInpatientPrepayInfo()
    })

    this.getInpatientPrepayInfo()

    this.$watch('prepayFee', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidPrepayFee = false
      }
    })
  }
}
</script>
