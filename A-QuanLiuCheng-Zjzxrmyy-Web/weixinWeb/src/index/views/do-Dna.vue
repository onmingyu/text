<template>
  <div class="container">
    <div class="reg-detail" v-show="showDetail">
      <div class="weui_cells_title">健康卡:</div>
      <div class="weui_cells weui_cells_access" style="margin-top: 10px">
        <a
          @click="selectCard"
          class="weui_cell"
          href="javascript:;"
          v-if="card.id !== -1"
        >
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{ card.name }}</p>
            <p>{{ card.idNumber }}</p>
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
      <div class="weui_cells_title">登记详情：</div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">登记日期</span>
              <span class="info">{{ startDate }}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">诊&nbsp;&nbsp;查&nbsp;&nbsp;费</span>
              <span class="info">0 元</span>
            </p>
          </div>
        </div>
      </div>
      <a
        @click="getstatus"
        href="javascript:;"
        style="margin: 10px 8px"
        class="weui_btn weui_btn_primary"
        >确认登记</a
      >
    </div>
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_success weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">登记成功</h2>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a
              href="javascript:;"
              @click="goOrderDetail"
              class="weui_btn weui_btn_primary"
              >查看详情</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">登记失败</h2>
          <p class="weui_msg_desc">{{ failedMsg }}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a
              href="javascript:;"
              @click="gotoPortal"
              class="weui_btn weui_btn_primary"
              >返回首页</a
            >
          </p>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_msg_desc label {
  width: 80px;
  display: inline-block;
}

.weui_msg_desc span {
  color: #0ae;
  font-weight: bolder;
}

span.label {
  display: inline-block;
  width: 80px;
}

span.info {
  color: #0ae;
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
</style>
<script>
// import $ from 'jquery'
import {
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast,
  showConfirm
} from '../../vuex/actions'
import _ from 'underscore'
import { commonUtil } from '../../plugins/common'

export default {
  name: 'doDna',
  data: function () {
    return {
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      startDate: '',
      orderId: ''
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
    getstatus: function () {
      if (!this.card) {
        return
      }

      if (this.card.id === -1) {
        this.showCommonToast({ msg: '请选择就诊卡' })
        return
      }
      var self = this

      this.$ajax.get('GetDnaStatus', 'Dna', {
        cardNo: this.card.num
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showConfirm({
            title: '请确认',
            msg: '你已有登记没采集记录（上次登记时间为：' + data.createTime + '），你是否还需继续登记！'
          }).then(function (clickedBtn) {
            if (clickedBtn === 'yes') {
              self.doDna()
            }
          })
        } else {
          self.doDna()
        }
      })
    },
    doDna: function () {
      var self = this
      this.showLoadingToast({ msg: '正在登记...' }, false)
      this.$ajax.get('CreateDnaTest', 'Dna', {
        cardId: this.card.id
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.failedMsg = data.ResultMsg
          self.showDetail = false
          self.showSuccess = false
          self.showFailed = true
          self.hideLoadingToast()
        } else {
          self.orderId = data.orderId
          self.showDetail = false
          self.showSuccess = true
          self.showFailed = false
          self.hideLoadingToast()
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    goOrderDetail: function () {
      this.$router.replace({ name: 'doDnaOrderDetail', query: { orderId: this.orderId } })
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast,
      showConfirm
    }
  },
  ready: function () {
    this.startDate = commonUtil.getDateStr()
  },
  route: {
  }
}
</script>
