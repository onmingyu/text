<template>
  <div class="container">
    <div v-show="!showNoRecord">
      <div v-show="showDetail">
        <!-- <div class="am-ft-center am-ft-xl">
            <p>广东省妇幼保健院</p>
            <p>广东省儿童医院</p>
            <p>广东省妇产医院</p>
          </div> -->
        <div class="weui_cells_title">下单时间：{{createDt}}</div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
                <span class="info">{{num}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                <span class="info">{{cardName}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
                <span class="info">{{cardNo}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额</span>
                <span class="info">{{prepayMoney}} 元</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showNoRecord">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">找不到住院预缴单</h2>
          <p class="weui_msg_desc">
            该住院预缴单不存在
          </p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
        </div>
      </div>
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">缴纳成功</h2>
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
          <h2 class="weui_msg_title">缴纳失败</h2>
          <p class="weui_msg_desc">{{failedMsg}}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  span.label {
    display: inline-block;
    width: 80px;
  }

  span.info {
    color: #0ae;
  }

  .weui_icon_warn.weui_icon_msg:before {
    color: #a5a5a5;
  }
</style>
<script>
  import {
    showLoadingToast,
    hideLoadingToast
  } from '../../vuex/actions'

  export default {
    name: 'DoPrepayCallbackView',
    vuex: {
      actions: {
        showLoadingToast,
        hideLoadingToast
      }
    },
    data: function () {
      return {
        id: '',
        outTradeNo: '',
        num: '',
        cardNo: '',
        cardName: '',
        createDt: '',
        prepayMoney: '',
        failedMsg: '',
        showSuccess: false,
        showFailed: false,
        showNoRecord: false
      }
    },
    methods: {
      getOrderDetail: function () {
        var self = this
        this.$ajax.get('GetOrderDetailByNo', 'PrepayOrder', { orderNo: self.outTradeNo }).then(function (data) {
          if (data.ResultCode === '0') {
            self.id = data.OrderId
            self.num = data.OrderNo
            self.cardNo = data.CardNo
            self.cardName = data.CardName
            self.createDt = data.CreateDt
            self.prepayMoney = data.PrepayMoney
            self.showLoadingToast({ msg: '正在缴纳...' }, false)
            window.setTimeout(function () {
              self.paySucceed()
            }, 500)
          } else {
            self.showNoRecord = true
          }
        })
      },
      goOrderDetail: function () {
        this.$router.replace({ name: 'prepayOrderDetail', params: { orderId: this.id } })
      },
      paySucceed: function () {
        var self = this
        this.$ajax.get('GetPrepayStatus', 'Inpatient', {
          orderId: this.id
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
      },
      gotoPortal: function () {
        this.$router.replace({ name: 'portal' })
      }
    },
    ready: function () {
      this.outTradeNo = this.$route.query.out_trade_no
      this.getOrderDetail()
    }
  }
</script>
