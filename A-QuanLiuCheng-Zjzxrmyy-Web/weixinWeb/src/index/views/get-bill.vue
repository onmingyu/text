<template>
  <div class="container">
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
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
      <a
        v-for="bill in bills"
        @click="goBill($index)"
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
            开单科室：<span class="am-ft-sm am-ft-blue">{{
              bill.orderDept
            }}</span>
          </p>
          <p>
            开单医生：<span class="am-ft-sm am-ft-blue">{{
              bill.doctorName
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
  setBill
} from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'GetBillView',
  data: function () {
    return {
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
              return {
                doctorName: val.DoctorName,
                prescMoney: val.PrescMoney,
                orderDept: val.OrderDept,
                orderDate: val.OrderDate
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
      this.setBill(bill.doctorName, bill.orderDept)

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
