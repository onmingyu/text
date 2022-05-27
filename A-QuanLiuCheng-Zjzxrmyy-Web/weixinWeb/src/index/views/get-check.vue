<template>
  <div class="container">
    <!-- <div class="weui_cells_title">就诊卡：</div>
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
    </div> -->
    <div class="weui_cells_title">健康卡:</div>
    <div class="weui_cells weui_cells_access" style="margin-top: 10px">
      <a
        @click="selectCard"
        class="weui_cell"
        href="javascript:;"
        v-if="card.cardId !== -1"
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
    <div v-show="isInp == '0'">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          只支持查询开单日期起15日内检验单
        </p>
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
    </div>
    <div v-show="isInp == '1'">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          住院病人显示当前住院期内所有检验单
        </p>
      </div>
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
      <a
        v-for="check in checks"
        @click="viewCheck($index)"
        class="weui_cell"
        href="javascript:;"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-heartbeat fa-2x icon-color"
            style="width: 35px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            报告类型：<span class="am-ft-sm am-ft-blue">{{
              check.checkType
            }}</span>
          </p>
          <p>
            开单日期：<span class="am-ft-sm am-ft-blue">{{ check.date }}</span>
          </p>
          <p>
            检验编号：<span class="am-ft-sm am-ft-blue">{{ check.id }}</span>
          </p>
          <p>
            检验名称：<span class="am-ft-sm am-ft-blue">{{ check.name }}</span>
          </p>
          <!--<p>检查医生：<span class="am-ft-sm am-ft-blue">{{check.doctorName}}</span></p>-->
          <!--<p>报告医生：<span class="am-ft-sm am-ft-blue">{{check.chekckdoctorName}}</span></p>-->
        </div>
        <div class="weui_cell_bd">
          <p>
            <span v-show="check.status != '1'" class="am-ft-gray am-ft-13"
              >未出报告</span
            >
          </p>
        </div>
        <div v-show="check.status == '1'" class="weui_cell_ft"></div>
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
import { commonUtil } from '../../plugins/common'
import { showCommonToast } from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'GetCheckView',
  data: function () {
    return {
      startDate: '',
      checks: [],
      isInp: '0',
      showEmpty: false,
      emptyMsg: ''
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showCommonToast
    }
  },
  ready: function () {
    this.startDate = commonUtil.getDateStr(-15)

    this.$watch('startDate', function (val) {
      this.getChecks()
    })

    this.$watch('card', function (val) {
      this.getChecks()
    })

    this.getChecks()
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    getChecks: function () {
      if (!this.card || this.startDate === '') {
        return
      }
      this.showEmpty = false

      var self = this

      this.$ajax.get('GetChecks', 'Check', {
        cardId: this.card.id,
        startDate: this.startDate
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.checks = []
        } else {
          self.checks = _.map(data.Checks, function (val) {
            return {
              id: val.Id,
              name: val.Name,
              date: val.Date,
              status: val.Status,
              checkType: val.ReportType,
              doctorName: val.DoctorName,
              chekckdoctorName: val.ChekckdoctorName,
              url: val.url
            }
          })
          self.isInp = data.IsInp
          if (self.checks.length <= 0) {
            self.showEmpty = true
            self.emptyMsg = '找不到检验单'
            self.checks = []
          }
        }
      })
    },
    viewCheck: function (idx) {
      var check = this.checks[idx]
      if (check.status !== '1') {
        return
      }
      if (check.url === undefined) {
        check.url = '-1'
      }
      this.$router.go({ name: 'getCheckDetail', query: { index: idx, appNo: check.id, url: check.url, reporttype: check.checkType } })
    }
  }
}
</script>
