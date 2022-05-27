<template>
  <div>
    <div v-if="qrCodeText" class="wrap">
      <div class="qrcode-block">
        <img class="qrcode-logo" src="../../healthcard/img/logo_.png" alt="" />
        <img class="qrcode" :src="'data:image/jpg;base64,' + qrCode" alt=""/>
      </div>
    </div>
    <div v-else class="wrap">
      <div class="card-face-container">
        <img class="card-bg" src="../../healthcard/img/cardnewbg.png" alt="" />
        <div class="card-top-info">
          <div class="card-top-org">广东省卫生健康委员会</div>
          <div class="card-top-title">
            <img src="../../healthcard/img/icon2.png" alt="" />
            <span>电子健康卡</span>
          </div>
        </div>
        <div class="card-detail-info">
          <div class="card-user-info">
            <span class="card-user-name">{{name}}</span>
            <span class="card-user-id">{{idNumber}}</span>
          </div>
          <div class="card-qrcode2">
            <img src="../../healthcard/img/cardtc.png" alt=""/>
          </div>
        </div>
        <div class="card-footer">
          中华人民共和国国家卫生健康委员会监制
        </div>
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">姓名</span>
            <span>{{name}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:80px;">身份证号</span>
            <span>{{idNumber}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">手机号</span>
            <span>{{phone}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell" @click="goHospCardDetail" href="javascript:;">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">患者ID</span>
            <span>{{patientId}}</span>
          </p>
        </div>
      </div>
    </div>
    <a @click="toCardBag" href="javascript:;" style="font-size:18px;margin:5px;" class="weui_btn weui_btn_primary" v-show="qrCodeText">进入卡包</a>
    <a v-show="getDefault()" @click="setDefault" href="javascript:;" style="font-size:18px;margin:5px;" class="weui_btn weui_btn_plain_primary">设为默认</a>
    <a @click="delete" href="javascript:;" style="font-size:18px;margin:5px;" class="weui_btn weui_btn_plain_primary">解绑信息</a>
    <a @click="gotoPortal" href="javascript:;" style="margin:20px 8px;" class="weui_btn weui_btn_plain_primary" v-show="showBtn">返回首页</a>
  </div>
</template>
<script>
import {
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast,
  setDefaultCard,
  deleteCard
} from '../../vuex/actions'

export default {
  name: 'HealthCardDetailView',
  data: function () {
    return {
      showBtn: false,
      cardId: -1,
      qrCode: '',
      qrCodeText: '',
      phone: '',
      idNumber: '',
      name: '',
      num: '',
      patientId: ''
    }
  },
  methods: {
    getDefault: function () {
      for (var i = this.cards.length - 1; i >= 0; i--) {
        if (this.cards[i].id === this.cardId) {
          return !this.cards[i].isDefault
        }
      }
      return true
    },
    setDefault: function () {
      this.setDefaultCard(this.cardId)
    },
    delete: function () {
      var self = this
      this.deleteCard(this.cardId).then(function (data) {
        if (data.isSucceed) {
          self.$router.replace({name: 'manageHealthCard'})
        }
        self.showCommonToast({ msg: data.msg })
      })
    },
    toCardBag: function () {
      this.$ajax.geturl('GoToCardTag', 'Card', { qrCodeText: this.qrCodeText }).then(function (data) {
        window.location.href = data
      })
    },
    goHospCardDetail: function () {
      this.$router.go({ name: 'cardDetail', params: { cardId: this.cardId } })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    }
  },
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast,
      setDefaultCard,
      deleteCard
    }
  },
  ready: function () {
    var cardId = parseInt(this.$route.query.cardId)
    this.cardId = cardId
    var self = this
    this.$ajax.get('GetHealthCardInfo', 'Card', { cardId: cardId }).then(function (data) {
      if (data.ResultCode === '0') {
        var card = data.HealthCardInfo
        self.qrCodeText = card.QrCodeText
        self.qrCode = card.QrCode
        self.phone = card.Phone
        self.name = card.Name
        self.idNumber = card.IdNumber
        self.num = card.Num
        self.patientId = card.PatientId
      } else {
        self.showFailed = true
        self.failedMsg = data.ResultMsg
      }
    })
  },
  route: {
    activate: function (transition) {
      // 阻止页面刷新，刷新时直接跳往首页
      if (transition.from.name === 'newHealthCard') {
        this.showBtn = true
        transition.next()
      } else {
        transition.next()
      }
    },
    deactivate: function (transition) {
      if (transition.to.name === 'newHealthCard') {
        this.$router.replace({ name: 'manageHealthCard' })
      } else {
        transition.next()
      }
    }
  }
}
</script>