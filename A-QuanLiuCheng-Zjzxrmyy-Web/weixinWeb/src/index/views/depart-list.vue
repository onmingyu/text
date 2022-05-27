<template>
  <div class="container">
    <div class="weui_search_bar" :class="{ 'weui_search_focusing': searchBarFocused }">
      <form class="weui_search_outer">
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="search" v-model="searchValue" debounce="600" @focus="goSearch" @blur="leaveSearch" class="weui_search_input" id="depart_list_search_input" placeholder="搜索" />
          <a href="javascript:;" class="weui_icon_clear" @touchend="searchValue = ''"></a>
        </div>
        <label for="depart_list_search_input" class="weui_search_text" v-show="!searchBarFocused && (searchValue === '')">
          <i class="weui_icon_search"></i>
          <span>搜索科室或医生</span>
        </label>
      </form>
      <a href="javascript:;" class="weui_search_cancel" @touchend="searchValue = ''">取消</a>
    </div>
    <div id="menu-scroll-wrapper" class="menu-scroll-wrapper" v-show="!searchBarFocused && (searchValue === '')">
      <div class="scroller">
        <ul>
          <li :class="{ 'menu-item-on': branch === '门诊分区', 'menu-item-off': branch !== '门诊分区' }">
            <a @click="parDepartIdSelected('门诊分区')" href="javascript:;"><span>门诊分区</span></a>
          </li>
          <li :class="{ 'menu-item-on': branch === '就诊科室', 'menu-item-off': branch !== '就诊科室' }">
            <a @click="parDepartIdSelected('就诊科室')" href="javascript:;"><span>就诊科室</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div id="list-scroll-wrapper" class="list-scroll-wrapper" :style="{ 'left': ((searchBarFocused || (searchValue !== ''))? '0': (140 + 'px')) }">
      <div class="scroller">
        <div v-show=" !searchBarFocused && (searchValue === '')" class="weui_cells weui_cells_access" style="margin-top:-1px;">
          <a v-for="d in departs | filterBy branch" @click="goToDepart(d.DepartId,d.DepartName)" class="weui_cell" href="javascript:;">
            <div class="weui_cell_hd">
              <i class="fa fa-group icon-color" style="margin-right:5px;display:block;font-size: 1em;"></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{d.DepartName}} </p>
            </div>
            <div class="weui_cell_ft">
            </div>
          </a>
        </div>
        <div v-show="searchBarFocused || (searchValue !== '')">
          <div class="weui_cells_title">{{drSearchTip}}</div>
          <div class="weui_cells weui_cells_access">
            <a v-for="d in searchedDrs" @click="goToDr(d.DepartId, d.DrId,d.DepartName)" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-user-md fa-2x icon-color" style="margin-right:5px;display:block;font-size: 3em;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{d.DrName}} <span class="blue_tag"> {{d.Title}}</span></p>
                <p><span class="am-ft-13 am-ft-gray">{{d.DepartName}}</span></p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
          </div>
          <div class="weui_cells_title">{{departSearchTip}}</div>
          <div class="weui_cells weui_cells_access">
            <a v-for="d in searchedDeparts" @click="goToDepart(d.DepartId,d.DepartName)" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-group icon-color" style="margin-right:5px;display:block;font-size: 1em;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{d.DepartName}} </p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
          </div>
        </div>
        <!-- <div style="height:8px;"></div>
        <div class="am-ft-center am-ft-13 am-ft-darkgray" style="box-shadow:2px 2px 3px 3px silver">
          <img src="../../assets/img/cmb.png" alt="logo" width="100" height="20"/>；技术支持：<img src="../../assets/img/favicon.png" alt="logo"/>倍康益众
          <img src="../../assets/img/liantong.png" alt="logo" width="15" height="15"/>中国联通
        </div>
        <div style="height:8px;"></div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
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
    width: 140px;
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
    background-color: #135be4;
    top: 0;
    position: fixed;
    z-index: 1;
  }

  .menu-item-on span {
    padding-left: 3px;
    border-left: 2px #0ae solid;
    color: white;
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
  import $ from 'jquery'
  import { showAlert } from '../../vuex/actions'
  export default {
    name: 'DepartListView',
    data: function () {
      return {
        purpose: this.$route.query.purpose,
        day: this.$route.query.day,
        searchBarFocused: false,
        searchValue: '',
        departs: [],
        searchedDeparts: [],
        searchedDrs: [],
        departSearchTip: '',
        drSearchTip: '',
        branch: this.$route.query.branch
      }
    },
    vuex: {
      actions: {
        showAlert
      }
    },
    methods: {
      goSearch: function () {
        this.searchBarFocused = true
      },
      leaveSearch: function () {
        this.searchBarFocused = false
      },
      parDepartIdSelected: function (branch) {
        this.branch = branch
        this.$router.replace({
          name: 'departList',
          query: {
            purpose: this.$route.query.purpose,
            day: this.$route.query.day,
            branch: branch
          }
        })
      },
      goToDepart: function (departId, departName) {
        if (departName === '核酸检测预约门诊' || departName === '核酸检测假期门诊') {
          this.displayLayerOne()
        }
        if (this.purpose === 'detail') {
          this.$router.go({ name: 'departDetail', params: { departId: departId } })
        } else if (this.purpose === 'hosp') {
          this.$router.go({ name: 'hospScheduling', params: { deptName: departName, departId: departId, drId: -1 } })
        } else if (this.day === 'today') {
          this.$router.go({ name: 'selectRegSliceToday', params: { departId: departId, drId: -1 }, query: { deptName: departName, branch: this.branch } })
        } else {
          this.$router.go({ name: 'selectRegSlice', params: { departId: departId, drId: -1 }, query: { deptName: departName, branch: this.branch } })
        }
      },
      goToDr: function (departId, drId, departName) {
        if (this.purpose === 'detail') {
          this.$router.go({ name: 'drDetail', params: { departId: departId, drId: drId } })
        } else if (this.purpose === 'hosp') {
          this.$router.go({ name: 'hospScheduling', params: { deptName: departName, departId: departId, drId: drId } })
        } else if (this.day === 'today') {
          this.$router.go({ name: 'selectRegSliceToday', params: { departId: departId, drId: drId }, query: { deptName: departName } })
        } else {
          this.$router.go({ name: 'selectRegSlice', params: { departId: departId, drId: drId }, query: { deptName: departName } })
        }
      },
      displayLayerOne: function () {
        this.showAlert({
          title: '温馨提示',
          msg: '<div style="text-align: left;"><span  style="color: rgb(190, 18, 18);">请注意</span>：核酸检测门诊，面对人群是“愿检尽检”的自费人群，线上完成核酸检测缴费。如是“愿检尽检”的非自费人群，请到核酸检测点现场开单，缴费后排队取样。<br>',
          btnText: '确定'
        }).then(function () {
        })
      }
    },
    ready: function () {
      $('#footer').hide()
      var self = this
      this.listIScroll = new IScroll('list-scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })

      this.$watch('searchBarFocused', function (val) {
        this.$nextTick(function () {
          this.listIScroll.refresh()
          this.listIScroll.scrollTo(0, 0, 0)
        })
      })
      this.$watch('branch', function (val) {
        this.$nextTick(function () {
          this.listIScroll.refresh()
          this.listIScroll.scrollTo(0, 0, 0)
        // this.menuIScroll.refresh()
        // this.menuIScroll.scrollTo(0, 0, 0)
        })
      })
      this.$watch('searchValue', function (val) {
        if (val === '') {
          this.searchedDeparts = []
          this.searchedDrs = []

          this.$nextTick(function () {
            this.listIScroll.refresh()
            this.listIScroll.scrollTo(0, 0, 0)
          })
        } else {
          this.$ajax.get('SearchDepartOrDr', 'Depart', { keyword: val }).then(function (data) {
            self.searchedDeparts = data.Departs
            self.searchedDrs = data.Drs

            if (data.Departs.length === 0 && data.Drs.length === 0) {
              self.drSearchTip = '没有找到医生或科室'
              self.departSearchTip = ''
            } else if (data.Departs.length === 0) {
              self.drSearchTip = '医生'
              self.departSearchTip = ''
            } else if (data.Drs.length === 0) {
              self.drSearchTip = ''
              self.departSearchTip = '科室'
            } else {
              self.drSearchTip = '医生'
              self.departSearchTip = '科室'
            }

            self.$nextTick(function () {
              self.listIScroll.refresh()
              self.listIScroll.scrollTo(0, 0, 0)
            })
          })
        }
      })

      this.$ajax.get('GetAlltest', 'Depart', { purpose: this.purpose }).then(function (data) {
        self.departs = data.Departs
        self.$nextTick(function () {
          self.listIScroll.refresh()
          self.listIScroll.scrollTo(0, 0, 0)
        })
      })
    },
    beforeDestroy: function () {
      this.listIScroll.destroy()
      this.listIScroll = null
      $('#footer').show()
    },
    listIScroll: null
  }
</script>
