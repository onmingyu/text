<template>
  <div>
    <div v-show="showCommon">
      <!-- <div class="weui_mask_transparent"></div> -->
      <div class="weui_toast_common">
        <p class="weui_toast_content_common">{{commonMsg}}</p>
      </div>
    </div>
    <div v-show="showLoading" class="weui_loading_toast">
      <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
        <div class="weui_loading">
          <!-- :) -->
          <div class="weui_loading_leaf weui_loading_leaf_0"></div>
          <div class="weui_loading_leaf weui_loading_leaf_1"></div>
          <div class="weui_loading_leaf weui_loading_leaf_2"></div>
          <div class="weui_loading_leaf weui_loading_leaf_3"></div>
          <div class="weui_loading_leaf weui_loading_leaf_4"></div>
          <div class="weui_loading_leaf weui_loading_leaf_5"></div>
          <div class="weui_loading_leaf weui_loading_leaf_6"></div>
          <div class="weui_loading_leaf weui_loading_leaf_7"></div>
          <div class="weui_loading_leaf weui_loading_leaf_8"></div>
          <div class="weui_loading_leaf weui_loading_leaf_9"></div>
          <div class="weui_loading_leaf weui_loading_leaf_10"></div>
          <div class="weui_loading_leaf weui_loading_leaf_11"></div>
        </div>
        <p class="weui_toast_content">{{loadingMsg}}</p>
      </div>
    </div>
    <div v-show="showSuccess">
      <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
        <i class="weui_icon_toast"></i>
        <p class="weui_toast_content">{{successMsg}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.weui_toast_common {
  position: fixed;
  z-index: 3;
  width: 7.6em;
  min-height: 1em;
  bottom: 50px;
  left: 50%;
  margin-left: -3.8em;
  background: rgba(40, 40, 40, .75);
  text-align: center;
  border-radius: 5px;
  color: #fff;
}

.weui_toast_content_common {
  margin: 8px 0;
}
</style>
<script>
export default {
  name: 'ToastComponent',
  vuex: {
    getters: {
      showCommon: ({ global }) => global.commonToastIsShow,
      commonMsg: ({ global }) => global.commonToastOptions.msg,
      showLoading: ({ global }) => global.loadingToastIsShow,
      loadingMsg: ({ global }) => global.loadingToastOptions.msg,
      showSuccess: ({ global }) => global.successToastIsShow,
      successMsg: ({ global }) => global.successToastOptions.msg
    }
  }
}
</script>
