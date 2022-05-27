<template>
  <div class="container">
    <div class="weui_search_bar" :class="'weui_search_focusing': searchBarFocused }">
      <form class="weui_search_outer">
        <div class="weui_search_inner">
          <i class="weui_icon_search"></i>
          <input type="search" v-model="searchValue" debounce="600" @focus="goSearch" @blur="leaveSearch" class="weui_search_input" id="depart_list_search_input" placeholder="搜索" />
          <a href="javascript:;" class="weui_icon_clear" @touchend="searchValue = ''"></a>
        </div>
        <label for="depart_list_search_input" class="weui_search_text" v-show="!searchBarFocused && (searchValue === '')">
          <i class="weui_icon_search"></i>
          <span>请输入您的地址</span>
        </label>
      </form>
      <a href="javascript:;" class="weui_search_cancel" @touchend="searchValue = ''">取消</a>
    </div>
    <div id="list-scroll-wrapper" class="list-scroll-wrapper" >
      <div class="scroller">
        <div>
          <div class="weui_cells_title">{{tip}}</div>
          <div class="weui_cells weui_cells_access">
            <a v-for="d in addresses" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-group icon-color" style="width:20px;margin-right:5px;display:block;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{d.AddressId}} {{d.AddressName}}</p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
          </div>
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
  name: 'SelectInpatientAddressView',
  data: function () {
    return {
      searchBarFocused: false,
      searchValue: '',
      addresses: [],
      tip: ''
    }
  },
  methods: {
    goSearch: function () {
      this.searchBarFocused = true
    },
    leaveSearch: function () {
      this.searchBarFocused = false
    }
  },
  ready: function () {
    var self = this
    this.listIScroll = new IScroll('list-scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    this.$watch('searchValue', function (val) {
      if (val === '') {
        this.tip = '请输入地址查询'
        this.$nextTick(function () {
          this.listIScroll.refresh()
          this.listIScroll.scrollTo(0, 0, 0)
        })
      } else {
        this.$ajax.get('GetInpatientAddress', 'Inpatient', { keyword: val }).then(function (data) {
          self.addresses = data.AddressList
          if (data.AddressList.length === 0) {
            self.tip = '没有找到您的地址'
          }
          self.$nextTick(function () {
            self.listIScroll.refresh()
            self.listIScroll.scrollTo(0, 0, 0)
          })
        })
      }
    })
  },
  beforeDestroy: function () {
    this.listIScroll.destroy()
    this.listIScroll = null
  },
  listIScroll: null
}
</script>
