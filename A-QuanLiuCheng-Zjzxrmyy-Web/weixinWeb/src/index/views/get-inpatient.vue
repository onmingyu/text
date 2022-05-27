<template>
  <div class="container">
    <div class="weui_cells_title">就诊卡：</div>
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
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{emptyMsg}}</div>
    <div v-show="showPrepay" class="weui_cells" style="margin-top:10px;">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span class="label">入院日期</span>
            <span class="info">{{inDate}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span class="label">预缴金余额</span>
            <span class="info">{{prepayBalance=='unknown'?'未知':prepayBalance+'元'}} </span>
          </p>
        </div>
      </div>
    </div>
    <a v-show="showPrepay && prepayBalance != 'unknown'" @click="doPrepay" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">缴纳住院预缴金</a>
   <!--  <div v-show="showPrepay" class="weui_cells_title">每日费用列表</div>
    <div v-show="showPrepay" class="weui_cells weui_cells_access" style="margin-top:10px;">
      <a v-for="bill in bills" @click="goBill($index)" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i class="fa fa-hospital-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>日期：<span class="am-ft-blue">{{bill.billDate}}</span></p>
          <p>费用：<span class="am-ft-blue">{{bill.costed}} 元</span></p>
          <p v-show="bill.memo!=''"><span class="orange_tag">{{bill.memo}}</span></p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a> -->
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
</style>
<script>
import _ from 'underscore'

export default {
  name: 'getInpatientView',
  data: function () {
    return {
      showEmpty: false,
      emptyMsg: '',
      showPrepay: false,

      inDate: '',
      prepayBalance: 'unknown',
      patientId: '',
      visitId: '',
      bills: []
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
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
    getInpatient: function () {
      if (!this.card) {
        return
      }
      var self = this

      this.$ajax.get('GetInpatient', 'Inpatient', {
        cardId: this.card.id
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
        } else {
          self.showPrepay = true

          self.inDate = data.InDate
          self.prepayBalance = data.PrepayBalance
          self.patientId = data.PatientId
          self.visitId = data.VisitId
          self.bills = _.map(data.DailyBills, function (val) {
            return {
              billDate: val.BillDate,
              costed: val.Costed,
              memo: val.Memo
            }
          })
        }
      })
    },
    goBill: function (idx) {
      var billDate = this.bills[idx].billDate

      this.$router.go({ name: 'getInpatientBill', query: { patientId: this.patientId, visitId: this.visitId, billDate: billDate } })
    },
    doPrepay: function () {
      this.$router.go({ name: 'doPrepay' })
    }
  },
  ready: function () {
    this.$watch('card', function (val) {
      this.getInpatient()
    })

    this.getInpatient()
  }
}
</script>
