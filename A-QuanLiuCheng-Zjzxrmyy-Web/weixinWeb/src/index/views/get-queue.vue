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
            {{ card ? card.name : "" }}
            <span style="margin-left: 15px" class="blue_tag">{{
              card ? card.type : ""
            }}</span>
          </p>
          <p>{{ card ? card.num : "" }}</p>
        </div>
        <div class="weui_cell_ft">选就诊卡</div>
      </a>
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
      <div v-for="queue in queues" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i
            class="fa fa-reorder fa-2x icon-color"
            style="width: 35px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            科室：<span class="am-ft-sm am-ft-blue">{{ queue.deptName }}</span>
          </p>
          <p>
            医生：<span class="am-ft-sm am-ft-blue">{{
              queue.doctorName
            }}</span>
          </p>
          <p>
            号别：<span class="am-ft-sm am-ft-blue">{{ queue.regType }}</span>
          </p>
          <p>
            您当前的序号是<span class="am-ft-sm am-ft-blue">{{
              queue.regNo
            }}</span>
          </p>
          <p>
            您前面还有<span class="am-ft-sm am-ft-blue">{{
              queue.foreNum
            }}</span
            >个人在等待，其中<span class="am-ft-sm am-ft-blue">{{
              queue.unPayNum
            }}</span
            >个人尚未取号
          </p>
          <p>请在候诊区耐心等待叫号</p>
        </div>
      </div>
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
import _ from 'underscore'

export default {
  name: 'GetQueueView',
  data: function () {
    return {
      queues: [],
      showEmpty: false,
      emptyMsg: ''
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    }
  },
  ready: function () {
    this.$watch('card', function (val) {
      this.getQueues()
    })

    this.getQueues()
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    getQueues: function () {
      if (!this.card) {
        return
      }
      var self = this

      this.$ajax.get('GetQueues', 'Queue', {
        cardId: this.card.id
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.queues = []
        } else {
          self.queues = _.map(data.Queues, function (val) {
            return {
              deptName: val.DeptName,
              doctorName: val.DoctorName,
              regType: val.RegType,
              regNo: val.RegNo,
              foreNum: val.ForeNum,
              unPayNum: val.UnPayNum
            }
          })
          if (self.queues.length <= 0) {
            self.showEmpty = true
            self.emptyMsg = '找不到排队信息'
            self.queues = []
          }
        }
      })
    }
  }
}
</script>
