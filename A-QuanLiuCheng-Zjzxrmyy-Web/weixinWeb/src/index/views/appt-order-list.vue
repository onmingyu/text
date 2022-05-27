<template>
  <div class="container">
    <!-- <div class="weui_cells_title">就诊卡：</div>
    <div class="weui_cells weui_cells_access" style="margin-top:10px;">
      <a @click="selectCard" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p style="font-size:15px">{{order.cardName}} <span style="margin-left:15px;" class="blue_tag">{{order.cardType}}</span></p>
          <p style="font-size:15px">{{order.cardNum}}</p>
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
        v-if="order.cardId !== -1"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-credit-card fa-2x icon-color"
            style="width: 45px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{ order.cardName }}</p>
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
    <div v-for="order in orders">
      <!--  <div class="weui_cells_title"><span class="am-ft-12 am-ft-gray">下单时间：{{order.createDt}}</span></div> -->
      <div class="weui_cells weui_cells_access">
        <a @click="goOrderDetail($index)" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i
              class="fa fa-file-text-o fa-2x icon-color"
              style="width: 35px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="am-ft-sm am-ft-blue">{{ order.cardName }}</span>
              <span class="am-ft-12 am-ft-gray">{{ order.cardNo }}</span>
            </p>
            <p>
              日期：<span class="am-ft-sm am-ft-blue">{{ order.regDate }}</span>
            </p>
            <p>
              科室：<span class="am-ft-sm am-ft-blue">{{
                order.deptName
              }}</span>
            </p>
            <p>
              医生：<span class="am-ft-sm am-ft-blue">{{
                order.doctorName
              }}</span>
            </p>
            <!--<p><span class="orange_tag">{{order.regType}}</span></p>-->
          </div>
          <div class="weui_cell_bd">
            <p>
              <span class="blue_tag">{{ order.sumFee }} 元</span>
            </p>
          </div>
          <div class="weui_cell_ft"></div>
        </a>
      </div>
    </div>
    <div v-show="showEmpty">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
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
import {
  setDefaultBillCard,
  clearBillCard,
  setBill
} from '../../vuex/actions'
export default {
  name: 'ApptOrderListView',
  data: function () {
    return {
      orders: [],
      tabName: 'current',
      showEmpty: false
    }
  },
  vuex: {
    getters: {
      order: ({ billOrder }) => billOrder
    },
    actions: {
      setDefaultBillCard,
      clearBillCard,
      setBill
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
    getOrders: function () {
      var self = this
      this.showEmpty = false

      this.$ajax.get('GetApptOrderList', 'Appt', { cardId: this.order.cardId }).then(function (data) {
        if (data.Orders.length === 0) {
          self.showEmpty = true
          self.orders = []
        }
        self.orders = _.map(data.Orders, function (val) {
          return {
            id: val.OrderId,
            num: val.OrderNo,
            createDt: val.StartTime,
            regDate: val.RegDate,
            sumFee: val.SumFee,
            cardNo: val.CardNo,
            cardName: val.CardName,
            deptName: val.DeptName,
            deptId: val.DeptId,
            doctorId: val.DoctorId,
            doctorName: val.DoctorName,
            regType: val.RegType
          }
        })
      })
    },
    goOrderDetail: function (orderId) {
      var order = this.orders[orderId]
      this.$router.go({ name: 'apptOrderDetail', query: { cardNo: order.cardNo, cardName: order.cardName, deptId: order.deptId, deptName: order.deptName, doctorId: order.doctorId, doctorName: order.doctorName, sumFee: order.sumFee, createDt: order.createDt, num: order.num, regDate: order.regDate } })
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
