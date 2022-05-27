<template>
  <div class="container">
    <div class="weui_panel weui_panel_access">
      <div class="weui_panel_bd">
        <div class="am-tab">
          <div class="am-tab-item" @click="showCategory(2)" :data-tab="tabName==2? 'selected': ''">男性</div>
          <div class="am-tab-item" @click="showCategory(3)" :data-tab="tabName==3? 'selected': ''">女性</div>
          <div class="am-tab-item" @click="showCategory(4)" :data-tab="tabName==4? 'selected': ''">儿童</div>
        </div>
      </div>
    </div>
    <div id="list-scroll-wrapper" class="list-scroll-wrapper" >
      <div class="scroller">
        <div  class="weui_cells weui_cells_access" style="margin-top:-1px;">
        <a v-for="d in bodies | orderBy 'BodyId'" @click="goToSecondBodyList(d.BodyId,d.BodyCode,d.BodyName)" class="weui_cell" href="javascript:;">
            <div class="weui_cell_hd">
              <!--<i class="fa fa-group icon-color" style="width:20px;margin-right:5px;display:block;"></i>-->
              <img :src="'../../assets/img/'+d.BodyCode+'.png'" />
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{d.BodyName}}</p>
            </div>
            <div class="weui_cell_ft">
            </div>
          </a>
        </div>
        </div>
      </div>
  </div>
</template>
<style scoped>
.weui_navbar_item {
  padding: 6px 0;
  color: #000;
}

.weui_bar_item_on {
  color: #FFF;
  background: #0ae;
}

.weui_tab_bd {
  padding-bottom: 34px;
}

.list-scroll-wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
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

export default {
  name: 'BodyListView',
  data: function () {
    return {
      tabName: 2,
      bodies: []
    }
  },
  methods: {
    goToSecondBodyList: function (bodyId, bodyCode, bodyName) {
      this.$router.go({name: 'bodySecondList', params: { groupId: this.tabName, parentId: bodyId, code: bodyCode, bodyName: bodyName }})
    },
    showCategory: function (type) {
      var self = this
      this.tabName = type
      this.$ajax.get('GetAll', 'DaoZhen', { groupId: self.tabName }).then(function (data) {
        self.bodies = data.Bodies
        self.$nextTick(function () {
          self.listIScroll.refresh()
          self.listIScroll.scrollTo(0, 0, 0)
        })
      })
    }
  },
  ready: function () {
    var self = this

    this.listIScroll = new IScroll('list-scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    this.$ajax.get('GetAll', 'DaoZhen', { groupId: self.tabName }).then(function (data) {
      self.bodies = data.Bodies
      self.$nextTick(function () {
        self.listIScroll.refresh()
        self.listIScroll.scrollTo(0, 0, 0)
      })
    })
  },
  beforeDestroy: function () {
    this.listIScroll.destroy()
    this.listIScroll = null
  },
  listIScroll: null
}
</script>
