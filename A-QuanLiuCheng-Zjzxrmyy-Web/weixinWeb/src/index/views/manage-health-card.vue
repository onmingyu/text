<template>
  <div class="container">
    <div class="card-list">
      <div class="weui_cells" v-show="cards.length === 0" style="PADDING:30%">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary" style="text-align:center">
            <img src="../../healthcard/img/nocard.png" style="width:100%;heitght:auto;"/><br/>
            暂无健康卡
          </div>
        </div>
      </div>
      <div class="wrap" v-for="cd in cards" @click.stop="getInfo(cd.id)" href="javascript:;">
        <div class="card-face-container">
          <img class="card-bg" src="../../healthcard/img/cardnewbg.png" alt="" />
          <div class="card-top-info">
            <div class="card-top-org">广东省卫生健康委员会</div>
            <div class="card-top-title">
              <img src="../../healthcard/img/icon2.png" alt=""/>
              <span>电子健康卡</span>
            </div>
          </div>
          <div class="card-detail-info">
            <div class="card-user-info">
              <span class="card-user-name">{{cd.name}}</span>
              <span class="card-user-id">{{cd.idNumber}}</span>
            </div>
            <div v-if="cd.qrCodeText" class="card-qrcode" >
              <img class="card-qrcode-logo" src="../../healthcard/img/logo_.png" alt="" @click.stop="getInfo(cd.id)" href="javascript:;"/>
              <img :src="'data:image/jpg;base64,' + cd.qrCode" alt=""/>
            </div>
            <div v-else class="card-qrcode2" @click.stop="getUserCodeUrl(cd.id)" href="javascript:;" >
              <img src="../../healthcard/img/addcard.png" alt=""/>
            </div>
          </div>
          <div class="card-footer">
            中华人民共和国国家卫生健康委员会监制
          </div>
        </div>
<!--         <div style="text-align:center" v-show="currentCardId === cd.id">
          <a v-show="cd.isDefault" class="weui_btn weui_btn_mini weui_btn_plain_primary">默认信息</a>
          <a v-show="!cd.isDefault" @click="setDefault" href="javascript:;" class="weui_btn weui_btn_mini weui_btn_plain_default">设为默认</a>
          <a @click="goCardDetail" href="javascript:;" class="weui_btn weui_btn_mini weui_btn_plain_default">查看信息</a>
          <a @click="delete" href="javascript:;" class="weui_btn weui_btn_mini weui_btn_plain_default">解绑信息</a>
        </div> -->
      </div>
    </div>
    <div class="weui-footer weui-footer_fixed-bottom">
      <!-- <a @click="getHealthCodeUrl()" href="javascript:;" style="font-size:14px;margin:5px;" class="weui_link">一键授权,已有健康卡用户直接绑定</a> -->
      <a @click="getHealthCodeUrl()" href="javascript:;" style="font-size:14px;margin:5px;" class="weui_btn weui_btn_primary">一键授权,已有健康卡用户直接绑定</a>
      <a @click="getUserCodeUrl(-1)" href="javascript:;" style="font-size:14px;margin:5px;" class="weui_btn weui_btn_primary">+ 添加健康卡</a>
      <a href="https://mp.weixin.qq.com/insurance/card/jump?cityid=440100&from=PY8C6baZPlyibHai25A0qg.%3D#wechat_redirect" style="font-size:14px;margin:5px;"  class="weui_btn weui_btn_plain_primary">医保卡绑定</a>
    </div>
  </div>
</template>
<style scoped>
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
  margin-bottom: 130px; 
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
.weui-footer_fixed-bottom a{
  /*line-height: 1.2;*/
}
.weui-footer_fixed-bottom span{
  /*padding: 0.75em;*/
}
.weui_link {
  color: #0ae;
}
</style>
<script>
import { showCommonToast, setDefaultCard, deleteCard } from '../../vuex/actions'
export default {
  name: 'ManageHealthCardView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      showCommonToast,
      setDefaultCard,
      deleteCard
    }
  },
  data: function () {
    return {
      currentCardId: -1
    }
  },
  methods: {
    setCardId: function (cardId) {
      var self = this
      if (this.currentCardId === cardId) {
        self.currentCardId = -1
      } else {
        self.currentCardId = cardId
      }
    },
    goCardDetail: function () {
      this.$router.go({ name: 'healthCardDetail', query: { cardId: this.currentCardId } })
    },
    setDefault: function () {
      this.setDefaultCard(this.currentCardId)
    },
    delete: function () {
      var self = this
      this.deleteCard(this.currentCardId).then(function (data) {
        self.showCommonToast({ msg: data.msg })
      })
    },
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

    getInfo: function (cardId) {
      this.$router.go({ name: 'healthCardDetail', query: {cardId: cardId} })
    },
    goAddBinding: function () {
      this.$router.go({ name: 'newHealthCard', query: { hospitalId: this.hospitalId, cardId: -1, healthCode: '', wechatCode: '0' } })
    }
  }
}
</script>