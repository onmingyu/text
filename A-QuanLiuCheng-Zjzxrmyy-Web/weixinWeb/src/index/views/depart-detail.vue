<template>
  <div class="container">
    <div class="weui_panel weui_panel_access" style="margin-top:0;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <i class="fa fa-group fa-2x icon-color"></i>
          </div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{name}}</h4>
            <p class="weui_media_desc">{{position}}</p>
          </div>
        </div>
        <div class="am-tab">
          <div class="am-tab-item" @click="showDrList" :data-tab="departDescShowed? '': 'selected'">专家列表</div>
          <div class="am-tab-item" @click="showDesc" :data-tab="departDescShowed? 'selected': ''">科室介绍</div>
        </div>
      </div>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div v-show="!departDescShowed">
          <div class="weui_cells weui_cells_access" style="margin-top:10px;">
            <a v-for="dr in drs" @click="goDrDetail(dr.deptId, dr.id)" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-user-md icon-color" style="width:20px;margin-right:5px;display:block;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{dr.name}} <span style="color:#888;font-size:13px;margin-left:8px;"> {{dr.title}}</span></p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
          </div>
        </div>
        <div v-show="departDescShowed">
          <div class="weui_cells_title" style="margin-top:10px;">详细介绍</div>
          <div class="weui_cells">
            <div class="weui_cell">
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{desc}}</p>
              </div>
            </div>
          </div>
        </div>
        <partial name="footer-copyright"></partial>
      </div>
    </div>
</template>
<style scoped>
.weui_panel {
  position: absolute;
  height: 134px;
  width: 100%;
  top: 0;
  left: 0;
}

.scroll-wrapper {
  position: absolute;
  top: 135px;
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
  name: 'DepartDetailView',
  data: function () {
    var items = []
    for (var i = 0; i < 50; i++) {
      items.push({ t: '标题' + i, d: '副标题' + i })
    }

    return {
      departDescShowed: false,
      id: this.$route.params.departId,
      name: '',
      position: '',
      desc: '',
      drs: []
    }
  },
  methods: {
    showDrList: function () {
      if (!this.departDescShowed) {
        return
      }
      this.departDescShowed = false
      this.$nextTick(function () {
        this.iscroll.refresh()
        this.iscroll.scrollTo(0, 0, 0)
      })
    },
    showDesc: function () {
      if (this.departDescShowed) {
        return
      }
      this.departDescShowed = true
      this.$nextTick(function () {
        this.iscroll.refresh()
        this.iscroll.scrollTo(0, 0, 0)
      })
    },
    goDrDetail: function (departId, drId) {
      this.$router.go({ name: 'drDetail', params: { departId: departId, drId: drId, purpose: 'detail' } })
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetByDeptId', 'Depart', { deptId: this.id }).then(function (data) {
      self.name = data.Name
      self.position = data.Position
      self.desc = data.Desc
      self.drs = _.map(data.Drs, function (val) {
        return {
          id: val.DoctorId,
          deptId: val.DeptId,
          name: val.Name,
          sex: val.Sex,
          title: val.Title
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
