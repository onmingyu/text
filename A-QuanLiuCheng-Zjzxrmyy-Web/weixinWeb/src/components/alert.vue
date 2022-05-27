<template>
  <div class="weui_dialog_alert" v-show="isShow">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd">
        <strong class="weui_dialog_title">{{title}}</strong>
      </div>
      <div class="weui_dialog_bd" style='text-align:left'>{{{msg}}}</div>
      <div class="weui_dialog_ft">
        <a @click='closeAlert' href="javascript:;" class="weui_btn_dialog primary">{{btnText}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { closeAlert } from '../vuex/actions'

export default {
  name: 'AlertComponent',
  vuex: {
    getters: {
      isShow: ({ global }) => global.alertIsShow,
      title: ({ global }) => global.alertOptions.title,
      msg: ({ global }) => global.alertOptions.msg,
      btnText: ({ global }) => global.alertOptions.btnText
    },
    actions: {
      closeAlert
    }
  }
}
</script>
