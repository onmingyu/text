<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">满意度调查</h1>
    </div>
    <div class="am-tab">
      <div class="am-tab-item" @click="showDaiPing" :data-tab="yiPingShowed? '': 'selected'">待评价</div>
      <div class="am-tab-item" @click="showYiPing" :data-tab="yiPingShowed? 'selected': ''">已评价</div>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div v-show="!yiPingShowed">
          <div class="weui_cells weui_cells_access" style="margin-top:10px;">
            <a v-for="dp in daiPingPapers" @click="goPaperDetail(dp.paperId)" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-tag icon-color" style="width:20px;margin-right:5px;display:block;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>满意度调查 {{dp.createTime}}</p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
          </div>
          <div v-show="showDaiPingEmpty">
            <div class="weui_msg">
              <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
              <div class="weui_text_area">
                <h2 class="weui_msg_title">无待评价记录</h2>
              </div>
            </div>
          </div>
        </div>
        <div v-show="yiPingShowed">
          <div class="weui_cells" style="margin-top:10px;">
            <div v-for="yp in yiPingPapers" class="weui_cell">
              <div class="weui_cell_hd">
                <i class="fa fa-tag icon-color" style="width:20px;margin-right:5px;display:block;"></i>
              </div>
              <div class="weui_cell_bd">
                <p>满意度调查 {{yp.createTime}}</p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </div>
          </div>
          <div v-show="showYiPingEmpty">
            <div class="weui_msg">
              <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
              <div class="weui_text_area">
                <h2 class="weui_msg_title">无已评价记录</h2>
              </div>
            </div>
          </div>
        </div>
        <partial name="footer-copyright"></partial>
      </div>
    </div>
  </div>

</template>
<style scoped>
.hd {
  padding: 2em 0;
}

.page_title {
  text-align: center;
  font-size: 34px;
  color: #007aff;
  font-weight: 400;
  margin: 0 15%;
}

.weui_panel {
  position: absolute;
  height: 134px;
  width: 100%;
  top: 0;
  left: 0;
}

.weui_icon_warn.weui_icon_msg:before {
  color: #a5a5a5;
}

.scroll-wrapper {
  position: absolute;
  top: 175px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.scroller {
  position: absolute;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
}
</style>
<script>
import { iScroll as IScroll } from '../../assets/lib/iscroll4/iscroll'
import _ from 'underscore'

export default {
  name: 'PaperListView',
  data: function () {
    return {
      yiPingShowed: false,
      showDaiPingEmpty: false,
      showYiPingEmpty: false,
      daiPingPapers: [],
      yiPingPapers: []
    }
  },
  methods: {
    showDaiPing: function () {
      if (!this.yiPingShowed) {
        return
      }
      this.yiPingShowed = false
      this.$nextTick(function () {
        this.iscroll.refresh()
        this.iscroll.scrollTo(0, 0, 0)
      })
    },
    showYiPing: function () {
      if (this.yiPingShowed) {
        return
      }
      this.yiPingShowed = true
      this.$nextTick(function () {
        this.iscroll.refresh()
        this.iscroll.scrollTo(0, 0, 0)
      })
    },
    goPaperDetail: function (paperId) {
      this.$router.go({ name: 'paperDetail', params: { paperId: paperId } })
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetAll', 'Paper').then(function (data) {
      if (data.WaitingPapers.length === 0) {
        self.showDaiPingEmpty = true
        self.daiPingPapers = []
      }
      self.daiPingPapers = _.map(data.WaitingPapers, function (val) {
        return {
          paperId: val.Id,
          createTime: val.CreateTime
        }
      })

      if (data.CompletePapers.length === 0) {
        self.showYiPingEmpty = true
        self.yiPingPapers = []
      }
      self.yiPingPapers = _.map(data.CompletePapers, function (val) {
        return {
          paperId: val.Id,
          createTime: val.CreateTime
        }
      })

      self.$nextTick(function () {
        self.iscroll.refresh()
        self.iscroll.scrollTo(0, 0, 0)
      })
    })

    var myScroll = new IScroll('scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    this.iscroll = myScroll
  },
  beforeDestroy: function () {
    this.iscroll.destroy()
    this.iscroll = null
  },
  iscroll: null
}
</script>
