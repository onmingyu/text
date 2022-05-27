<template>
  <div class="contaier">
    <div class="weui_cells_title">绑定您的就诊卡：</div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell weui_cell_switch">
        <div class="weui_cell_hd weui_cell_primary">将绑定的卡作为默认卡</div>
        <div class="weui_cell_ft">
          <input class="weui_switch" type="checkbox" checked="checked" v-model="bindingAsDefault">
        </div>
      </div>
    </div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell weui_cell_select weui_select_after">
        <div class="weui_cell_hd">
          <label class="weui_label">卡类型</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <select class="weui_select" v-model="bindingCardType">
            <option value="0" selected="selected">诊疗卡</option>
            <!--<option value="1">健康卡</option>-->
          </select>
        </div>
      </div>
      <div class="weui_cell" :class="{'weui_cell_warn' : invalidBindingNum}">
        <div class="weui_cell_hd">
          <label class="weui_label">卡号</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" v-model="bindingNum" style="padding-left: 15px;" type="tel" placeholder="请输入卡号">
        </div>
        <div class="weui_cell_ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui_cell" :class="{'weui_cell_warn' : invalidBindingName}">
        <div class="weui_cell_hd">
          <label class="weui_label">姓名</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" v-model="bindingName" style="padding-left: 15px;" type="text" placeholder="请输入姓名">
        </div>
        <div class="weui_cell_ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
    </div>
    <div>
      <p style="padding:10px;" class="am-ft-sm am-ft-gray">
        <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 诊疗卡号长度为8位
      </p>
      <p style="padding:0 10px 10px 10px;" class="am-ft-sm am-ft-gray">
        <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 如果您尚未办理过本院的诊疗卡，请到医院一楼大厅办理，再进行{{platform}}就诊卡绑定。
        <!-- <a @click="$router.replace({name:'addNewCard'})" href="javascript:;">创建就诊卡</a> -->
      </p>
    </div>
    <a @click="doBinding" href="javascript:;" style="margin:5px 8px;" class="weui_btn weui_btn_primary">确认绑定</a>
  </div>
  <partial name="footer-copyright"></partial>
</template>
<script>
import { showCommonToast, showSuccessToast, hideSuccessToast, addBindingCard } from '../../vuex/actions'
export default {
  name: 'AddBindingCardView',
  vuex: {
    actions: {
      showCommonToast,
      addBindingCard,
      showSuccessToast,
      hideSuccessToast
    }
  },
  data: function () {
    return {
      bindingAsDefault: true,
      bindingCardType: '1',
      bindingNum: '',
      bindingName: '',
      invalidBindingNum: false,
      invalidBindingName: false,
      historyStep: -1,
      platform: process.env.PLATFORM
    }
  },
  methods: {
    doBinding: function () {
      if (!this.checkUserInput()) {
        return
      }

      var card = {
        isDefault: this.bindingAsDefault,
        type: this.bindingCardType,
        num: this.bindingNum,
        name: this.bindingName,
        isSelected: false
      }

      var self = this
      this.addBindingCard(card).then(function (result) {
        if (result.isSucceed) {
          self.showSuccessToast({ msg: result.msg }, false)
          window.setTimeout(function () {
            self.hideSuccessToast()
            if (self.$route.query.nextRoutePath) {
              self.$router.replace({ path: self.$route.query.nextRoutePath })
            } else {
              if (self.historyStep === -1) {
                self.$router.replace({ name: 'portal' })
              } else {
                window.history.go(-1)
              }
            }
          }, 1600)
        } else {
          self.showCommonToast({ msg: result.msg })
        }
      })
    },
    checkUserInput: function () {
      if (this.bindingNum === '') {
        this.invalidBindingNum = true
        this.showCommonToast({ msg: '请输入卡号' })
        return false
      }
      if (this.bindingCardType === '0' && this.bindingNum.length !== 8) {
        this.invalidBindingNum = true
        this.showCommonToast({ msg: '卡号长度有误：诊疗卡 卡号长度为10位' })
        return false
      }
      if (this.bindingCardType === '1' && this.bindingNum.length !== 16) {
        this.invalidBindingNum = true
        this.showCommonToast({ msg: '卡号长度有误：健康卡 卡号长度为 16 位' })
        return false
      }
      if (this.bindingName === '') {
        this.invalidBindingName = true
        this.showCommonToast({ msg: '请输入姓名' })
        return false
      }
      return true
    }
  },
  ready: function () {
    this.$watch('bindingNum', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidBindingNum = false
      }
    })
    this.$watch('bindingName', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidBindingName = false
      }
    })
  },
  route: {
    activate: function (transition) {
      // 如果是直接跳到该页面的话则点击确定后要跳到portal页
      if (transition.from.name === undefined) {
        this.historyStep = -1
      } else {
        this.historyStep = 1
      }
      transition.next()
    }
  }
}
</script>
