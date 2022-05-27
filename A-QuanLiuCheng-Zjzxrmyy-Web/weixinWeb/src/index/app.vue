<template>
  <div class="page">
    <router-view></router-view>
    <g-alert></g-alert>
    <g-confirm></g-confirm>
    <g-toast></g-toast>
  </div>
</template>
<style src="../healthcard/css/card_face_temp.css"></style>
<style src="../healthcard/css/personal.css"></style>
<style src="../assets/css/ant-ui.reset.css"></style>
<style src="../assets/css/ant-ui.smooth.css"></style>
<style src="../assets/css/ant-ui.writing.css"></style>
<style src="../assets/css/ant-ui.buttongroup.css"></style>
<style src="../assets/css/ant-ui.tab.css"></style>
<style>
/* page */

.page {
}

.icon-color {
  color: #007aff;
}

/* swiper */

.swiper-slide span {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  filter: progid: DXImageTransform.Microsoft.gradient( GradientType=0, startColorstr='#80000000', endColorstr='#80000000')\9;
  display: block;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  font-family: "Microsoft YaHei";
}
</style>
<style src="../../node_modules/swiper/dist/css/swiper.css"></style>
<script>
import store from '../vuex/store'
import AlertComponent from '../components/alert'
import ConfirmComponent from '../components/confirm'
import ToastComponent from '../components/toast'
import { showLoadingToast, hideLoadingToast, loadCardsFromServer, loadWxJsConfig } from '../vuex/actions'
import $ from 'jquery'

export default {
  name: 'AppView',
  store,
  components: {
    'g-alert': AlertComponent,
    'g-confirm': ConfirmComponent,
    'g-toast': ToastComponent
  },
  data: function () {
    return {
      isAjaxWorking: false
    }
  },
  vuex: {
    actions: {
      showLoadingToast,
      hideLoadingToast,
      loadCardsFromServer,
      loadWxJsConfig
    }
  },
  methods: {
    created: function () {
      var self = this
      $(document).on('ajaxStart', function (e, xhr, options) {
        self.isAjaxWorking = true
        setTimeout(function () {
          if (self.isAjaxWorking) {
            self.showLoadingToast({}, false)
          }
        }, 800)
      })
      $(document).on('ajaxStop', function (e, xhr, options) {
        self.isAjaxWorking = false
        self.hideLoadingToast()
      })
    }
  },
  ready: function () {
    var self = this
    // 加载支付宝js包
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>')
      // 获取登录cookie
      self.$ajax.get('AlipayLogin', 'AlipayAuth', {
        code: self.$route.query.authCode
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showLoadingToast({ msg: '授权登录失败,请重新授权！' }, true)
          setTimeout(() => {
            window.my.postMessage({ msgType: 'reauthorization' })
          }, 3000)
          return
        } else {
          self.global.accessToken = data.AccessToken
          if (document.location.href.indexOf('menu-scan') <= 0) {
            self.loadCardsFromServer()
          }
          self.loadWxJsConfig()
        }
      })
    } else {
      if (document.location.href.indexOf('menu-scan') <= 0) {
        self.loadCardsFromServer()
      }
      self.loadWxJsConfig()
      // self.loadCardsFromServer()
    }
  }
}
</script>
