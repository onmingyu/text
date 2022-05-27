<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">欢迎使用微信挂号</h1>
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
  name: 'MenuScanSelectView',
  data: function () {
    return {
      msg: '正在为您打开链接'
    }
  },
  ready: function () {
    var self = this
    self.msg = '正在为您打开链接'
    this.$ajax.get('GetScanSelectUrl', 'Reg', { deptName: this.$route.query.deptName, deptId: this.$route.query.deptId, doctorId: this.$route.query.doctorId }, false).then(function (data) {
      if (data) {
        window.location.href = data
      } else {
        self.msg = '获取链接失败'
      }
    })
  }
}
</script>
