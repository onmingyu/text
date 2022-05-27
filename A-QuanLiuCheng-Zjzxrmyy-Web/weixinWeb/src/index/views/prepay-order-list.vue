<template>
  <div class="container">
    <div class="am-tab">
      <div class="am-tab-item" @click="tabName='current'" :data-tab="tabName === 'current'? 'selected': ''">15日内订单</div>
      <div class="am-tab-item" @click="tabName='history'" :data-tab="tabName === 'history'? 'selected': ''">历史订单</div>
    </div>
    <div v-for="order in orders">
      <div class="weui_cells_title"><span class="am-ft-12 am-ft-gray">下单时间：{{order.createDt}}</span></div>
      <div class="weui_cells weui_cells_access">
        <a @click="goOrderDetail(order.id)" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-file-text-o fa-2x icon-color" style="width:35px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p><span class="am-ft-sm am-ft-blue">{{order.cardName}}</span> <span class="am-ft-12 am-ft-gray">{{order.cardNo}}</span></p>
            <p>金额：<span class="am-ft-sm am-ft-blue">{{order.prepayMoney}}</span></p>
          </div>
          <div class="weui_cell_ft">
          </div>
        </a>
      </div>
    </div>
    <div v-show="showEmpty">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">无订单记录</h2>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_cell_primary p {
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

.weui_icon_warn.weui_icon_msg:before {
  color: #a5a5a5;
}
</style>
<script>
import _ from 'underscore'

export default {
  name: 'PrepayOrderListView',
  data: function () {
    return {
      orders: [],
      tabName: 'current',
      showEmpty: false
    }
  },
  methods: {
    getOrders: function () {
      var self = this
      this.showEmpty = false

      this.$ajax.get('GetOrderList', 'PrepayOrder', { type: this.tabName }).then(function (data) {
        if (data.Orders.length === 0) {
          self.showEmpty = true
          self.orders = []
        }
        self.orders = _.map(data.Orders, function (val) {
          return {
            id: val.OrderId,
            num: val.OrderNo,
            createDt: val.CreateDt,
            cardNo: val.CardNo,
            cardName: val.CardName,
            prepayMoney: val.PrepayMoney
          }
        })
      })
    },
    goOrderDetail: function (orderId) {
      this.$router.go({ name: 'prepayOrderDetail', params: { orderId: orderId } })
    }
  },
  ready: function () {
    this.getOrders()

    this.$watch('tabName', function (val) {
      this.getOrders()
    })
  }
}
</script>
