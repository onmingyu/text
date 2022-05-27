<template>
  <div class="container">
    <div class="title-section">
      <div class="weui_cells_title">
        <h1 style="color:#007aff;text-align:center;font-size: 18px;">{{bodyName}}</h1>
      </div>
    </div>
    <div id="menu-scroll-wrapper" class="menu-scroll-wrapper" v-show="bodies.length>0">
      <div class="scroller">
        <ul>
          <li v-for="d in bodies | orderBy 'BodyId'"  :class="{ 'menu-item-on': code === d.BodyCode, 'menu-item-off': code !== d.BodyCode }">
            <a @click="getSymptons(d.BodyCode)" href="javascript:;"><span>{{d.BodyName}}</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div id="list-scroll-wrapper" class="list-scroll-wrapper" :style="{ 'left': bodies.length>0 ? (90 + 'px') : '0'  }">
      <div class="scroller">
        <div  class="weui_cells weui_cells_access" style="margin-top:-1px;">
          <a v-for="d in symptoms | orderBy 'Id'" @click="goToDetail(d.Id)" class="weui_cell" href="javascript:;">
            <div class="weui_cell_hd">
              <i class="fa fa-group icon-color" style="width:20px;margin-right:5px;display:block;"></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{d.Name}}</p>
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

  .menu-scroll-wrapper {
    position: absolute;
    top: 44px;
    left: 0;
    width: 90px;
    bottom: 0;
    overflow: hidden;
  }

  .menu-scroll-wrapper ul {
    width: 100%;
    position: relative;
  }

  .menu-scroll-wrapper ul:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #c8c8cd;
    color: #c8c8cd;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .menu-scroll-wrapper li {
    position: relative;
  }

  .menu-scroll-wrapper li:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #c8c8cd;
    color: #c8c8cd;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .menu-scroll-wrapper li a {
    display: block;
    margin: 0px 5px;
    padding: 15px 0 15px 3px;
    color: #515151;
  }

  .menu-item-on {
    background-color: white;
  }

  .menu-item-on span {
    padding-left: 3px;
    border-left: 2px #0ae solid;
  }

  .menu-item-off:after {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid #c8c8cd;
    color: #c8c8cd;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
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
    name: 'BodySecondListView',
    data: function () {
      return {
        groupId: this.$route.params.groupId,
        parentId: this.$route.params.parentId,
        bodyName: this.$route.params.bodyName,
        code: this.$route.params.code,
        bodies: [],
        symptoms: []
      }
    },
    methods: {
      goToDetail: function (symptomsId) {
        this.$router.go({name: 'symptomsDetail', params: {symptomsId: symptomsId}})
      },
      getSymptons: function (bodyCode) {
        var self = this
        self.code = bodyCode
        this.$ajax.get('GetSymptomsByBodyCode', 'DaoZhen', {groupId: self.groupId, code: '', bodyCode: bodyCode}).then(function (data) {
          self.symptoms = data.Symptomses
          self.$nextTick(function () {
            self.listIScroll.refresh()
            self.listIScroll.scrollTo(0, 0, 0)
          })
        })
      }
    },
    ready: function () {
      var self = this

      this.listIScroll = new IScroll('list-scroll-wrapper', {
        hScroll: false,
        vScroll: true,
        hScrollbar: false,
        vScrollbar: false
      })
      this.menuIScroll = new IScroll('menu-scroll-wrapper', {
        hScroll: false,
        vScroll: true,
        hScrollbar: false,
        vScrollbar: false
      })

      this.$ajax.get('GetByBodyId', 'DaoZhen', {groupId: self.groupId, bodyId: self.parentId}).then(function (data) {
        self.bodies = data.Bodies

        if (data.Bodies.length > 0) {
          self.code = data.Bodies[0].BodyCode
        }
        self.$ajax.get('GetSymptomsByBodyCode', 'DaoZhen', {groupId: self.groupId, bodyCode: self.code}).then(function (data) {
          self.symptoms = data.Symptomses
          self.$nextTick(function () {
            self.listIScroll.refresh()
            self.listIScroll.scrollTo(0, 0, 0)
          })
        })
        self.$nextTick(function () {
          self.listIScroll.refresh()
          self.listIScroll.scrollTo(0, 0, 0)
        })
      })
    },
    beforeDestroy: function () {
      this.listIScroll.destroy()
      this.listIScroll = null

      this.menuIScroll.destroy()
      this.menuIScroll = null
    },
    listIScroll: null,
    menuIScroll: null
  }
</script>
