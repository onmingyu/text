<template>
  <div class="container">
    <div class="reg-detail" v-show="showDetail">
      <!-- <div class="weui_cells_title">就诊卡：</div>
      <div class="weui_cells weui_cells_access" style="margin-top:10px;">
        <a @click="selectCard" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{order.cardName}} <span style="margin-left:15px;" class="blue_tag">{{order.cardType}}</span></p>
            <p>{{order.cardNum}}</p>
          </div>
          <div v-show="canSelectCard" class="weui_cell_ft">
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
          v-if="order.cardId !== -1"
        >
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{ order.cardName | hideMiddle }}</p>
            <p>{{ order.idNumber }}</p>
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
      <div class="weui_cells_title">挂号详情：</div>
      <div class="weui_cells">
        <!-- <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
              <span class="info">{{order.num}}</span>
            </p>
          </div>
        </div> -->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label"
                >科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</span
              >
              <span class="info">{{ order.departName }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label"
                >医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生</span
              >
              <span class="info">{{ order.drName }}</span>
            </p>
          </div>
        </div>
        <!--<div class="weui_cell">-->
        <!--<div class="weui_cell_bd weui_cell_primary">-->
        <!--<p>-->
        <!--<span class="label">号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</span>-->
        <!--<span class="info">{{order.regType}}</span>-->
        <!--</p>-->
        <!--</div>-->
        <!--</div>-->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">就诊日期</span>
              <span class="info">{{ order.regDt }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">就诊时间</span>
              <span class="info">{{ displayRegTime }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">诊&nbsp;&nbsp;查&nbsp;&nbsp;费</span>
              <span class="info">{{ order.cardSumFee }} 元</span>
            </p>
          </div>
        </div>
      </div>
      <a
        @click="doRegShow"
        href="javascript:;"
        style="margin: 10px 8px"
        class="weui_btn weui_btn_primary"
        >确认挂号</a
      >
      <div>
        <p style="padding: 10px;text-align: center;" class="am-ft-sm am-ft-gray">
          <img src="../../assets/img/能量球.png" style="width: 20px;"/>
          预约挂号预计得蚂蚁森林能量 <span style="color: #32a305;font-weight:bold;" >277g</span>
        </p>
      </div>
      <div>
        <p style="padding: 10px" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          {{ platform }}挂号支付只支持自费及普通医保，暂不支持公费！
        </p>
      </div>
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_success weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">挂号成功</h2>
          <p class="weui_msg_desc">
            1.请牢记您的候诊时间:{{ order.regDt }} {{ displayRegTime }},
            就诊医生:{{ order.departName }} {{ order.drName }} ;<br />
            2.挂当天号的不是预约号，缴费成功后，请尽快到分诊台取号排队候诊。
          </p>
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
          <h2 class="weui_msg_title">挂号失败</h2>
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
  setDefaultRegCard,
  setCardRegFee,
  setRegOrderNum,
  clearRegCard,
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  showAlert,
  hideLoadingToast
} from '../../vuex/actions'

export default {
  name: 'DoRegView',
  data: function () {
    return {
      displayRegTime: '',
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      canReg: true,
      canSelectCard: true,
      isCity: false,
      platform: process.env.PLATFORM
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
    doRegShow: function () {
      var self = this
      this.showAlert({
        title: '',
        msg: '<img style="width: 100%;" src="https://zjzx.wedoublecare.com/zjzxrmAliApp/AliApp/h5/static/弹窗.png"/>' +
        '<p style="text-align: center;font-weight:bold;">预约挂号、缴费得绿色能量</p>' +
        '<p style="text-align: left;">·完成预约挂号，得绿色能量277g/笔，每月上限5笔（取消挂号失效）</p>' +
        '<p style="text-align: left;">·完成报告查询，得绿色能量2g/笔，每月上限10次</p>' +
        '<p style="text-align: left;">·得到的绿色能量可以前往【蚂蚁森林】用来种树，改善我们的环境</p>',
        btnText: '知道了'
      }).then(function () {
        self.doReg()
      })
    },
    doReg: function () {
      if (!this.canReg) {
        return
      }

      if (this.order.cardId === -1) {
        this.showCommonToast({ msg: '请选择就诊卡' })
        return
      }

      this.canReg = false
      var self = this
      this.showLoadingToast({ msg: '正在挂号...' }, false)
      this.$ajax.get('CreateApptOrder', 'Reg', {
        cardId: this.order.cardId,
        deptId: this.order.departId,
        deptName: this.order.departName,
        drDepartName: this.order.drDepartName,
        doctorId: this.order.drId,
        doctorName: this.order.drName,
        regDate: this.order.regDt,
        timeSlice: this.order.timeSlice,
        startTime: this.order.seqStartTime,
        endTime: this.order.seqEndTime,
        regType: this.order.regType,
        sqno: this.order.seqNo,
        regFee: this.order.sumFee
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
        // 支付宝调起支付
        if (navigator.userAgent.indexOf('AlipayClient') > -1) {
          window.my.postMessage({ msgType: 'doreg', tradeNO: payString })
        } else {
          // 支付操作
          var form = $(payString)
          form.submit()
        }
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
      setDefaultRegCard,
      setCardRegFee,
      setRegOrderNum,
      clearRegCard,
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      showAlert,
      hideLoadingToast
    }
  },
  ready: function () {
    var self = this
    // 支付宝 接收支付后返回成功或失败
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      window.my.onMessage = function (e) {
        // {'msgType': 'doreg','code': '0'}  // {'msgType': 'doreg','code': '0'}
        if (e.msgType.toLocaleLowerCase() === 'doreg') {
          if (e.code === '0') {
            self.paySucceed()
          } else {
            self.payFailed()
          }
        }
      }
    }
    this.isCity = this.$cookie.get('IsCity') && this.$cookie.get('IsCity') === '1'

    if (this.order.type.indexOf('预约取号') >= 0) {
      this.canSelectCard = false
    }
    // if (this.order.seqNo) {
    //   this.displayRegTime = this.order.seqStartTime + ' (序号:' + this.order.seqNo + ')'
    // } else {
    //   this.displayRegTime = this.order.startTime + ' - ' + this.order.endTime
    // }
    this.displayRegTime = this.order.startTime + ' - ' + this.order.endTime

    if (this.order.cardId === -1) {
      this.setDefaultRegCard()
    }
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
      this.setRegOrderNum(-1, '')
      this.setCardRegFee(this.order.fee, this.order.treatFee, this.order.otherFee)
      if (transition.to.name !== 'selectCard' && transition.to.name !== 'getOtherAppt') {
        this.clearRegCard()
      }
      transition.next()
    }
  }
}
</script>
