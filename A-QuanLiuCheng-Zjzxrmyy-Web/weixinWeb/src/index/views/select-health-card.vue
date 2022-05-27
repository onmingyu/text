<template>
  <div class="container">
    <div class="select card-list">
      <div class="weui_cells_title">请选择健康卡：</div>
      <!-- <div class="weui_cells weui_cells_form">
        <div class="weui_cell weui_cell_switch">
          <div class="weui_cell_hd weui_cell_primary">将选择的卡作为默认卡</div>
          <div class="weui_cell_ft">
            <input class="weui_switch" type="checkbox" checked="checked" v-model="selectAsDefault">
          </div>
        </div>
      </div> -->
      <div
        class="wrap"
        @click="clickCard(cd.id)"
        v-for="cd in cards"
        href="javascript:;"
      >
        <div class="card-face-container">
          <img
            class="card-bg"
            src="../../healthcard/img/cardnewbg.png"
            alt=""
          />
          <div class="card-top-info">
            <div class="card-top-org">广东省卫生健康委员会</div>
            <div class="card-top-title">
              <img src="../../healthcard/img/icon2.png" alt="" />
              <span>电子健康卡</span>
            </div>
          </div>
          <div class="card-detail-info">
            <div class="card-user-info">
              <span class="card-user-name">{{ cd.name }}</span>
              <span class="card-user-id">{{ cd.idNumber }}</span>
            </div>
            <div v-if="cd.qrCodeText" class="card-qrcode">
              <img
                class="card-qrcode-logo"
                src="../../healthcard/img/logo_.png"
                alt=""
              />
              <img :src="'data:image/jpg;base64,' + cd.qrCode" alt="" />
            </div>
            <div v-else class="card-qrcode2">
              <img src="../../healthcard/img/cardtc.png" alt="" />
            </div>
          </div>
          <div class="card-footer">中华人民共和国国家卫生健康委员会监制</div>
        </div>
      </div>
    </div>
    <div class="weui-footer weui-footer_fixed-bottom">
      <a
        @click="getHealthCodeUrl()"
        href="javascript:;"
        style="font-size: 13px; margin: 3px"
        class="weui_btn weui_btn_primary"
        >一键授权,已有健康卡用户直接绑定</a
      >
      <a
        @click="getUserCodeUrl(-1)"
        href="javascript:;"
        style="font-size: 13px; margin: 3px"
        class="weui_btn weui_btn_primary"
        >+ 添加健康卡</a
      >
      <a
        href="https://mp.weixin.qq.com/insurance/card/jump?cityid=440100&from=PY8C6baZPlyibHai25A0qg.%3D#wechat_redirect"
        style="font-size: 13px; margin: 3px"
        class="weui_btn weui_btn_plain_primary"
        >医保卡绑定</a
      >
    </div>
    <!-- <partial name="footer-copyright"></partial> -->
  </div>
</template>
<style scoped>
@import url("../../healthcard/css/card_face_temp.css");
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

.weui-footer_fixed-top {
  position: fixed;
  top: 0;
  /*    top: calc(16px + constant(safe-area-inset-top));
    top: calc(16px + env(safe-area-inset-top));*/
  left: 0;
  left: constant(safe-area-inset-left);
  left: env(safe-area-inset-left);
  right: 0;
  right: constant(safe-area-inset-right);
  right: env(safe-area-inset-right);
}
.card-list {
  margin-top: 0px;
  margin-bottom: 80px;
}
.weui-footer {
  background-color: #f5f5f9;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
}
.weui-footer_fixed-bottom {
  position: fixed;
  bottom: 0;
  /*    bottom: calc(16px + constant(safe-area-inset-bottom));
    bottom: calc(16px + env(safe-area-inset-bottom));*/
  left: 0;
  left: constant(safe-area-inset-left);
  left: env(safe-area-inset-left);
  right: 0;
  right: constant(safe-area-inset-right);
  right: env(safe-area-inset-right);
}
.weui-footer_fixed-bottom a {
  /*line-height: 1.2;*/
}
.weui-footer_fixed-bottom span {
  /*padding: 0.75em;*/
}
.weui_link {
  color: #0ae;
}
</style>
<script>
import { selectCard, showCommonToast, addBindingCard, showAlert } from '../../vuex/actions'

export default {
  name: 'SelectHealthCardView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      selectCard,
      showCommonToast,
      addBindingCard,
      showAlert
    }
  },
  data: function () {
    return {
      selectAsDefault: true,
      type: this.$route.query.type
    }
  },
  methods: {
    getUserCodeUrl: function (cardId) {
      this.$ajax.get('GetHealthUrl', 'Card', {
        urlType: 'USER',
        routeUrl: 'new-health-card',
        cardId: cardId,
        hospitalId: this.hospitalId
      }).then(function (data) {
        // window.location.href = data.NewCardUrl
        window.location.replace(data.NewCardUrl)
      })
    },
    getHealthCodeUrl: function () {
      this.$ajax.get('GetHealthUrl', 'Card', {
        urlType: 'HEALTH',
        routeUrl: 'new-health-card',
        cardId: -1,
        hospitalId: this.hospitalId
      }).then(function (data) {
        // window.location.href = data.NewCardUrl
        window.location.replace(data.NewCardUrl)
      })
    },
    clickCard: function (id) {
      var self = this
      var cardId = id
      this.selectCard(cardId, this.selectAsDefault)
      if (this.type === 'tj') {
        this.$ajax.get('CardUrl', 'Auth', {
          cardId: cardId
        }).then(function (data) {
          if (data.ResultCode !== '0') {
            self.displayLayer(data.ResultMsg)
          } else {
            window.location.replace(data.ResultMsg)
          }
        })
      } else if (this.type === 'bill') {
        this.$ajax.get('OfflinePrescription', 'Bill', {
          cardId: cardId
        }).then(function (data) {
          if (data.ResultCode !== '0') {
            self.displayLayer(data.ResultMsg)
          } else {
            window.location.replace(data.ResultMsg)
          }
        })
      } else {
        if (this.$route.query.nextRoutePath) {
          this.$router.replace({ path: this.$route.query.nextRoutePath })
        } else {
          window.history.go(-1)
        }
      }
    },
    displayLayer: function (msg) {
      this.showAlert({
        title: '跳转失败',
        msg: '<div style="text-align: center;">' + msg + '</div>',
        btnText: '确定'
      }).then(function () {
      })
    },
    goAddBinding: function () {
      this.$router.go({ name: 'addBindingCard' })
    },
    goAddNew: function () {
      this.$router.go({ name: 'addNewCard' })
    }
  }
}
</script>
