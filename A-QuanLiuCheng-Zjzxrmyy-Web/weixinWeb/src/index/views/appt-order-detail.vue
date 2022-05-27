<template>
  <div class="container">
    <div class="reg-detail" v-show="showDetail">
      <div class="weui_cells_title">挂号详情：</div>
      <div class="weui_cells">
      <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
              <span class="info">{{OrderNo}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</span>
              <span class="info">{{deptName}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生</span>
              <span class="info">{{drName}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">就诊日期</span>
              <span class="info">{{regDt}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">就诊时间</span>
              <span class="info">{{displayRegTime}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">诊&nbsp;&nbsp;查&nbsp;&nbsp;费</span>
              <span class="info">{{cardSumFee}} 元</span>
            </p>
          </div>
        </div>
      </div>
      <a @click="doReg" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">确认挂号</a>
      <div>
        <p style="padding:10px;" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> {{platform}}挂号支付只支持自费及普通医保，暂不支持公费！
        </p>
      </div>
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">挂号成功</h2>
          <p class="weui_msg_desc">
            请牢记您的就诊时间:{{regDt}} {{displayRegTime}}, 就诊医生:{{\deptName}} {{drName}}
          </p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="goOrderDetail" class="weui_btn weui_btn_primary">查看详情</a>
          </p>
        </div>
      </div>
    </div>
    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">挂号失败</h2>
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
<style scoped>
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
import {
  setRegOrderNum,
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast
} from '../../vuex/actions'
import $ from 'jquery'
export default {
  name: 'DoRegPayView',
  data: function () {
    return {
      displayRegTime: this.$route.query.createDt,
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      canReg: true,
      canSelectCard: true,
      isCity: false,
      platform: process.env.PLATFORM,
      deptId: this.$route.query.deptId,
      deptName: this.$route.query.deptName,
      drId: this.$route.query.doctorId,
      drName: this.$route.query.doctorName,
      regDt: this.$route.query.regDate,
      cardName: this.$route.query.cardName,
      cardNum: this.$route.query.cardNo,
      cardSumFee: this.$route.query.sumFee,
      PayString: '',
      OrderId: '',
      OrderNo: this.$route.query.num
    }
  },
  methods: {
    doReg: function () {
      var self = this
      this.showLoadingToast({msg: '正在挂号...'}, false)
      this.$ajax.get('CreateApptOrderPay', 'Appt', {
        cardId: this.cardNum,
        cardName: this.cardName,
        deptId: this.deptId,
        deptName: this.deptName,
        doctorId: this.drId,
        doctorName: this.drName,
        regDate: this.regDt,
        timeSlice: this.displayRegTime,
        regType: this.OrderNo,
        regFee: this.cardSumFee
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.failedMsg = data.ResultMsg
          self.showDetail = false
          self.showSuccess = false
          self.showFailed = true
          self.hideLoadingToast()
        } else {
          self.setRegOrderNum(data.OrderId, data.OrderNo)
          self.callPay(data.PayString)
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    goOrderDetail: function () {
      this.$router.replace({ name: 'regOrderDetail', params: { orderId: this.order.id } })
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
      this.$ajax.get('PayFailed', 'Reg', {
        orderId: this.order.id
      }, false).then(function (data) {

      })

      this.hideLoadingToast()

      this.showCommonToast({ msg: '您已取消支付' })
      window.history.go(-1)
    },
    paySucceed: function () {
      var self = this
      this.$ajax.get('GetRegStatus', 'Reg', {
        orderId: this.order.id
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
            if (self.isCity) {
              self.citySucceed()
            } else {
              self.showDetail = false
              self.showSuccess = true
              self.showFailed = false
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
    citySucceed: function () {
      var self = this

      this.$ajax.get('GetTemplateMsg', 'City', {
        orderId: this.order.id,
        msgtype: 'guahao'
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
      order: ({ regOrder }) => regOrder
    },
    actions: {
      setRegOrderNum,
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast
    }
  }
  // route: {
    // activate: function (transition) {
    //   // 阻止页面刷新，刷新时直接跳往首页
    //   if (transition.from.name === undefined) {
    //     this.$router.go({ name: 'portal' })
    //   } else {
    //     transition.next()
    //   }
    // },
    // deactivate: function (transition) {
    //   this.setRegOrderNum(-1, '')
    //   this.setCardRegFee(this.order.fee, this.order.treatFee, this.order.otherFee)
    //   if (transition.to.name !== 'selectCard' && transition.to.name !== 'getOtherAppt') {
    //     this.clearRegCard()
    //   }
    //   transition.next()
    // }
  // }
}
</script>
