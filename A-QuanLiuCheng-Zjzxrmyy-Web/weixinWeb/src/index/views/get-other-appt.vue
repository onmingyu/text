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
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
      <a
        v-for="appt in otherAppts"
        @click="goReg($index)"
        class="weui_cell"
        href="javascript:;"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-tags fa-2x icon-color"
            style="width: 35px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            日期：<span class="am-ft-sm am-ft-blue">{{ appt.regDate }}</span>
          </p>
          <p>
            时间：<span class="am-ft-sm am-ft-blue"
              >{{ appt.startTime }}&nbsp; (序号：{{ appt.regNo }})</span
            >
          </p>
          <p>
            科室：<span class="am-ft-sm am-ft-blue">{{ appt.deptName }}</span>
          </p>
          <p>
            医生：<span class="am-ft-sm am-ft-blue">{{ appt.doctorName }}</span>
          </p>
          <p>
            <span class="orange_tag">{{ appt.regType }}</span>
          </p>
        </div>
        <div class="weui_cell_bd">
          <p>
            <span class="blue_tag">{{ appt.sumFee }} 元</span>
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
  setDefaultRegCard,
  clearRegCard,
  setRegSlice,
  setRegOrderType,
  setRegPoint
} from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'GetOtherApptView',
  data: function () {
    return {
      otherAppts: [],
      showEmpty: false,
      emptyMsg: '找不到待取号的预约记录'
    }
  },
  vuex: {
    getters: {
      order: ({ regOrder }) => regOrder
    },
    actions: {
      setDefaultRegCard,
      clearRegCard,
      setRegSlice,
      setRegOrderType,
      setRegPoint
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
    getOtherAppts: function () {
      var self = this
      this.$ajax.get('GetOtherApptOrderList', 'Reg', { cardId: this.order.cardId }).then(function (data) {
        if (data.ResultCode === '0') {
          if (data.OtherApptOrders.length === 0) {
            self.showEmpty = true
            self.emptyMsg = '找不到待取号的预约记录'
            self.otherAppts = []
          } else {
            self.otherAppts = _.map(data.OtherApptOrders, function (val) {
              return {
                deptId: val.DeptId,
                deptName: val.DeptName,
                doctorId: val.DoctorId,
                doctorName: val.DoctorName,
                doctorTitle: val.DoctorTitle,
                regType: val.RegType,
                regDate: val.RegDate,
                timeSlice: val.TimeSlice,
                startTime: val.StartTime,
                endTime: val.EndTime,
                fee: val.Fee,
                treatFee: val.TreatFee,
                otherFee: val.OtherFee,
                sumFee: val.SumFee,
                regNo: val.RegNo
              }
            })
          }
        } else {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.otherAppts = []
        }
      })
    },
    goReg: function (idx) {
      var otherAppt = this.otherAppts[idx]
      this.setRegSlice(otherAppt.deptId, otherAppt.deptName, otherAppt.doctorId, otherAppt.doctorName, otherAppt.doctorTitle,
        otherAppt.regDate, otherAppt.regType, otherAppt.timeSlice, otherAppt.startTime, otherAppt.endTime, otherAppt.fee,
        otherAppt.treatFee, otherAppt.otherFee, otherAppt.sumFee)
      this.setRegPoint(otherAppt.regNo, otherAppt.startTime, otherAppt.endTime)
      this.setRegOrderType('预约取号')
      this.$router.go({ name: 'healthQuestion', query: { departName: otherAppt.deptName, type: 'reg' } })

      // this.$router.go({ name: 'doReg' })
    }
  },
  ready: function () {
    if (this.order.cardId === -1) {
      this.setDefaultRegCard()
    }

    if (this.order.cardId !== -1) {
      this.getOtherAppts()
    }

    this.$watch('order.cardId', function (val) {
      if (val !== -1) {
        this.getOtherAppts()
      }
    })
  },
  route: {
    deactivate: function (transition) {
      if (transition.to.name !== 'selectCard' && transition.to.name !== 'doReg') {
        this.clearRegCard()
      }
      transition.next()
    }
  }
}
</script>
