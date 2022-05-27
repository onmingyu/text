<template>
  <div>
    <div class="bill-failed" v-show="cardStatus === -1">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">添加健康卡失败</h2>
          <p class="weui_msg_desc">{{failedMsg}}</p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
        </div>
      </div>
    </div>
    <div class="contaier" v-show="cardStatus === 1 || cardStatus === 2">
      <div class="wrap">
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
              <span class="card-user-name">{{cardInfo.name}}</span>
              <span class="card-user-id">{{cardInfo.idNumber}}</span>
            </div>
            <div v-if="cardInfo.qrCodeText" class="card-qrcode">
              <img class="card-qrcode-logo" src="../../healthcard/img/logo_.png" alt="" />
              <img :src="'data:image/jpg;base64,' + cardInfo.qrCode" alt=""/>
            </div>
            <div v-else class="card-qrcode2">
              <img src="../../healthcard/img/cardtc.png" alt=""/>
            </div>
          </div>
          <div class="card-footer">
            中华人民共和国国家卫生健康委员会监制
          </div>
        </div>
      </div>
      <div class="weui_cells weui_cells_form" v-show="!cardInfo.qrCodeText">
        <div class="weui_cell weui_cell_select weui_select_after" v-show="bindingCardType === '-1' || bindingCardType === '3' || bindingCardType === '4' || bindingCardType === '5' || bindingCardType === '6' || bindingCardType === '7'">
          <div class="weui_cell_hd">
            <label class="weui_label">证号类型</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="certType">
              <option value="1">身份证</option>
              <option value="8">港澳来往内地通行证（回乡证）</option>
              <option value="9">台湾来往大陆通行证（台胞证）</option>
              <option value="2">护照</option>
              <option value="14">出生证</option>
            </select>
          </div>
        </div>
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidCertNo}" v-show="bindingCardType === '-1' || bindingCardType === '3' || bindingCardType === '4' || bindingCardType === '5' || bindingCardType === '6' || bindingCardType === '7'">
          <div class="weui_cell_hd" v-show="certType === '1'">
            <label class="weui_label">身份证号</label>
          </div>
          <div class="weui_cell_hd" v-show="certType !== '1'">
            <label class="weui_label">证件号码</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="certNo" style="padding-left: 15px;" type="text" :placeholder="certType === '1' ? '请输入身份证号' : '请输入证件号码'" >
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after" v-show="certType !== '1'">
          <div class="weui_cell_hd">
            <label class="weui_label">性别</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="sex">
              <option value="男" selected="selected">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>
        <div class="weui_cell" v-show="certType !== '1'">
          <div class="weui_cell_hd">
            <label class="weui_label">出生日期</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary" style="padding-left: 15px;">
            <input class="weui_input" type="date" v-model="birthday">
          </div>
          <div class="weui_cell_ft">
          </div>
        </div>
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidCellphone}">
          <div class="weui_cell_hd">
            <label class="weui_label">联系电话</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="cellphone" style="padding-left: 15px;" type="tel" placeholder="请输入联系电话">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        <!-- <div class="weui_cell" :class="{'weui_cell_warn' : invalidAddress}">
          <div class="weui_cell_hd">
            <label class="weui_label">联系地址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="address" style="padding-left: 15px;" type="text" placeholder="请输入联系地址">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div> -->
      </div>
      <a @click="doNew" href="javascript:;" style="margin:20px 8px;" class="weui_btn weui_btn_primary" v-show="!cardInfo.qrCodeText">升级健康卡</a>
      <a @click="getInfo" href="javascript:;" style="margin:20px 8px;" class="weui_btn weui_btn_primary" v-show="cardInfo.qrCodeText">查看健康卡详情</a>
      <a @click="gotoPortal" href="javascript:;" style="margin:20px 8px;" class="weui_btn weui_btn_primary" v-show="cardInfo.qrCodeText">返回首页</a>
    </div>
    
    <div class="contaier" v-show="cardStatus === 0">
      <div class="weui_cells_title">注册/绑定电子健康卡</div>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell weui_cell_switch">
          <div class="weui_cell_hd weui_cell_primary">将创建的卡作为默认卡</div>
          <div class="weui_cell_ft">
            <input class="weui_switch" type="checkbox" checked="checked" v-model="asDefault">
          </div>
        </div>
      </div>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidName}">
          <div class="weui_cell_hd">
            <label class="weui_label">姓名</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="name" style="padding-left: 15px;" type="text" placeholder="请输入姓名">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">登记信息</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="bindingCardType">
              <option value="-1" selected="selected">未登记</option>
              <option value="0">诊疗卡</option>
            </select>
          </div>
        </div>
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidBindingNum}" v-show="bindingCardType !== '-1'">
          <div class="weui_cell_hd">
            <label class="weui_label">登记号码</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="bindingNum" style="padding-left: 15px;" type="text" placeholder="请输入登记号码">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">证号类型</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="certType">
              <option value="1">身份证</option>
              <option value="8">港澳来往内地通行证（回乡证）</option>
              <option value="9">台湾来往大陆通行证（台胞证）</option>
              <option value="2">护照</option>
            </select>
          </div>
        </div>
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidCertNo}" >
          <div class="weui_cell_hd" v-show="certType === '1'">
            <label class="weui_label">身份证号</label>
          </div>
          <div class="weui_cell_hd" v-show="certType !== '1'">
            <label class="weui_label">证件号码</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input  class="weui_input"
               v-model="certNo" 
                 style="padding-left: 15px;" 
                 type="text" :placeholder="certType === '1' ? '请输入身份证号' : '请输入证件号码'">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after" v-show="certType !== '1' && bindingCardType === '-1'">
          <div class="weui_cell_hd">
            <label class="weui_label">性别</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="sex">
              <option value="男" selected="selected">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>
        <div class="weui_cell" v-show="certType !== '1' && bindingCardType === '-1'">
          <div class="weui_cell_hd">
            <label class="weui_label">出生日期</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary" style="padding-left: 15px;">
            <input class="weui_input" type="date" v-model="birthday">
          </div>
          <div class="weui_cell_ft">
          </div>
        </div>
        <div class="weui_cell" :class="{'weui_cell_warn' : invalidCellphone}">
          <div class="weui_cell_hd">
            <label class="weui_label">联系电话</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="cellphone" style="padding-left: 15px;" type="tel" placeholder="请输入联系电话">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>
        
        <div class="weui_cell weui_cell_select weui_select_after" :class="{'weui_cell_warn' : invalidProvinceCode}">
          <div class="weui_cell_hd">
            <label class="weui_label">省份</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="provinceCode" @change="Province" >
              <option value="-1" >请选择省份</option>
              <option :key="p.provinceCode" :value="p.provinceCode" :data-name="p.provinceName" v-for="p in PList">{{p.provinceName}}</option>
            </select>
          </div>
        </div>

        <div class="weui_cell weui_cell_select weui_select_after" :class="{'weui_cell_warn' : invalidCityCode}">
          <div class="weui_cell_hd">
            <label class="weui_label">城市</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="cityCode" @change="City">
              <option value="-1" >请选择城市</option>
              <option :key="c.cityCode"  :value="c.cityCode" :data-name="c.cityName" v-for="c in CList">{{c.cityName}}</option>
            </select>
          </div>
        </div>

        <div class="weui_cell weui_cell_select weui_select_after" :class="{'weui_cell_warn' : invalidDistrictCode}">
          <div class="weui_cell_hd">
            <label class="weui_label">县区</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="districtName" @change="District">
              <option value="" >请选择县区</option>
              <option :key="c.cityCode" :value="c.dName" :data-name="c.dCode" v-for="c in DList">{{c.dName}}</option>
            </select>
          </div>
        </div>

        <div class="weui_cell weui_cell_select weui_select_after" :class="{'weui_cell_warn' : invalidTownCode}">
          <div class="weui_cell_hd">
            <label class="weui_label">街道</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="townCode" @change="Town">
              <option value="-1" >请选择街道</option>
              <option :key="t.tCode" :value="t.tCode" :data-name="t.tName" v-for="t in TList">{{t.tName}}</option>
            </select>
          </div>
        </div>

        <div class="weui_cell" :class="{'weui_cell_warn' : invalidAddress}" v-show=" searchedStrs.length < 1 && bindingCardType !== '0'">
          <div class="weui_cell_hd">
            <label class="weui_label">联系地址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" v-model="address" style="padding-left: 15px;" type="text" placeholder="请输入联系地址">
          </div>
          <div class="weui_cell_ft">
            <i class="weui_icon_warn"></i>
          </div>
        </div>

        <!-- <div class="weui_cells weui_cells_checkbox" v-show="bindingCardType === '1' || bindingCardType === '-1'">
          <label class="weui_cell weui_cell_label">
            <div class="weui_cell_hd">
              <p>人脸识别</p>
            </div>
            <div class="weui_cell_bd" style="padding-left: 15px;">
              <input type="checkbox" class="weui_check" v-model="isface"/>
              <i class="weui_icon_checked"></i>
            </div>
          </label>
        </div> -->
      </div>

      <div v-show="certType === '1'">
        <p style="padding:10px;" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提醒：请确保您输入的身份证号码准确无误;如果您还没有办理身份证，可参考户口簿上的身份证号码。
        </p>
      </div>
      <div v-show="certType !== '1'">
        <p style="padding:10px;" class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提醒：请确保您输入的证件号码准确无误。
        </p>
      </div>
      <a @click="doBinding" href="javascript:;" style="margin:5px 8px;" class="weui_btn weui_btn_primary">确认</a>
      <partial name="footer-copyright"></partial>
    </div>
  </div>
</template>
<style scoped>
.weui_label {
  display: block;
  width: 4em;
}
</style>
<script>
import { showCommonToast, showSuccessToast, hideSuccessToast, addNewHealthCard, loadCardsFromServer } from '../../vuex/actions'
import wx from 'weixin-js-sdk'
import _ from 'underscore'
// import $ from 'jquery'
export default {
  name: 'NewHealthCardView',
  vuex: {
    actions: {
      showCommonToast,
      showSuccessToast,
      hideSuccessToast,
      addNewHealthCard,
      loadCardsFromServer
    }
  },
  data: function () {
    return {
      id1: '',
      healthCode: this.$route.query.healthCode ? this.$route.query.healthCode : '',
      wechatCode: this.$route.query.wechatCode ? this.$route.query.wechatCode : '',
      cardId: -1,
      cardInfo: [],
      cardStatus: 0,
      failedMsg: '',
      codeQrCodeText: '',
      codeHealthCardId: '',
      codePhId: '',
      bindingNum: '',
      bindingCardType: '-1',
      asDefault: true,
      fieldbool: false,
      name: '',
      certNo: '',
      certType: '1',
      cellphone: '',
      address: '',
      addrIds: '',
      isface: false,
      invalidBindingNum: false,
      invalidName: false,
      invalidCertNo: false,
      invalidCellphone: false,
      invalidAddress: false,
      historyStep: -1,
      sex: '男',
      birthday: '2019-01-01',
      nation: '未知',
      invalidStreet: false,
      searchBarFocused: false,
      searchValue: '',
      code: '',
      street: '',
      searchedStrs: [],
      CList: [], // 省
      PList: [], // 市
      DList: [], // 区
      TList: [], // 镇
      provinceCode: '',
      provinceName: '',
      townCode: '',
      townName: '',
      districtCode: '',
      districtName: '',
      cityCode: '',
      cityName: '',
      dCode: '',
      invalidProvinceCode: false,
      invalidCityCode: false,
      invalidDistrictCode: false,
      invalidTownCode: false
    }
  },
  methods: {
    Province (e) {
      var self = this
      if (e.target.selectedOptions.length > 0) {
        self.provinceName = e.target.selectedOptions[0].dataset.name
      } else {
        self.provinceName = ''
      }
    },
    City (e) {
      var self = this
      if (e.target.selectedOptions.length > 0) {
        self.cityName = e.target.selectedOptions[0].dataset.name
      } else {
        self.cityName = ''
      }
    },
    District (e) {
      var self = this
      if (e.target.selectedOptions.length > 0) {
        self.districtCode = e.target.selectedOptions[0].dataset.name
      } else {
        self.districtCode = ''
      }
    },
    Town (e) {
      var self = this
      if (e.target.selectedOptions.length > 0) {
        self.townName = e.target.selectedOptions[0].dataset.name
      } else {
        self.townName = ''
      }
    },
    getHomeAddress: function () {
      var self = this
      self.cityCode = '-1'
      self.provinceCode = '-1'
      self.districtCode = '-1'
      self.townCode = '-1'
      self.PList = []
      self.CList = []
      self.DList = []
      self.TList = []

      this.$ajax.get('GetProvinceInfo', 'Card').then(function (data) {
        self.PList = _.map(data.Info, function (val) {
          return {
            provinceCode: val.Code,
            provinceName: val.Name
          }
        })
      })
    },
    getInfo: function () {
      this.$router.go({ name: 'healthCardDetail', query: {cardId: this.cardId} })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    getHealthCardInfo: function (cardId) {
      var self = this
      this.$ajax.get('GetHealthCardInfo', 'Card', { cardId: cardId }).then(function (data) {
        if (data.ResultCode === '0') {
          self.cardStatus = 1
          var cardItem = data.HealthCardInfo
          self.cardInfo = {
            qrCodeText: cardItem.QrCodeText,
            qrCode: cardItem.QrCode,
            phone: cardItem.Phone,
            name: cardItem.Name,
            idNumber: cardItem.IdNumber
          }
          self.certNo = cardItem.IdenNo
          self.certType = cardItem.CertType
          self.cellphone = cardItem.Cellphone
          self.bindingCardType = cardItem.BindingCardType
          self.address = cardItem.Address
          self.birthday = cardItem.Birthdate
          self.sex = cardItem.Gender
        }
      })
    },
    getHealthCardInfoByCode: function (healthCode) {
      var self = this
      this.$ajax.get('GetHealthCodeInfo', 'Card', { healthCode: healthCode }).then(function (data) {
        if (data.ResultCode === '0') {
          self.cardStatus = data.CardStatus
          var cardItem = data.HealthCardInfo
          if (data.HealthCardInfo) {
            self.cardId = cardItem.Id
            self.cardInfo = {
              qrCodeText: cardItem.QrCodeText,
              qrCode: cardItem.QrCode,
              phone: cardItem.Phone,
              name: cardItem.Name,
              idNumber: cardItem.IdNumber
            }
            self.loadCardsFromServer()
          }
          var healthItem = data.HealthCodeInfo
          self.address = healthItem.Address
          self.birthday = healthItem.Birthday
          self.sex = healthItem.Gender
          self.certNo = healthItem.IdNumber
          self.certType = healthItem.IdType
          self.name = healthItem.Name
          self.nation = healthItem.Nation
          self.cellphone = healthItem.Phone1
          self.codePhId = healthItem.PhId
          self.codeHealthCardId = healthItem.HealthCardId
          self.codeQrCodeText = healthItem.QrCodeText
        } else {
          self.cardStatus = -1
          self.failedMsg = data.ResultMsg
        }
      })
    },
    getHealthCard: function (cardId) {
      this.$ajax.get('GetWechatCode', 'Card', { cardId: -1 }).then(function (data) {
        window.location.href = data
      })
    },
    goSearch: function () {
      this.searchBarFocused = true
    },
    leaveSearch: function () {
      this.searchBarFocused = false
    },
    doBinding: function () {
      this.doNew()
      // if (this.isface) {
      //   this.doWxFace()
      // } else {
      //   this.doNew()
      // }
    },
    setAddr: function (code, name) {
      this.code = code
      this.street = name
      this.searchedStrs = []
    },
    doNew: function () {
      var addrIds = ''
      var num = ''
      var certNo = this.certNo
      var certType = this.certType
      // var sss=certNo.substr(0, 3) + '****' + certNo.substr(7, 11)
      if (this.cardId === -1) {
        if (!this.checkUserInput()) {
          return
        }
        addrIds = this.sheng + '|' + this.shi + '|' + this.xian + '|' + this.xiang
        if (this.bindingCardType !== '-1') {
          num = this.bindingNum
        }
        if (this.bindingCardType === '1' || this.bindingCardType === '9' || this.bindingCardType === '8' || this.bindingCardType === '14') {
          certNo = this.bindingNum
          certType = this.bindingCardType
        }
      }
      var card = {
        num: num,
        type: this.bindingCardType,
        isDefault: this.asDefault,
        name: this.name,
        certNo: certNo,
        certType: certType,
        phone: this.cellphone,
        address: this.townCode + this.townName + this.address,
        addrIds: addrIds,
        historyStep: -1,
        gender: this.sex,
        birthday: this.birthday,
        wechatCode: this.wechatCode,
        cardId: this.cardId,
        qrCodeText: this.codeQrCodeText,
        healthCardId: this.codeHealthCardId,
        pdId: this.codePhId,
        nation: this.nation
      }

      var self = this
      this.addNewHealthCard(card).then(function (result) {
        if (result.isSucceed) {
          self.showSuccessToast({ msg: result.msg }, false)
          self.cardStatus = 1
          if (result.cardInfo) {
            self.cardId = result.cardInfo.id
            self.cardInfo = {
              qrCodeText: result.cardInfo.qrCodeText,
              qrCode: result.cardInfo.qrCode,
              phone: result.cardInfo.phone,
              name: result.cardInfo.name,
              idNumber: result.cardInfo.idNumber
            }
          }
          self.hideSuccessToast()
          // window.setTimeout(function () {
          //   self.hideSuccessToast()
          //   self.$router.replace({ name: 'manageHealthCard' })
          // }, 1600)
        } else {
          self.showCommonToast({ msg: result.msg })
        }
        // if (result.isSucceed) {
        //   self.showSuccessToast({ msg: result.msg }, false)
        //   window.setTimeout(function () {
        //     self.hideSuccessToast()
        //     if (self.$route.query.nextRoutePath) {
        //       self.$router.replace({ path: self.$route.query.nextRoutePath })
        //     } else {
        //       if (self.historyStep === -1) {
        //         self.$router.replace({ name: 'portal' })
        //       } else {
        //         window.history.go(-self.historyStep)
        //       }
        //     }
        //   }, 1600)
        // } else {
        //   self.showCommonToast({ msg: result.msg })
        // }
      })
    },
    // 非空判断
    checkUserInput: function () {
      if (this.cardId === -1) {
        if (this.name === '') {
          this.invalidName = true
          this.showCommonToast({ msg: '请输入姓名' })
          return false
        }
        if (this.bindingCardType !== '-1' && this.bindingNum === '') {
          this.invalidBindingNum = true
          this.showCommonToast({ msg: '请输入在院登记号码' })
          return false
        }
      }
      if (this.bindingCardType === '-1' || this.bindingCardType === '3' || this.bindingCardType === '4' || this.bindingCardType === '5' || this.bindingCardType === '6' || this.bindingCardType === '7' || this.bindingCardType === '10') {
        if (this.certType === '') {
          this.invalidCertNo = true
          this.showCommonToast({ msg: '请输入证件类型' })
          return false
        }
        if (this.certNo === '') {
          this.invalidCertNo = true
          this.showCommonToast({ msg: '请输入证件号码' })
          return false
        }
      }
      if (this.bindingCardType !== '0') {
        if (this.provinceCode === '-1' && this.bindingCardType === '-1') {
          this.invalidProvinceCode = true
          this.showCommonToast({ msg: '请选择省份' })
          return false
        }
        if (this.cityCode === '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50' && this.bindingCardType === '-1') {
          this.invalidCityCode = true
          this.showCommonToast({ msg: '请选择城市' })
          return false
        }
        if (this.districtCode === '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50' && this.bindingCardType === '-1') {
          this.invalidDistrictCode = true
          this.showCommonToast({ msg: '请选择县区' })
          return false
        }
        if (this.townCode === '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50' && this.bindingCardType === '-1') {
          this.invalidTownCode = true
          this.showCommonToast({ msg: '请选择街道' })
          return false
        }
        if (this.address === '') {
          this.invalidAddress = true
          this.showCommonToast({ msg: '请输入联系地址' })
          return false
        }
      }
      if (this.cellphone === '') {
        this.invalidCellphone = true
        this.showCommonToast({ msg: '请输入联系电话' })
        return false
      }
      return true
    },
    // 人脸识别
    doWxFace: function () {
      var appid = 'wxd2efd78b0255321f'
      var certNo = ''
      if (this.bindingCardType === '-1') {
        certNo = this.certNo
      }
      if (this.bindingCardType === '1') {
        certNo = this.bindingNum
      }
      // var uinfo = {
      //   name: this.name,
      //   id_card_number: this.certNo
      // }
      var uinfo = '{ "name" : "' + this.name + '", "id_card_number" : "' + certNo + '" }'
      var self = this
      wx.ready(function () {
        wx.invoke('requestWxFacePictureVerify', { 'appid': appid, 'request_verify_pre_info': uinfo, 'check_alive_type': '2' }, function (res) {
          if (res.err_code.toString() === '0') {
            self.showCommonToast({ msg: '人脸识别成功' })
            self.doNew()
          } else {
            self.showCommonToast({ msg: '人脸识别失败:' + self.getWxFaceMsg(res.err_code.toString(), res.err_msg) })
          }
        })
      })
    },
    getWxFaceMsg: function (errcode, errmsg) {
      if (errcode === '0') {
        return '识别成功'
      } else if (errcode === '10001') {
        return '参数错误'
      } else if (errcode === '10002') {
        return '人脸特征检测失败'
      } else if (errcode === '10003') {
        return '身份证号不匹配'
      } else if (errcode === '10004') {
        return '公安比对人脸信息不匹配'
      } else if (errcode === '10005') {
        return '正在检测中'
      } else if (errcode === '10006') {
        return 'appid 没有权限（后台验证部分）'
      } else if (errcode === '10007') {
        return '后台获取图片失败'
      } else if (errcode === '10008') {
        return '公安系统失败'
      } else if (errcode === '10009') {
        return '公安未查到身份证照片比对源'
      } else if (errcode === '10010') {
        return '照片质量不满足公安比对要求'
      } else if (errcode === '10011') {
        return '身份证信息未开通公安比对权限'
      } else if (errcode === '10012') {
        return '征信验证失败'
      } else if (errcode === '10013') {
        return '征信系统错误'
      } else if (errcode === '10014') {
        return '公安系统失败，征信系统成功'
      } else if (errcode === '10015') {
        return '公安服务暂时不可用'
      } else if (errcode === '10016') {
        return '存储用户图片失败'
      } else if (errcode === '10017') {
        return '非法 identify_id'
      } else if (errcode === '10018') {
        return '用户信息不存在'
      } else if (errcode === '10020') {
        return '认证超时'
      } else if (errcode === '10021') {
        return '重复的请求，返回上一次的结果'
      } else if (errcode === '10022') {
        return '用户信息错误，请检测 json 格式'
      } else if (errcode === '10026') {
        return '用户身份证数据不在公安比对数据库中'
      } else if (errcode === '10027') {
        return '语音识别失败'
      } else if (errcode === '10028') {
        return '唇动检测失败'
      } else if (errcode === '10029') {
        return '微警超时'
      } else if (errcode === '10030') {
        return '绑定身份证失败'
      } else if (errcode === '10031') {
        return '没有申请征信商户号或公众号/小程序没有设置昵称'
      } else if (errcode === '10032') {
        return '用户身份证数据不再征信数据库中'
      } else if (errcode === '10040') {
        return '请求数据编码不对，必须是 UTF8 编码'
      } else if (errcode === '10041') {
        return '非法 user_id_key'
      } else if (errcode === '10042') {
        return '请求过于频繁，稍后再重试'
      } else if (errcode === '10045') {
        return '系统失败'
      } else if (errcode === '10052') {
        return '请求数超时征信的限制'
      } else if (errcode === '10057') {
        return '检测过程中人脸主体不一致'
      } else if (errcode === '10066') {
        return '人脸流水号 bioid 重复'
      } else if (errcode === '10069') {
        return '活体检测暂时不可用'
      } else if (errcode === '90100') {
        return '用户取消'
      } else if (errcode === '90101') {
        return '用户未授权'
      } else if (errcode === '90102') {
        return '底层库出错'
      } else if (errcode === '90103') {
        return 'CDN 上传出错'
      } else if (errcode === '90104') {
        return '获取配置信息出错'
      } else if (errcode === '90105') {
        return '获取确认页信息失败'
      } else if (errcode === '90106') {
        return '相机初始化失败'
      } else if (errcode === '90107') {
        return '用户采集人脸超时'
      } else if (errcode === '90108') {
        return '用户采集过程中都动态剧烈'
      } else if (errcode === '90109') {
        return '设备不支持人脸采集'
      } else if (errcode === '90199') {
        return '未知错误'
      } else {
        return errmsg
      }
    },
    realNameAuth: function () {
      var self = this
      this.$ajax.get('RealNameAuth', 'AlipayAuth', {
        code: self.global.accessToken
      }).then(function (data) {
        console.log(data)
        self.name = data.UserName
        self.certNo = data.CertNo
        self.CertType = data.CertType
        self.sex = data.PersonBirthday
        self.cellphone = data.Mobile
      })
    }
  },
  // 监听身份证测试方法1
  watch: {
    certNo: function (newVal, oldVal) {
      if (this.certNo.length > 17) {
        this.certNo = this.certNo.replace(/(.{1}).*(.{1})/, '$1****************$2')
      }
    }
  },
  ready: function () {
    this.getHomeAddress()
    this.realNameAuth()
    this.$watch('name', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidName = false
      }
    })
    this.$watch('bindingNum', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidBindingNum = false
      }
    })
    this.$watch('certNo', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidCertNo = false
      }
    })
    this.$watch('cellphone', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidCellphone = false
      }
    })
    this.$watch('address', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidAddress = false
      }
    })
    this.$watch('code', function (newVal, oldVal) {
      if (newVal !== '') {
        this.invalidStreet = false
      }
    })
    this.$watch('cityCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidCityCode = false
      }
    })
    this.$watch('districtCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidDistrictCode = false
      }
    })
    this.$watch('townCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidTownCode = false
      }
    })
    this.$watch('cityCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidCityCode = false
      }
    })
    this.$watch('districtCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidDistrictCode = false
      }
    })
    this.$watch('townCode', function (newVal, oldVal) {
      if (newVal !== '-1' && this.provinceCode !== '11' && this.provinceCode !== '12' && this.provinceCode !== '31' && this.provinceCode !== '50') {
        this.invalidTownCode = false
      }
    })

    // 检索省级变动 根据省级id查市级
    this.$watch('provinceCode', function (val) {
      var self = this
      var vcode = val.split(' || ')[0]
      self.cityCode = '-1'
      self.districtCode = '-1'
      self.townCode = '-1'
      self.CList = []
      self.DList = []
      self.TList = []
      this.$ajax.get('GetCityInfo', 'Card', { code: vcode }).then(function (data) {
        self.CList = _.map(data.Info, function (val2) {
          return {
            cityCode: val2.Code,
            cityName: val2.Name
          }
        })
      })
    })
    // 检索市级变动 根据市级id查县级
    this.$watch('cityCode', function (val) {
      var self = this
      var vcode = self.cityCode
      self.districtName = ''
      self.townCode = '-1'
      self.DList = []
      self.TList = []
      this.$ajax.get('GetDistrictInfo', 'Card', { code: vcode }).then(function (data) {
        self.DList = _.map(data.Info, function (val2) {
          return {
            dCode: val2.Code,
            dName: val2.Name
          }
        })
      })
      console.log(self.DList)
    })
    // 检索县级级变动 根据县级id查街道
    this.$watch('districtName', function (val) {
      var self = this
      // var vcode = self.districtCode
      var addressName = self.provinceName + self.cityName + self.districtName
      self.townCode = '-1'
      self.TList = []
      this.$ajax.get('GetTownInfo', 'Card', { codeName: addressName }).then(function (data) {
        self.TList = _.map(data.Info, function (val2) {
          return {
            tCode: val2.Code,
            tName: val2.Name
          }
        })
      })
    })
    this.$watch('certType', function (newVal, oldVal) {
      // if (newVal !== '' && newVal !== oldVal) {
      //   if (newVal === '8' || newVal === '9') {
      //     for (var i = this.shengList.length - 1; i >= 0; i--) {
      //       if (this.shengList[i].AddressName === '港、澳、台') {
      //         this.sheng = this.shengList[i].AddressId
      //       }
      //     }
      //   } else if (newVal === '12') {
      //     for (var j = this.shengList.length - 1; j >= 0; j--) {
      //       if (this.shengList[j].AddressName === '外籍') {
      //         this.sheng = this.shengList[j].AddressId
      //       }
      //     }
      //   } else {
      //     this.sheng = ''
      //   }
      // }
    })
    // this.getAddress('1', '', '0', 0)
    var cardId = parseInt(this.$route.query.cardId)
    if (isNaN(cardId) || cardId < 0) {
      this.cardId = cardId
      // 一键关联建卡
      if (this.$route.query.healthCode) {
        this.getHealthCardInfoByCode(this.$route.query.healthCode)
      }
      // this.getHealthCardInfo(cardId)
    } else {
      this.cardId = cardId
      this.getHealthCardInfo(cardId)
    }

    this.$watch('searchValue', function (val) {
      var self = this
      if (val === '') {
        this.searchedStrs = []
//        this.code = ''
//        this.street = ''
//        this.$nextTick(function () {
//          this.listIScroll.refresh()
//          this.listIScroll.scrollTo(0, 0, 0)
//        })
      } else if (val.length > 3) {
        this.$ajax.get('GetStreet', 'Card', { area: val }).then(function (data) {
          self.searchedStrs = data.Addresses
//          self.$nextTick(function () {
//            self.listIScroll.refresh()
//            self.listIScroll.scrollTo(0, 0, 0)
//          })
        })
      }
    })
  }
}
</script>
