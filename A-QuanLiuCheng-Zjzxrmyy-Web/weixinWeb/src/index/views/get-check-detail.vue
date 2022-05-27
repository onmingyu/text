<template>
  <div class="container">   
    <div class="weui_cells_title" style="display: flex;justify-content: flex-start;">{{msg}}
      <a @click="viewCheck()" v-show="url !== ''" href="javascript:;" class="weui_btn weui_btn_mini weui_btn_primary" style="margin-right: inherit;">下载报告单</a>
    </div>
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top:10px;">
      <div v-for="item in items" class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>检验项目名称：<span class="am-ft-sm am-ft-blue">{{item.ItemName}}</span></p>
          <p>结果：<span class="am-ft-sm am-ft-blue">{{item.ItemResult}}</span></p>
          <p>结果单位：<span class="am-ft-sm am-ft-blue">{{item.ItemUnit}}</span></p>
          <p>高低：<span class="am-ft-sm am-ft-blue">{{item.ItemArraw}}</span></p>
          <p>参考值：<span class="am-ft-sm am-ft-blue">{{item.ItemBase}}</span></p>
          <p v-show="reporttype === '药敏'">抗生素名称：<span class="am-ft-sm am-ft-blue">{{item.MediName}}</span></p>
          <p v-show="reporttype === '药敏'">敏感结果：<span class="am-ft-sm am-ft-blue">{{item.testResult}}</span></p>
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
// import _ from 'underscore'

export default {
  name: 'GetInspectionDetailView',
  data: function () {
    return {
      index: -1,
      appNo: '',
      appName: '',
      reporttype: '',
      items: [],
      msg: '检验单详情'
    }
  },
  ready: function () {
    this.index = this.$route.query.index
    this.appNo = this.$route.query.appNo
    this.url = this.$route.query.url
    this.reporttype = this.$route.query.reporttype
    // this.appName = this.$route.params.appName
    this.getCheckItem()
  },
  methods: {
    getCheckItem: function () {
      if (this.index === -1 || this.appNo === '') {
        return
      }

      var self = this

      this.$ajax.get('GetCheckDetail', 'Check', {
        index: this.index,
        appNo: this.appNo,
        reporttype: this.reporttype
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.msg = data.ResultMsg
          self.items = []
        } else {
          self.items = data.CheckItems
          self.msg = '检验单详情'
          if (self.items.length <= 0) {
            self.msg = '找不到检验单详情'
            self.items = []
          }
        }
      })
    },
    viewCheck: function () {
      window.location.href = this.url
    }
  }
}
</script>
