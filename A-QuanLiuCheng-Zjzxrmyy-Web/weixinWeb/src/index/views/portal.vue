<template>
  <div>
    <div class="container" v-show="showIndex">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a @click="$router.go({ name: 'hospDesc' })" href="javascript:;">
              <img src="../../assets/img/homeimg1.jpg" />
              <span>湛江中心人民医院</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a @click="$router.go({ name: 'hospDesc' })" href="javascript:;">
              <img src="../../assets/img/homeimg2.jpg" />
              <span>湛江中心人民医院</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="bd">
        <div class="weui_grids">
          <a
            @click="$router.go({ name: 'hospDesc' })"
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-reorder fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">医院介绍</p>
          </a>
          <a
            @click="
              $router.go({
                name: 'departList',
                query: { purpose: 'detail', branch: '门诊分区' },
              })
            "
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-sticky-note-o fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">科室介绍</p>
          </a>
          <a
            @click="
              $router.go({
                name: 'departList',
                query: { purpose: 'appt', day: 'today', branch: '门诊分区' },
              })
            "
            href="javascript:;"
            class="weui_grid box"
          >
          <div class="image2"></div>
            <div class="weui_grid_icon">
              <i class="fa fa-stethoscope fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">当日挂号</p>
          </a>
          <a
            v-if="!isAli"
            @click="ExamJump()"
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-stethoscope fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">体检预约</p>
          </a>
          <a
            @click="
              $router.go({
                name: 'departList',
                query: { purpose: 'appt', branch: '门诊分区' },
              })
            "
            href="javascript:;"
            class="weui_grid box"
          >
           <div class="image2"></div>
            <div class="weui_grid_icon">
              <i class="fa fa-stethoscope fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">预约挂号</p>
          </a>
          <a
            @click="
              $router.go({ name: 'departList', query: { purpose: 'hosp' } })
            "
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-stethoscope fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">门诊安排</p>
          </a>
           <a  @click="$router.go({ name: 'hospServiceDesc'})" href="javascript:;" class="weui_grid">
          <div class="weui_grid_icon">
            <i class="fa fa-stethoscope fa-2x icon-color"></i>
          </div>
          <p class="weui_grid_label">
            就医指南
          </p>
        </a>
          <!--<a @click="$router.go({'name': 'getOtherAppt'})" href="javascript:;" class="weui_grid">-->
          <!--<div class="weui_grid_icon">-->
          <!--<i class="fa fa-tags fa-2x icon-color"></i>-->
          <!--</div>-->
          <!--<p class="weui_grid_label">-->
          <!--在线取号-->
          <!--</p>-->
          <!--</a> $router.go({'name': 'getBill'})-->
          <a
            @click="$router.go({ name: 'getBill' })"
            href="javascript:;"
            class="weui_grid box"
          >
          <div class="image2"></div>
            <div class="weui_grid_icon">
              <i class="fa fa-money fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">门诊缴费</p>
          </a>
          <!--  <a @click="$router.go({'name': 'getCheck'})" href="javascript:;" class="weui_grid">
          <div class="weui_grid_icon">
            <i class="fa fa-heartbeat fa-2x icon-color"></i>
          </div>
          <p class="weui_grid_label">
            检查检验
          </p>
        </a> -->
          <a
            @click="$router.go({ name: 'getOrderList' })"
            href="javascript:;"
            class="weui_grid box"
          >
            <div class="image2"></div>
            <div class="weui_grid_icon">
              <i class="fa fa-file-excel-o fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">报告查询</p>
          </a>
          <!--<a @click="$router.go({'name': 'getInspection'})" href="javascript:;" class="weui_grid">-->
          <!--<div class="weui_grid_icon">-->
          <!--<i class="fa fa-file-excel-o fa-2x icon-color"></i>-->
          <!--</div>-->
          <!--<p class="weui_grid_label">-->
          <!--取化验单-->
          <!--</p>-->
          <!--</a>-->
          <a
            v-if="isAli"
            @click="manageCard"
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-credit-card fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">就诊卡</p>
          </a>
          <a
            v-else
            @click="$router.go({ name: 'manageHealthCard' })"
            href="javascript:;"
            class="weui_grid"
          >
            <div class="weui_grid_icon">
              <i class="fa fa-credit-card fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">电子健康码</p>
          </a>
          <!--<a @click="educationType" href="javascript:;" class="weui_grid">-->
          <!--<div class="weui_grid_icon">-->
          <!--<i class="fa fa-heart fa-2x icon-color"></i>-->
          <!--</div>-->
          <!--<p class="weui_grid_label">-->
          <!--健康大讲堂-->
          <!--</p>-->
          <!--</a>-->
          <a @click="goOrderList" href="javascript:;" class="weui_grid">
            <div class="weui_grid_icon">
              <i class="fa fa-medkit fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">挂号/缴费记录查询</p>
          </a>
          <!-- <a @click="menuInpay" href="javascript:;" class="weui_grid">
            <div class="weui_grid_icon">
              <i class="fa fa-hospital-o fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">住院服务</p>
          </a> -->
          <a @click="$router.go({ name: 'paperList' })" class="weui_grid">
            <div class="weui_grid_icon">
              <i class="fa fa-tag fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">满意度调查</p>
          </a>
          <!-- <a @click="$router.go({'name': 'bodyNavigate'})" class="weui_grid">
            <div class="weui_grid_icon">
              <i class="fa fa-tag fa-2x icon-color"></i>
            </div>
            <p class="weui_grid_label">
            智能导诊
            </p>
          </a> -->
        </div>
      </div>
      <partial name="footer-copyright"></partial>
    </div>

    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">失败</h2>
          <p class="weui_msg_desc">{{ failedMsg }}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a
              href="javascript:;"
              @click="gotoPortal"
              class="weui_btn weui_btn_primary"
              >返回首页</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box{

}


.box > .image2{

width: 50px;

font-size: 12px;

height: 20px;

background:url('../../assets/img/角标.png') no-repeat;

background-size: 100% 100%;

background-position: center;

text-align: center;

line-height: 33px;

color: #FFF;

position: absolute;

top:10px;

right:0px;

}
.mapPage {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swiper-container {
  width: 100%;
  height: 196px;
}

.swiper-container img {
  width: 100%;
  height: 100%;
}

/* 仿妇幼原首页风格 */

/*
  图标色彩保留，按顺序左右上下
  style="color:#9366A5;"
  style="color:#2D64CE;"
  style="color:#CC4B48;"
  style="color:#9FB729;"
  style="color:#0BA6E4;"
  style="color:#FF8208;"
  style="color:#756CB7;"
  style="color:#51A79C;"
  style="color:#E46ABD;"
  style="color:#D0960D;"
  style="color:#BDA15E;"
  style="color:#B7645F;"
*/

.icon-color {
  color: #007aff;
}

.weui_grids {
  margin-top: 5px;
  box-shadow: 1px 1px 3px 2px silver;
}

.weui_grids a {
  background-color: #ffffff;
  /*box-shadow: 4px 6px 10px #000;*/
  box-shadow: 3px 3px 5px 4px silver;
}

.weui_grid_label {
  color: #000000;
}

.weui_grid:after {
  height: 1px;
  border-bottom: 1px solid silver;
}

.weui_grid:before {
  width: 1px;
  border-right: 1px solid silver;
  right: -1px;
}

.weui_grid:after,
.weui_grid:before {
  color: #ffffff;
}
</style>
<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.jquery.js'
import { showAlert, showConfirm, showLoadingToast } from '../../vuex/actions'
import _ from 'underscore'
export default {
  name: 'PortalView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards,
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showAlert,
      showConfirm,
      showLoadingToast
    }
  },
  data: function () {
    return {
      showIndex: true,
      showFailed: false,
      failedMsg: '',
      isAli: false
    }
  },
  methods: {
    ExamJump: function () {
      var self = this
      if (self.card.id === '') {
        return
      }
      console.log(self.cards)
      console.log(self.card)
      this.$ajax.get('ExamJump', 'Card', {
        cardId: self.card.id
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showIndex = false
          self.showFailed = true
          self.failedMsg = data.ResultMsg
        } else {
          window.location.href = data.ResultMsg
        }
      })
    },
    gotoPortal: function () {
      this.showIndex = true
      this.showFailed = false
    },
    showToast: function () {
      this.showLoadingToast({ msg: '功能开发中...' })
    },
    alert: function () {
      this.showAlert().then(function () {
        console.log('已关闭')
      })
    },
    confirm: function () {
      this.showConfirm().then(function (clickedBtn) {
        console.log('clickedBtn :: ' + clickedBtn)
      })
    },
    toast: function () {
      this.showLoadingToast()
    },
    getFromAjax: function () {
      this.$ajax.get('a1', 'c1').then(function (data) {
        window.alert(JSON.stringify(data))
      })
    },
    showTxMap: function () {
      window.location.href = 'http://map.qq.com/m/place/info/pointx=113.368440&pointy=23.017180&level=16&word=%E5%B9%BF%E4%B8%9C%E7%9C%81%E5%A6%87%E5%B9%BC%E4%BF%9D%E5%81%A5%E9%99%A2(%E7%95%AA%E7%A6%BA%E9%99%A2%E5%8C%BA)&addr=%E5%B9%BF%E4%B8%9C%E7%9C%81%E5%B9%BF%E5%B7%9E%E5%B8%82%E7%95%AA%E7%A6%BA%E5%8C%BA%E5%85%B4%E5%8D%97%E5%A4%A7%E9%81%93521%E5%8F%B7?referer=tengxun&ch=wap-map1.0'
    },
    goRegPoint: function () {
      this.$route.go({ name: 'selectRegPoint' })
    },
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    manageCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        window.my.postMessage({ msgType: 'patientCard' })
      }
      this.$router.go({ name: 'manageCard' })
    },
    goOrderList: function () {
      this.$router.go({ name: 'orderList' })
    },
    educationType: function () {
      this.$router.go({ name: 'educationType' })
    },
    menuInpay: function () {
      this.$router.go({ name: 'menuInpay' })
    }
  },
  ready: function () {
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      this.isAli = true
    }
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: 3000,
      pagination: '.swiper-pagination'
    })
    this.swiper = mySwiper
  },
  swiper: null
}
</script>
