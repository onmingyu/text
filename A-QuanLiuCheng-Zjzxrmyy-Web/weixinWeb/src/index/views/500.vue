<template>
  <div class="container">
    <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div>
      <div class="weui_text_area">
        <h2 class="weui_msg_title">网络不稳</h2>
        <p class="weui_msg_desc">访问服务器失败，可能是网络连接不稳定造成的，请重试</p>
      </div>
      <div class="weui_opr_area">
        <p class="weui_btn_area">
          <a @click="ok" href="javascript:;" class="weui_btn weui_btn_primary">确定</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ajax500View',
  methods: {
    ok: function () {
      window.history.go(-1)
    }
  }
}
</script>
