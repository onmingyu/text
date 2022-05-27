<template>
  <div class="container">
    <div class="select">
      <div class="weui_cells_title">管理就诊卡：</div>
      <div class="weui_cells weui_cells_access">
        <a @click="clickCard($index)" v-for="cd in cards" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:35px;margin-right:15px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{cd.name | hideMiddle}} <span style="margin-left:15px;" class="blue_tag">{{cd.type}}</span></p>
            <p>{{cd.num}}</p>
          </div>
          <div class="weui_cell_ft">
            <span v-show="cd.isDefault" class="orange_tag">默认</span>
          </div>
        </a>
      </div>
      <div class="button_sp_area" style="text-align:center">
        <a @click="goAddBinding" href="javascript:;" style="font-size:18px;margin-right:16px;" class="weui_btn weui_btn_mini weui_btn_primary">绑就诊卡</a>
        <a @click="goAddNew" href="javascript:;" style="font-size:18px;margin-left:16px;" class="weui_btn weui_btn_mini weui_btn_primary">初诊建卡</a>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
    <div>
      <div v-el:mask class="weui_mask_transition"></div>
      <div v-el:actionsheet class="weui_actionsheet">
        <div class="weui_actionsheet_menu">
          <div @click="goCardDetail" class="weui_actionsheet_cell">查看电子就诊卡</div>
          <div @click="setDefault" class="weui_actionsheet_cell">设为默认就诊卡</div>
          <div @click="delete" class="weui_actionsheet_cell">删除就诊卡</div>
        </div>
        <div class="weui_actionsheet_action">
          <div v-el:actionsheetcancel class="weui_actionsheet_cell">取消</div>
        </div>
      </div>
    </div>
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
</style>
<script>
import { showCommonToast, setDefaultCard, deleteCard } from '../../vuex/actions'
import $ from 'jquery'
export default {
  name: 'ManageCardView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      showCommonToast,
      setDefaultCard,
      deleteCard
    }
  },
  data: function () {
    return {
      currentCardId: 0
    }
  },
  methods: {
    clickCard: function (idx) {
      this.currentCardId = this.cards[idx].id
      this.showActionSheet()
    },
    goAddBinding: function () {
      this.$router.go({ name: 'addBindingCard' })
    },
    goAddNew: function () {
      this.$router.go({ name: 'addNewCard' })
    },
    showActionSheet: function () {
      var self = this
      var mask = $(this.$els.mask)
      var weuiActionsheet = $(this.$els.actionsheet)
      weuiActionsheet.addClass('weui_actionsheet_toggle')
      mask.show().addClass('weui_fade_toggle').one('click', function () {
        self.hideActionSheet(weuiActionsheet, mask)
      })
      $(this.$els.actionsheetcancel).one('click', function () {
        self.hideActionSheet(weuiActionsheet, mask)
      })
      weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd')
    },
    hideActionSheet: function (weuiActionsheet, mask) {
      weuiActionsheet.removeClass('weui_actionsheet_toggle')
      mask.removeClass('weui_fade_toggle')
      weuiActionsheet.on('transitionend', function () {
        mask.hide()
      }).on('webkitTransitionEnd', function () {
        mask.hide()
      })
    },
    goCardDetail: function () {
      this.$router.go({ name: 'cardDetail', params: { cardId: this.currentCardId } })
    },
    setDefault: function () {
      this.setDefaultCard(this.currentCardId)
      var mask = $(this.$els.mask)
      var weuiActionsheet = $(this.$els.actionsheet)
      this.hideActionSheet(weuiActionsheet, mask)
    },
    delete: function () {
      var self = this
      this.deleteCard(this.currentCardId).then(function (data) {
        var mask = $(self.$els.mask)
        var weuiActionsheet = $(self.$els.actionsheet)
        self.hideActionSheet(weuiActionsheet, mask)
        self.showCommonToast({ msg: data.msg })
      })
    }
  },
  // 过滤姓名
  // filters: {
  //   hideMiddle (value) {
  //     if (value) {
  //       let len = ''
  //       for (let i = 0; i < value.length - 1; i++) {
  //         len = len + '*'
  //       }
  //       return value.substring(0, 1) + len
  //     }
  //     return value
  //   }
  // },
  ready: function () {
    var self = this
    // 加载支付宝js包
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      window.my.onMessage = function (e) {
        if (e.msgType === 'patientCard') {
          var json = JSON.parse(e.msg)
          self.$ajax.get('AlipayLogin', 'AlipayAuth', {
            code: json.authCode
          }).then(function (data) {
            if (data.ResultCode !== '0') {
              self.showLoadingToast({ msg: '授权登录失败,请重新授权！' }, true)
              setTimeout(() => {
                window.my.postMessage({ msgType: 'reauthorization' })
              }, 3000)
              return
            } else {
              self.global.accessToken = data.AccessToken
            }
          })
        }
      }
    }
  }
}

</script>