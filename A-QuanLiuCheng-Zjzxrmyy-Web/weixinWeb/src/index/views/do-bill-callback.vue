<template>
  <div class="container">
    <div class="bill-detail" v-show="showDetail">
      <div class="weui_cells_title"></div>
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
              <span class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
              <span class="info">{{cardNo}}</span>
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
      </div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">流&nbsp;&nbsp;水&nbsp;&nbsp;号</span>
              <span class="info">{{clinicNo}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单科室</span>
              <span class="info">{{orderDept}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单时间</span>
              <span class="info">{{orderDate}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">缴费金额</span>
              <span class="info">{{prescMoney}} 元</span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="hasYiBao">
        <div class="weui_cells_title">医保：</div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">自费金额</span>
                <span class="info">{{cost}} 元</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">医保记账</span>
                <span class="info">{{charges}} 元</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="disWins.length > 0" class="weui_cells_title">收据列表：</div>
      <div class="weui_cells">
        <div v-for="disWin in disWins" class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">收据号：</span>
              <span class="info">{{disWin.rcptNo}}</span>
            </p>
            <p>
              <span class="label">流水号：</span>
              <span class="info">{{disWin.visitNo}}</span>
            </p>
            <p>
              <span class="info">{{disWin.disWinAdd}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="resultMsg.indexOf('佑元庄') > 0" class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p style="color: #0ae;">
              {{resultMsg}}
            </p>
          </div>
        </div>
      </div>
      <div class="weui_cells_title">明细列表：</div>
      <div class="weui_cells">
        <div v-for="item in items" class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span style="display: block;">类型：<span style="color: #0ae;">{{item.type}}</span></span>
              <span style="display: block;">名称：<span style="color: #0ae;">{{item.name}}</span></span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">数量：<span style="color: #0ae;">{{item.account}}</span></span>
              <span style="display: inline-block;width: 50%;float: left;">单位：<span style="color: #0ae;">{{item.unit}}</span></span>
              </span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">单价：<span style="color: #0ae;">{{item.itemPrice}} 元</span></span>
              <span style="display: inline-block;width: 50%;float: left;">小计：<span style="color: #0ae;">{{item.money}} 元</span></span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <p style="padding:10px;" class="am-ft-sm am-ft-gray">
        <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
        <br /> 如需补打发票，请于当天移步人工窗口办理，过期无效。
      </p>
    </div>
    <div v-show="showNoRecord">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">找不到缴费单</h2>
          <p class="weui_msg_desc">
            该缴费单不存在或已退费
          </p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
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
  import _ from 'underscore'
  import {
    showLoadingToast,
    hideLoadingToast
  } from '../../vuex/actions'

  export default {
    name: 'DoBillCallbackView',
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
        clinicNo: '',
        prescMoney: '',
        orderDept: '',
        orderDate: '',
        hasYiBao: false,
        charges: '',
        cost: '',
        items: [],
        disWins: [],
        showSuccess: false,
        showFailed: false,
        showDetail: true,
        showNoRecord: false,
        resultMsg: ''
      }
    },
    methods: {
      getOrderDetail: function () {
        var self = this
        this.$ajax.get('GetOrderDetailByNo', 'BillOrder', { orderNo: self.outTradeNo }).then(function (data) {
          if (data.ResultCode === '0') {
            self.id = data.OrderId
            self.num = data.OrderNo
            self.cardNo = data.CardNo
            self.cardName = data.CardName
            self.clinicNo = data.ClinicNo
            self.prescMoney = data.PrescMoney
            self.orderDept = data.OrderDept
            self.orderDate = data.OrderDate
            self.hasYiBao = data.HasYiBao
            self.charges = data.Charges
            self.cost = data.Cost
            self.resultMsg = data.ResultMsg

            self.items = _.map(data.Items, function (val) {
              return {
                type: val.Type,
                name: val.Name,
                account: val.Account,
                unit: val.Unit,
                itemPrice: val.ItemPrice,
                money: val.Money
              }
            })
            self.disWins = _.map(data.DisWins, function (val) {
              return {
                rcptNo: val.RcptNo,
                visitNo: val.VisitNo,
                disWinAdd: val.DisWinAdd,
                disWin: val.DisWin
              }
            })
            self.showLoadingToast({ msg: '正在缴费...' }, false)
            window.setTimeout(function () {
              self.paySucceed()
            }, 500)
          } else {
            self.showDetail = false
            self.showNoRecord = true
          }
        })
      },
      paySucceed: function () {
        this.isPaySucceed = true

        var self = this
        this.$ajax.get('GetBillStatus', 'Bill', {
          orderId: this.id
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
                // self.citySucceed()
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
      goOrderDetail: function () {
        this.$router.replace({ name: 'billOrderDetail', params: { orderId: this.id } })
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
