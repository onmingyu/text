<template>
  <div class="container">
    <div class="weui_cells_title">就诊卡：</div>
    <div class="weui_cells weui_cells_access" style="margin-top: 10px">
      <a @click="selectCard" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i
            class="fa fa-credit-card fa-2x icon-color"
            style="width: 45px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            {{ order.cardName }}
            <span style="margin-left: 15px" class="blue_tag">{{
              order.cardType
            }}</span>
          </p>
          <p>{{ order.cardNum }}</p>
        </div>
        <div class="weui_cell_ft">选就诊卡</div>
      </a>
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div
      class="weui_cells weui_cells_access ft-sm"
      style="margin-top: 10px"
      v-for="bill in bills"
    >
      <a
        v-for="item in bill.items"
        @click="
          displayLayer(
            item.Account,
            item.ItemPrice,
            item.Money,
            item.Name,
            item.Type,
            item.Unit
          )
        "
        class="weui_cell"
        href="javascript:;"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-money fa-2x icon-color"
            style="width: 35px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            流&nbsp;&nbsp;水&nbsp;&nbsp;号：<span class="am-ft-sm am-ft-blue">{{
              bill.clinicNo
            }}</span>
          </p>
          <p>
            开单科室：<span class="am-ft-sm am-ft-blue">{{
              bill.orderDept
            }}</span>
          </p>
          <p>
            开单时间：<span class="am-ft-sm am-ft-blue">{{
              bill.orderDate
            }}</span>
          </p>
        </div>
        <div class="weui_cell_bd">
          <p>
            <span class="blue_tag">{{ bill.prescMoney }} 元</span>
          </p>
        </div>
        <div class="weui_cell_ft"></div>
      </a>
    </div>
    <a
      @click="doBill"
      href="javascript:;"
      style="margin: 10px 8px"
      class="weui_btn weui_btn_primary"
      >确认订单</a
    >
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.ft-sm p {
  padding: 3px;
  font-size: 12px;
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
</style>
<script>
import {
  setDefaultBillCard,
  clearBillCard,
  setBill,
  setRegPoint,
  showAlert
} from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'GetBillView',
  data: function () {
    return {
      items: [],
      bills: [],
      showEmpty: false,
      emptyMsg: '找不到待缴费的缴费单'
    }
  },
  vuex: {
    getters: {
      order: ({ billOrder }) => billOrder
    },
    actions: {
      setDefaultBillCard,
      clearBillCard,
      setBill,
      setRegPoint,
      showAlert
    }
  },
  methods: {
    goOrderDetail: function () {
      this.$router.replace({ name: 'billOrderDetail', params: { orderId: this.order.id } })
    },
    displayLayer: function (Account, ItemPrice, Money, Name, Type, Unit) {
      this.showAlert({
        title: '订单详情',
        msg: '<div class="weui_cell_bd weui_cell_primary"><p>类型：<span class="am-ft-sm am-ft-blue">' + Type + '</span></p><p>名称：<span class="am-ft-sm am-ft-blue">' + Name + '</span></p><p>数量：<span class="am-ft-sm am-ft-blue">' + Account + '</span></p><p>单位：<span class="am-ft-sm am-ft-blue">' + Unit + '</span></p><p>单价：<span class="am-ft-sm am-ft-blue">' + ItemPrice + '</span></p><p>小计：<span class="am-ft-sm am-ft-blue">' + Money + '</span></p></div>',
        btnText: '确定'
      }).then(function () {
      })
    },
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    getBills: function () {
      var self = this
      this.$ajax.get('GetBillListNew', 'Bill', { cardId: this.order.cardId }).then(function (data) {
        if (data.ResultCode === '0') {
          if (data.Bills.length === 0) {
            self.showEmpty = true
            self.emptyMsg = '找不到待缴费的缴费单'
            self.bills = []
          } else {
            self.bills = _.map(data.Bills, function (val) {
              // self.items = _.map(val.Items, function (vals) {
              //   return {
              //     Account: vals.Account,
              //     ItemPrice: vals.ItemPrice,
              //     Money: vals.Money,
              //     Name: vals.Name,
              //     type: vals.Type,
              //     Unit: vals.Unit
              //   }
              // })
              return {
                clinicNo: val.ClinicNo,
                prescMoney: val.PrescMoney,
                orderDept: val.OrderDept,
                orderDate: val.OrderDate,
                items: val.Items
              }
            })
          }
        } else {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.bills = []
        }
      })
    },
    goBill: function (idx) {
      var bill = this.bills[idx]
      this.setBill(bill.clinicNo, bill.prescMoney, bill.orderDept, bill.orderDate)

      this.$router.go({ name: 'doBill' })
    }
  },
  ready: function () {
    if (this.order.cardId === -1) {
      this.setDefaultBillCard()
    }

    if (this.order.cardId !== -1) {
      this.getBills()
    }

    this.$watch('order.cardId', function (val) {
      if (val !== -1) {
        this.getBills()
      }
    })
  },
  route: {
    deactivate: function (transition) {
      if (transition.to.name !== 'selectCard' && transition.to.name !== 'doBill') {
        this.clearBillCard()
      }
      transition.next()
    }
  }
}
</script>
