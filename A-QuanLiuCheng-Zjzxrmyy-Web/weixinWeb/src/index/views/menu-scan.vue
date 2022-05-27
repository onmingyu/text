<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">欢迎使用扫码支付</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <article class="weui_article">
      <section>
        <P>
           {{msg}}
        </P>
      </section>
    </article>
  </div>
</template>
<style scoped>
.hd {
  padding: 2em 0;
}

.page_title {
  text-align: center;
  font-size: 30px;
  color: #27A291;
  font-weight: 400;
  margin: 0 15%;
}
</style>
<script>
export default {
  name: 'MenuScanView',
  data: function () {
    return {
      msg: '正在为您查找扫码订单'
    }
  },
  ready: function () {
    var self = this
    self.msg = '正在为您查找扫码订单'
    if (this.$route.query.type === 1) {
      this.$ajax.get('GetScanUrl', 'Bill', { urlId: this.$route.query.urlId }, false).then(function (data) {
        if (data) {
          window.location.href = data
        } else {
          self.msg = '查找门诊缴费单失败'
        }
      })
    } else {
      this.$ajax.get('GetScanUrl', 'Reg', { urlId: this.$route.query.urlId }, false).then(function (data) {
        if (data) {
          window.location.href = data
        } else {
          self.msg = '查找挂号单失败'
        }
      })
    }
  }
}
</script>
