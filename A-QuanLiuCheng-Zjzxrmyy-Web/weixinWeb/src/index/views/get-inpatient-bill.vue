<template>
  <div class="container">
    <!-- <div class="weui_cells_title">就诊卡：</div>
    <div class="weui_cells weui_cells_access" style="margin-top:10px;">
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{card?card.name:''}} <span style="margin-left:15px;" class="blue_tag">{{card?card.type:''}}</span></p>
          <p>{{card?card.num:''}}</p>
        </div>
      </div>
    </div> -->
    <div class="weui_cells_title">健康卡:</div>
    <div class="weui_cells weui_cells_access" style="margin-top: 10px">
      <a
        @click="selectCard"
        class="weui_cell"
        href="javascript:;"
        v-if="card.Id !== -1"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-credit-card fa-2x icon-color"
            style="width: 45px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{ card ? card.name : "" }}</p>
          <p>{{ card ? card.idNumber : "" }}</p>
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
    <div class="weui_cells weui_cells_access weui_cells_form">
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label">开单日期</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" type="date" v-model="startDate" />
        </div>
        <div class="weui_cell_ft"></div>
      </div>
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div v-for="ctg in categories">
      <!-- <div class="weui_cells_title" style="font-size:17px;">
        <p> 费用类型：<span style="margin-right:10px;" class="info">{{ctg.categoryName}}</span></p>
        <p> 费用金额：<span class="info">{{ctg.categoryFee}} 元</span></p>
      </div> -->
      <div class="weui_cells weui_cells_access" style="margin-top: 10px">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span style="display: block"
                >日期：<span style="color: #0ae">{{
                  ctg.chargeDate
                }}</span></span
              >
              <span style="display: block"
                >名称：<span style="color: #0ae">{{
                  ctg.projectName
                }}</span></span
              >
              <span style="display: block" v-show="ctg.feeItemStandard"
                >规格：<span style="color: #0ae">{{
                  ctg.feeItemStandard
                }}</span></span
              >
              <span style="display: block; width: 100%">
                <span style="display: inline-block; width: 50%; float: left"
                  >数量：<span style="color: #0ae">{{
                    ctg.feeItemNum
                  }}</span></span
                >
                <span style="display: inline-block; width: 50%; float: left"
                  >单位：<span style="color: #0ae">{{
                    ctg.feeItemUnit
                  }}</span></span
                >
              </span>
              <span style="display: block; width: 100%">
                <span style="display: inline-block; width: 50%; float: left"
                  >单价：<span style="color: #0ae"
                    >{{ ctg.feeItemAmount }} 元</span
                  ></span
                >
                <span style="display: inline-block; width: 50%; float: left"
                  >小计：<span style="color: #0ae"
                    >{{ ctg.feeItemAllAmount }} 元</span
                  ></span
                >
              </span>
              <!-- <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">自付：<span style="color: #0ae;">{{ctg.amountMoney}} 元</span></span>
                <span style="display: inline-block;width: 50%;float: left;">保险支付：<span style="color: #0ae;">{{ctg.MmedicareMoney}} 元</span></span>
              </span> -->
            </p>
          </div>
        </div>
      </div>
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
import { commonUtil } from '../../plugins/common'

export default {
  name: 'getInpatientView',
  data: function () {
    return {
      showEmpty: false,
      emptyMsg: '',
      startDate: '',
      endDate: '',
      categories: [],
      d: []
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
    getInpatientBill: function () {
      var self = this

      this.$ajax.get('GetInHosDetail', 'Inpatient', {
        cardId: this.card.id,
        startDate: this.startDate,
        endDate: this.endDate
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
        } else {
          self.categories = _.map(data.inHosList, function (val) {
            return {
              chargeDate: val.chargeDate,
              drugType: val.drugType,
              projectCode: val.projectCode,
              projectName: val.projectName,
              feeItemAmount: val.feeItemAmount,
              feeItemNum: val.feeItemNum,
              feeItemUnit: val.feeItemUnit,
              feeItemAllAmount: val.feeItemAllAmount,
              feeItemStandard: val.feeItemStandard,
              payDate: val.payDate,
              amountMoney: val.amountMoney,
              MmedicareMoney: val.MmedicareMoney,
              payMoney: val.payMoney
            }
          })
          for (var i = 0; i < self.categories.length; i++) {
            self.d[i] = self.categories[i].payDate
          }
        }
      })
    }
  },
  ready: function () {
    this.startDate = commonUtil.getDateStr(-1)
    this.endDate = commonUtil.getDateStr()

    this.$watch('startDate', function (val) {
      this.getInpatientBill()
    })

    this.$watch('card', function (val) {
      this.getInpatientBill()
    })

    this.getInpatientBill()
  }
}
</script>
