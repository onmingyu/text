<template>
  <div class="container" v-show="viewInfo">
    <div class="weui_cells_title">就诊卡：</div>
    <div class="weui_cells weui_cells_access" style="margin-top: 10px">
      <a @click="selectCard" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i
            class="fa fa-credit-card fa-2x icon-color"
            style="width: 45px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            {{ card ? card.name : "" }}
            <span style="margin-left: 15px" class="blue_tag">{{
              card ? card.type : ""
            }}</span>
          </p>
          <p>{{ card ? card.num : "" }}</p>
        </div>
        <div class="weui_cell_ft">选就诊卡</div>
      </a>
    </div>
    <div v-show="showEmpty">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          {{ emptyMsg }}
        </p>
      </div>
    </div>
    <div v-show="showEmpty === false">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          请填写入院登记表
        </p>
      </div>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">身份证</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_textarea"
              v-model="idNo"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写您的身份证"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">职业</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="occupation">
              <option value="" selected="selected">请选择职业</option>
              <option v-for="occ in careers" :value="occ.CrCode">
                {{ occ.CrName }}
              </option>
            </select>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">国籍</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="citizenship">
              <option value="" selected="selected">请选择国籍</option>
              <option v-for="na in nationalities" :value="na.NlCode">
                {{ na.NlName }}
              </option>
            </select>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">籍贯</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="province" style="width: 45%">
              <option value="" selected="selected">请选择省</option>
              <option v-for="npp in nativePlacePro" :value="npp.NpProvince">
                {{ npp.NpProvince }}
              </option>
            </select>
            <select
              class="weui_select"
              v-model="nativePlace"
              v-show="province !== ''"
              style="width: 45%"
            >
              <option value="" selected="selected">请选择市</option>
              <option
                v-for="np in nativePlaces | filterBy province in 'NpProvince'"
                :value="np.NpCode"
              >
                {{ np.NpCity }}
              </option>
            </select>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">民族</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="nation">
              <option value="" selected="selected">请选择民族</option>
              <option v-for="nat in nationals" :value="nat.NlCode">
                {{ nat.NlName }}
              </option>
            </select>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">婚姻状况</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select class="weui_select" v-model="maritalStatus">
              <option value="" selected="selected">请选择婚姻状况</option>
              <option v-for="mar in maritals" :value="mar.MtCode">
                {{ mar.MtName }}
              </option>
            </select>
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">出生地</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="bAddrKey"
              style="padding-left: 15px; height: 44px"
              placeholder="请选择出生地"
            />
          </div>
        </div>
        <div class="weui_cells_title" v-show="bTip">
          <i class="fa fa-info-circle"></i>{{ bTip }}
        </div>
        <div
          class="weui_cells weui_cells_access"
          v-show="bAddrKey !== birthPlaceDesc"
        >
          <a
            v-for="b in bAddrs"
            @click="setBAddr(b.AddressId, b.AddressName)"
            class="weui_cell"
            href="javascript:;"
          >
            <div class="weui_cell_hd">
              <i
                class="fa fa-group icon-color"
                style="width: 20px; margin-right: 5px; display: block"
              ></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{ b.AddressName }}</p>
            </div>
            <div class="weui_cell_ft"></div>
          </a>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">现住址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="mAddrKey"
              style="padding-left: 15px; height: 44px"
              placeholder="请选择现住址"
            />
          </div>
        </div>
        <div class="weui_cells_title" v-show="mTip">
          <i class="fa fa-info-circle"></i>{{ mTip }}
        </div>
        <div
          class="weui_cells weui_cells_access"
          v-show="mAddrKey !== mailingAddress"
        >
          <a
            v-for="m in mAddrs"
            @click="setMAddr(m.AddressId, m.AddressName)"
            class="weui_cell"
            href="javascript:;"
          >
            <div class="weui_cell_hd">
              <i
                class="fa fa-group icon-color"
                style="width: 20px; margin-right: 5px; display: block"
              ></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{ m.AddressName }}</p>
            </div>
            <div class="weui_cell_ft"></div>
          </a>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">现住门牌</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_textarea"
              v-model="mailingAddrSn"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写现住址门牌号码"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">现住邮编</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="zipCode"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写现住址邮编"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">家庭电话</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="phoneNumberHome"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写家庭电话"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">户口地址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="rAddrKey"
              style="padding-left: 15px; height: 44px"
              placeholder="请选择户口地址"
            />
          </div>
        </div>
        <div class="weui_cells_title" v-show="rTip">
          <i class="fa fa-info-circle"></i>{{ rTip }}
        </div>
        <div
          class="weui_cells weui_cells_access"
          v-show="rAddrKey !== regResidence"
        >
          <a
            v-for="r in rAddrs"
            @click="setRAddr(r.AddressId, r.AddressName)"
            class="weui_cell"
            href="javascript:;"
          >
            <div class="weui_cell_hd">
              <i
                class="fa fa-group icon-color"
                style="width: 20px; margin-right: 5px; display: block"
              ></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{ r.AddressName }}</p>
            </div>
            <div class="weui_cell_ft"></div>
          </a>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">户口门牌</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="regResidenceSn"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写户口门牌号码"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">户口邮编</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="regResidenceZipCode"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写户口邮编"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">工作单位</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="unitName"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写工作单位"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">工作地址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="uAddrKey"
              style="padding-left: 15px; height: 44px"
              placeholder="请选择工作单位地址"
            />
          </div>
        </div>
        <div class="weui_cells_title" v-show="uTip">
          <i class="fa fa-info-circle"></i>{{ uTip }}
        </div>
        <div
          class="weui_cells weui_cells_access"
          v-show="uAddrKey !== unitAddress"
        >
          <a
            v-for="u in uAddrs"
            @click="setUAddr(u.AddressId, u.AddressName)"
            class="weui_cell"
            href="javascript:;"
          >
            <div class="weui_cell_hd">
              <i
                class="fa fa-group icon-color"
                style="width: 20px; margin-right: 5px; display: block"
              ></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{ u.AddressName }}</p>
            </div>
            <div class="weui_cell_ft"></div>
          </a>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">工作门牌</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="unitAddrSn"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写工作单位地址门牌号码"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">工作邮编</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="unitZipCode"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写工作单位邮编"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">单位电话</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="phoneNumberBusiness"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写单位电话号码"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">联系人</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="nextOfKin"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写联系人姓名"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">联系人关系</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="relationship"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写与联系人关系"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">联系人地址</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_textarea"
              v-model="nextOfKinAddr"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写联系人地址"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">联系人邮编</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="nextOfKinZipCode"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写联系人邮政编码"
            />
          </div>
        </div>
        <div class="weui_cell weui_cell_select weui_select_after">
          <div class="weui_cell_hd">
            <label class="weui_label">联系人电话</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input
              class="weui_input"
              v-model="nextOfKinPhone"
              style="padding-left: 15px; height: 44px"
              placeholder="请填写联系人电话号码"
            />
          </div>
        </div>
      </div>
      <a
        @click="saveInfo"
        href="javascript:;"
        style="margin: 10px 8px"
        class="weui_btn weui_btn_primary"
        >确定提交</a
      >
    </div>
    <partial name="footer-copyright"></partial>
  </div>
  <div class="container" v-show="viewInfo === false">
    <div class="bill-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_success weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">提交成功</h2>
          <p class="weui_msg_desc">{{ succeedMsg }}</p>
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
    <div class="bill-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area">
          <i class="weui_icon_warn weui_icon_msg"></i>
        </div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">提交失败</h2>
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
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_label {
  display: block;
  width: 6em;
}
.ft-sm p {
  padding: 3px;
  font-size: 12px;
}

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
</style>
<script>
import { showCommonToast } from '../../vuex/actions'
import _ from 'underscore'
import $ from 'jquery'
export default {
  name: 'SetInpatientRegistView',
  data: function () {
    return {
      viewInfo: true,
      showSuccess: false,
      succeedMsg: '',
      showFailed: false,
      failedMsg: '',
      showEmpty: false,
      emptyMsg: '',
      careers: [],
      maritals: [],
      nationalities: [],
      nationals: [],
      nativePlaces: [],
      nativePlacePro: [],
      bAddrKey: '',
      birthPlaceDesc: '',
      bAddrs: [],
      bTip: '',
      rTip: '',
      mTip: '',
      uTip: '',
      mAddrKey: '',
      mAddrs: [],
      rAddrKey: '',
      rAddrs: [],
      uAddrKey: '',
      uAddrs: [],
      province: '',
      // 职业
      occupation: '',
      // 民族
      nation: '',
      // 婚姻状况
      maritalStatus: '',
      // 出生地
      birthPlace: '',
      // 国籍
      citizenship: '',
      // 现住址地区编码
      mailingAddrAc: '',
      // 现住址
      mailingAddress: '',
      // 现住址门牌号码
      mailingAddrSn: '',
      // 现住址邮编
      zipCode: '',
      // 家庭电话
      phoneNumberHome: '',
      // 户口地址地区编码
      regResidenceAc: '',
      // 户口地址
      regResidence: '',
      // 户口地址门牌号码
      regResidenceSn: '',
      // 户口地址邮编
      regResidenceZipCode: '',
      // 工作单位名称
      unitName: '',
      // 工作单位地址地区编码
      unitAddrAc: '',
      // 工作单位地址
      unitAddress: '',
      // 工作单位地址门牌号码
      unitAddrSn: '',
      // 工作单位邮编
      unitZipCode: '',
      // 单位电话号码
      phoneNumberBusiness: '',
      // 联系人姓名
      nextOfKin: '',
      // 与联系人关系
      relationship: '',
      // 联系人地址
      nextOfKinAddr: '',
      // 联系人邮政编码
      nextOfKinZipCode: '',
      // 联系人电话号码
      nextOfKinPhone: '',
      // 籍贯
      nativePlace: '',
      // 身份证
      idNo: ''
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showCommonToast
    }
  },
  ready: function () {
    this.$watch('card', function (val) {
      this.getPatsStatus()
    })
    this.getRegistInpat()
    this.getPatsStatus()
    this.$watch('province', function (val) {
      var self = this
      var newProvince = val
      var oldNativePlace = this.nativePlace
      self.nativePlace = ''
      var citys = _.map(_.find(this.nativePlaces, function (val) {
        return val.NpProvince === newProvince && val.NpCode === oldNativePlace
      }))
      if (citys.length > 0) {
        self.nativePlace = oldNativePlace
      }
    })
    this.$watch('bAddrKey', function (val) {
      var self = this
      if (val === '') {
        self.bTip = ''
        self.bAddrs = []
        if (self.birthPlaceDesc !== '') {
          self.bAddrKey = self.birthPlaceDesc
        }
      } else {
        if (self.birthPlaceDesc !== val) {
          this.$ajax.get('GetInpatientAddress', 'Inpatient', { keyword: val }).then(function (data) {
            self.bAddrs = data.AddressList
            self.bTip = ''
            if (data.AddressList.length === 0) {
              self.bTip = '没有找到您的地址'
            }
          })
        } else {
          self.bTip = ''
          self.bAddrs = []
        }
      }
    })
    this.$watch('mAddrKey', function (val) {
      var self = this
      if (val === '') {
        self.mTip = ''
        self.mAddrs = []
        if (self.mailingAddress !== '') {
          self.mAddrKey = self.mailingAddress
        }
      } else {
        if (self.mailingAddress !== val) {
          this.$ajax.get('GetInpatientAddress', 'Inpatient', { keyword: val }).then(function (data) {
            self.mAddrs = data.AddressList
            self.mTip = ''
            if (data.AddressList.length === 0) {
              self.mTip = '没有找到您的地址'
            }
          })
        } else {
          self.mTip = ''
          self.mAddrs = []
        }
      }
    })
    this.$watch('rAddrKey', function (val) {
      var self = this
      if (val === '') {
        self.rTip = ''
        self.rAddrs = []
        if (self.regResidence !== '') {
          self.rAddrKey = self.regResidence
        }
      } else {
        if (self.regResidence !== val) {
          this.$ajax.get('GetInpatientAddress', 'Inpatient', { keyword: val }).then(function (data) {
            self.rAddrs = data.AddressList
            self.rTip = ''
            if (data.AddressList.length === 0) {
              self.rTip = '没有找到您的地址'
            }
          })
        } else {
          self.rTip = ''
          self.rAddrs = []
        }
      }
    })
    this.$watch('uAddrKey', function (val) {
      var self = this
      if (val === '') {
        self.uTip = ''
        self.uAddrs = []
        if (self.unitAddress !== '') {
          self.uAddrKey = self.unitAddress
        }
      } else {
        if (self.unitAddress !== val) {
          this.$ajax.get('GetInpatientAddress', 'Inpatient', { keyword: val }).then(function (data) {
            self.uAddrs = data.AddressList
            self.uTip = ''
            if (data.AddressList.length === 0) {
              self.uTip = '没有找到您的地址'
            }
          })
        } else {
          self.uTip = ''
          self.uAddrs = []
        }
      }
    })
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    getRegistInpat: function () {
      var self = this
      this.$ajax.get('RegistInpatientInfo', 'Inpatient').then(function (data) {
        if (data.ResultCode === '0') {
          self.careers = data.CareerList
          self.maritals = data.MaritalList
          self.nationalities = data.NationalityList
          self.nationals = data.NationalList
          self.nativePlaces = data.NativePlaceList
          self.nativePlacePro = data.NativePlaceProList
        } else {
          self.careers = []
          self.maritals = []
          self.nationalities = []
          self.nationals = []
          self.nativePlaces = []
          self.nativePlacePro = []
        }
      })
    },
    getPatsStatus: function () {
      if (!this.card) {
        return
      }
      var self = this
      self.showEmpty = true
      self.emptyMsg = ''
      this.$ajax.get('GetPatsSaveInfoStatus', 'Inpatient', {
        cardId: this.card.id
      }).then(function (data) {
        if (data.ResultCode === '0') {
          self.showEmpty = false
          self.emptyMsg = ''
          if (data.GetPatientInfo) {
            self.bAddrKey = data.BirthPlaceDesc
            self.birthPlace = data.BirthPlace
            self.birthPlaceDesc = data.BirthPlaceDesc
            self.mAddrKey = data.MailingAddress
            self.rAddrKey = data.RegResidence
            self.uAddrKey = data.UnitAddress
            self.province = data.Province
            self.occupation = data.Occupation
            self.nation = data.Nation
            self.maritalStatus = data.MaritalStatus
            self.citizenship = data.Citizenship
            self.mailingAddrAc = data.MailingAddrAc
            self.mailingAddress = data.MailingAddress
            self.mailingAddrSn = data.MailingAddrSn
            self.zipCode = data.ZipCode
            self.phoneNumberHome = data.PhoneNumberHome
            self.regResidenceAc = data.RegResidenceAc
            self.regResidence = data.RegResidence
            self.regResidenceSn = data.RegResidenceSn
            self.regResidenceZipCode = data.RegResidenceZipCode
            self.unitName = data.UnitName
            self.unitAddrAc = data.UnitAddrAc
            self.unitAddress = data.UnitAddress
            self.unitAddrSn = data.UnitAddrSn
            self.unitZipCode = data.UnitZipCode
            self.phoneNumberBusiness = data.PhoneNumberBusiness
            self.nextOfKin = data.NextOfKin
            self.relationship = data.Relationship
            self.nextOfKinAddr = data.NextOfKinAddr
            self.nextOfKinZipCode = data.NextOfKinZipCode
            self.nextOfKinPhone = data.NextOfKinPhone
            self.nativePlace = data.NativePlace
            self.idNo = data.IdNo
          }
        } else {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
        }
      })
    },
    setBAddr: function (aId, aName) {
      var self = this
      self.bAddrKey = aName
      self.birthPlace = aId
      self.birthPlaceDesc = aName
    },
    setMAddr: function (aId, aName) {
      var self = this
      self.mAddrKey = aName
      self.mailingAddrAc = aId
      self.mailingAddress = aName
    },
    setRAddr: function (aId, aName) {
      var self = this
      self.rAddrKey = aName
      self.regResidenceAc = aId
      self.regResidence = aName
    },
    setUAddr: function (aId, aName) {
      var self = this
      self.uAddrKey = aName
      self.unitAddrAc = aId
      self.unitAddress = aName
    },
    saveInfo: function () {
      if (this.occupation === '') {
        this.showCommonToast({ msg: '请选择职业' })
        return
      }
      if (this.nation === '') {
        this.showCommonToast({ msg: '请选择民族' })
        return
      }
      if (this.maritalStatus === '') {
        this.showCommonToast({ msg: '请选择婚姻状况' })
        return
      }
      if (this.birthPlace === '') {
        this.showCommonToast({ msg: '请选择出生地' })
        return
      }
      if (this.citizenship === '') {
        this.showCommonToast({ msg: '请选择国籍' })
        return
      }
      if (this.mailingAddrAc === '') {
        this.showCommonToast({ msg: '请选择现住址' })
        return
      }
      if (this.mailingAddress === '') {
        this.showCommonToast({ msg: '请选择现住址' })
        return
      }
      if (this.mailingAddrSn === '') {
        this.showCommonToast({ msg: '请填写现住址门牌号码' })
        return
      }
      if (this.zipCode === '') {
        this.showCommonToast({ msg: '请填写现住址邮编' })
        return
      }
      if (this.zipCode.length !== 6) {
        this.showCommonToast({ msg: '填写现住址邮编格式错误' })
        return
      }
      if (this.phoneNumberHome === '') {
        this.showCommonToast({ msg: '请填写家庭电话' })
        return
      }
      if (this.regResidenceAc === '') {
        this.showCommonToast({ msg: '请选择户口地址' })
        return
      }
      if (this.regResidence === '') {
        this.showCommonToast({ msg: '请选择户口地址' })
        return
      }
      if (this.regResidenceSn === '') {
        this.showCommonToast({ msg: '请填写户口门牌号码' })
        return
      }
      if (this.regResidenceZipCode === '') {
        this.showCommonToast({ msg: '请填写户口邮编' })
        return
      }
      if (this.regResidenceZipCode.length !== 6) {
        this.showCommonToast({ msg: '填写户口邮编格式错误' })
        return
      }
      // 加权因子
      var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
      // 身份证验证位值.10代表X
      var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

      var IdCardValidate =
        function (idCard) {
          // 去掉字符串头尾空格
          idCard = $.trim(idCard.replace(/ /g, ''))
          if (idCard.length === 15) {
            var birth = isValidityBrithBy15IdCard(idCard)
            // 进行15位身份证的验证
            return birth
          } else if (idCard.length === 18) {
            // 得到身份证数组
            var aIdCard = idCard.split('')
            birth = isValidityBrithBy18IdCard(idCard)
            // 进行18位身份证的基本验证和第18位的验证
            if (isTrueValidateCodeBy18IdCard(aIdCard)) {
              return birth
            } else {
              return ''
            }
          } else {
            return ''
          }
        }

      /**
       * 判断身份证号码为18位时最后的验证位是否正确
       */
      var isTrueValidateCodeBy18IdCard =
        function (aIdCard) {
          // 声明加权求和变量
          var sum = 0
          if (aIdCard[17].toString().toLowerCase() === 'x') {
            // 将最后位为x的验证码替换为10方便后续操作
            aIdCard[17] = 10
          }
          for (var i = 0; i < 17; i++) {
            // 加权求和
            sum += Wi[i] * aIdCard[i]
          }
          // 得到验证码所位置
          var valCodePosition = sum % 11
          if (aIdCard[17].toString() === ValideCode[valCodePosition].toString()) {
            return true
          } else {
            return false
          }
        }
      /**
       * 验证18位数身份证号码中的生日是否是有效生日
       */
      var isValidityBrithBy18IdCard =
        function (idCard18) {
          var year = idCard18.substring(6, 10)
          var month = idCard18.substring(10, 12)
          var day = idCard18.substring(12, 14)
          var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
          // 这里用getFullYear()获取年份，避免千年虫问题
          if (tempDate.getFullYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
            return ''
          } else {
            return year + '-' + month + '-' + day
          }
        }
      /**
       * 验证15位数身份证号码中的生日是否是有效生日
       */
      var isValidityBrithBy15IdCard =
        function (idCard15) {
          var year = idCard15.substring(6, 8)
          var month = idCard15.substring(8, 10)
          var day = idCard15.substring(10, 12)
          var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
          // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
          if (tempDate.getYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
            return ''
          } else {
            return '19' + year + '-' + month + '-' + day
          }
        }
      if (this.idNo === '') {
        this.showCommonToast({ msg: '请填写您的身份证' })
        return
      }
      if (IdCardValidate(this.idNo) === '') {
        this.showCommonToast({ msg: '身份证号格式错误,请重新输入' })
        return
      }
      // if (this.unitName === '') {
      //   this.showCommonToast({ msg: '请填写工作单位' })
      //   return
      // }
      // if (this.unitAddrAc === '') {
      //   this.showCommonToast({ msg: '请选择工作单位地址' })
      //   return
      // }
      // if (this.unitAddress === '') {
      //   this.showCommonToast({ msg: '请选择工作单位地址' })
      //   return
      // }
      // if (this.unitAddrSn === '') {
      //   this.showCommonToast({ msg: '请填写工作单位地址门牌号码' })
      //   return
      // }
      if (this.unitZipCode !== '' && this.unitZipCode.length !== 6) {
        this.showCommonToast({ msg: '填写工作单位邮编格式错误' })
        return
      }
      // if (this.phoneNumberBusiness === '') {
      //   this.showCommonToast({ msg: '请填写单位电话号码' })
      //   return
      // }
      if (this.nextOfKin === '') {
        this.showCommonToast({ msg: '请填写联系人姓名' })
        return
      }
      if (this.relationship === '') {
        this.showCommonToast({ msg: '请填写与联系人关系' })
        return
      }
      if (this.nextOfKinAddr === '') {
        this.showCommonToast({ msg: '请填写联系人地址' })
        return
      }
      if (this.nextOfKinZipCode === '') {
        this.showCommonToast({ msg: '请填写联系人邮政编码' })
        return
      }
      if (this.nextOfKinZipCode.length !== 6) {
        this.showCommonToast({ msg: '填写联系人邮政编码格式错误' })
        return
      }
      if (this.nextOfKinPhone === '') {
        this.showCommonToast({ msg: '请填写联系人电话号码' })
        return
      }
      if (this.nativePlace === '') {
        this.showCommonToast({ msg: '请选择籍贯' })
        return
      }
      var self = this
      this.$ajax.get('SaveInpInfo', 'Inpatient', {
        cardId: this.card.id,
        idNo: this.idNo,
        occupation: this.occupation,
        nation: this.nation,
        maritalStatus: this.maritalStatus,
        birthPlace: this.birthPlace,
        citizenship: this.citizenship,
        mailingAddrAc: this.mailingAddrAc,
        mailingAddress: this.mailingAddress,
        mailingAddrSn: this.mailingAddrSn,
        zipCode: this.zipCode,
        phoneNumberHome: this.phoneNumberHome,
        regResidenceAc: this.regResidenceAc,
        regResidence: this.regResidence,
        regResidenceSn: this.regResidenceSn,
        regResidenceZipCode: this.regResidenceZipCode,
        unitName: this.unitName,
        unitAddrAc: this.unitAddrAc,
        unitAddress: this.unitAddress,
        unitAddrSn: this.unitAddrSn,
        unitZipCode: this.unitZipCode,
        phoneNumberBusiness: this.phoneNumberBusiness,
        nextOfKin: this.nextOfKin,
        relationship: this.relationship,
        nextOfKinAddr: this.nextOfKinAddr,
        nextOfKinZipCode: this.nextOfKinZipCode,
        nextOfKinPhone: this.nextOfKinPhone,
        nativePlace: this.nativePlace
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.viewInfo = false
          self.failedMsg = data.ResultMsg
          self.showSuccess = false
          self.showFailed = true
        } else {
          self.showEmpty = false
          self.emptyMsg = ''
          self.viewInfo = false
          self.succeedMsg = ''
          self.showSuccess = true
          self.showFailed = false
        }
      })
    }
  }
}
</script>
