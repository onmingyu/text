<template>
  <div class="weui_dialog_confirm" v-show="isShow">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd">
        <strong class="weui_dialog_title">{{title}}</strong>
      </div>
      <div class="weui_dialog_bd">{{msg}}
      </div>
      <div class="weui_dialog_ft">
        <a @click="closeConfirm('no')" href="javascript:;" class="weui_btn_dialog default">{{btnNoText}}</a>
        <a @click="closeConfirm('yes')" href="javascript:;" class="weui_btn_dialog primary">{{btnYesText}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { closeConfirm } from '../vuex/actions'

export default {
  name: 'ConfirmComponent',
  vuex: {
    getters: {
      isShow: ({ global }) => global.confirmIsShow,
      title: ({ global }) => global.confirmOptions.title,
      msg: ({ global }) => global.confirmOptions.msg,
      btnNoText: ({ global }) => global.confirmOptions.btnNoText,
      btnYesText: ({ global }) => global.confirmOptions.btnYesText
    },
    actions: {
      closeConfirm
    }
  }
}
</script>
