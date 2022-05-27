<template>
  <div class="paperContainer" id="paperContainer" v-el:imageWrapper>
    <div class="contentContainer" v-if="!resultShow">
      <div class="questionTitle">
        <h2 style="text-align: center;">{{questionTitle}}</h2>
        <i style="line-height: 26px;font-size: 19px;">{{Statement}}</i>
      </div>
      <div class="weui_cells_title">健康卡:</div>
      <div class="weui_cells weui_cells_access" style="margin-top:10px;">
        <a @click="selectCard" class="weui_cell" href="javascript:;" v-if="cardInfo.id > 0">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{cardInfo.name}}</p>
            <p>{{cardInfo.idNumber}}</p>
          </div>
          <div class="weui_cell_ft">
            另选
          </div>
        </a>
        <a @click="selectCard" class="weui_cell" href="javascript:;" v-else>
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>暂无健康卡</p>
          </div>
          <div class="weui_cell_ft">
            新建
          </div>
        </a>
      </div>
      <div class="questionContent">
        <div v-for="(pIndex, pItem) in questionList" :key="pIndex">
          <div class="oneTitle" v-if="pItem.Mark != 'Title'" @click="submitThis">{{pItem.Name}}</div>
          <div
            v-for="(index, item) in pItem.NextList"
            :class="item.Type == 3 || item.Mark == 'Sex' ? 'quesItem' :index==5||index==6||index==7||index==8?'moreFont colorRed':'moreFont'"
            :key="index">
            <!-- <div>{{showData(item)}}</div> -->
            <!-- 填空 001 -->
            <template v-if="item.Type == 1">
              <!-- false竖排 true横排 -->
              <div>
                <div><span class="required-inp" v-if="item.Required">*</span>{{ item.Name }}<span v-if="item.Mark == 'Address'" style="color: red">(请务必填写正确地址)</span></div>
                <div><input v-model="item.Context" type="text" :disabled="item.inputFont" class="itemInputType moreFontBottom" /></div>
              </div>
                <!-- <span>{{ item.Name }}</span>
                <input v-model="item.Context" type="text" :disabled="item.inputFont" class="itemInput" /> -->
            </template>
            <!-- 下拉框 002 -->
            <template v-if="item.Type == 5">
              <!-- 证件类型 -->
              <div v-if="item.Mark == 'IdenType'">
                <p><span class="required-inp" v-if="item.Required">*</span>{{ item.Name }}</p>
                <div class="check">
                  <select class="itemInputType moreFontBottom" v-model="item.Context">
                    <!-- <option value="">请选择证件类型</option> -->
                    <!-- <option v-for="identityType in commcode.IdentityTypeList" :value="identityType.Code">
                      {{identityType.Name}}
                    </option> -->
                    <option value="身份证">身份证</option>
                    <option value="护照">护照</option>
                    <option value="港澳通行证">港澳通行证</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 时间控件 003 -->
            <template v-if="item.Type == 6">
              <!-- false竖排 true横排 -->
              <div>
                <div><span class="required-inp" v-if="item.Required">*</span>{{ item.Name }}</div>
                <div><input v-model="item.Context" type="date" :disabled="item.inputFont" class="itemInputType moreFontBottom" /></div>
              </div>
                <!-- <span>{{ item.Name }}</span>
                <input v-model="item.Context" type="text" :disabled="item.inputFont" class="itemInput" /> -->
            </template>
            <!-- 单选 004 -->
            <template v-if="item.Type == 2">
              <p><span class="required-inp" v-if="item.Required">*</span>{{ item.Name }}</p>
              <div class="check">
                <template v-for="(cIndex, cItem) in item.OptionList">
                  <p :key="cIndex">
                    <i @click="oneChoiceClick(pIndex, index, cIndex)"
                      class="iconfont"
                      :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'">
                    </i>
                    <input type="text" v-model="cItem.Context" v-if="cItem.Other && cItem.OtherSort" class="itemInput itemInputOther" />
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                    <input type="text" v-model="cItem.Context" :placeholder="cItem.OptionId == 77 ? '请填写省/市/区' : ''" v-if="cItem.Other && !cItem.OtherSort" class="itemInput itemInputOther" />
                    <span>{{cItem.OtherDescribe}}</span>
                  </p>
                </template>
              </div>
            </template>
            <!-- 多选 005 -->
            <template v-if="item.Type == 3">
              <div>{{ item.Name }}</div>
              <div class="check">
                <template v-for="(cIndex, cItem) in item.OptionList">
                  <p :key="cIndex">
                    <i @click="anyChoiceClick(pIndex, index, cIndex)"
                      class="iconfont"
                      :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'">
                    </i>
                    <template v-if="cItem.Other && cItem.OtherSort">
                      <span>{{cItem.OtherDescribe}}</span>
                    </template>
                    <input type="text" v-model="cItem.Context" v-if="cItem.Other && cItem.OtherSort" class="itemInput cInput itemInputOther" />
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                    <input type="text" v-model="cItem.Context" v-if="cItem.Other && !cItem.OtherSort" class="itemInput cInput itemInputOther" />
                    <template v-if="cItem.Other && !cItem.OtherSort">
                      <span>{{cItem.OtherDescribe}}</span>
                    </template>
                  </p>
                </template>
              </div>
            </template>
            <!-- 多层题 006 -->
            <template v-if="item.Type == 0">
              <p :class="pItem.Name == '注意事项：' ? 'attentionTip' : ''" v-if="item.Mark != 'DoctorTips' && item.Mark != 'DoctorSignature' && item.Mark != 'PatientSignature'" :style="item.Mark == 'Warning'? 'color: red' : ''">{{ item.Name }}</p>
              <div class="autograph" v-if="item.Mark == 'PatientSignature'">
                <p>患者/填报人签名：</p>
                <p class="autographImg" class="toSignature" @click="toSignature">
                  <img v-if="autographImg" :src="autographImg" alt="">
                </p>
              </div>
              <div
                class="moreFont childItem"
                v-for="(cIndex, cItem) in item.NextList"
                :key="cIndex">
                <!-- 多层填空 -->
                <template v-if="cItem.Type == 1">
                  <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                  <input v-model="cItem.Context" type="text" class="itemInput itemInputOther" />
                </template>
                <!-- 多层单选 -->
                <template v-if="cItem.Type == 2">
                  <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                  <input
                    type="text"
                    v-model="cItem.Context"
                    v-if="cItem.Name == '其他'"
                    class="itemInput cInput" />
                  <div class="check" v-bind:style="'display: block;'">
                    <p v-for="(cnIndex, cnItem) in cItem.OptionList" :key="cnIndex" >
                      <i @click="oneChoiceClick(pIndex, index, cIndex, 'NextList', cnIndex)"
                        class="iconfont"
                        :class="cnItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'">
                      </i>
                      <span :opid="cnItem.OptionId" :top="cnItem.TopicId">{{ cnItem.Name }}</span>
                      <input type="text" v-model="cnItem.Context" v-if="cnItem.Other" class="itemInput itemInputOther" />
                    </p>
                  </div>
                </template>
                <!-- 多层单选下 选择是 显示下一层 -->
                <template v-if="cItem.showNext">
                  <div class="moreFont cchildItem" v-for="(nIndex, nItem) in cItem.NextList" :key="nIndex">
                    <template v-if="nItem.Type == 1">
                      <span :opid="nItem.OptionId" :top="nItem.TopicId">{{ nItem.Name }}</span>
                      <input v-model="nItem.Context" type="text" class="itemInput cInput" />
                    </template>
                    <span>{{ nItem.Name }}</span>
                    <div class="check" v-bind:style="'display: block;'">
                      <p v-for="(nnIndex, nnItem) in nItem.OptionList" :key="nnIndex" >
                        <i @click="oneChoiceClick(pIndex, index, cIndex, 'NextListOption', nIndex, nnIndex)"
                          class="iconfont"
                          :class="nnItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                        <span :opid="nnItem.OptionId" :top="nnItem.TopicId">{{ nnItem.Name }}</span>
                        <input
                          type="text"
                          v-model="nnItem.Context"
                          v-if="nnItem.Other"
                          class="itemInput cInput itemInputOther"
                        />
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
          <!-- 多文本  007 -->
          <div v-if="pItem.Type == 4">
            <textarea class="quesTextarea" v-model="pItem.Context"></textarea>
          </div>

          <!-- 多选 105 -->
          <div class="moreFont quesItem" v-for="(index, item) in pItem.OptionList" :key="index" >
            <div class="check">
              <i @click="anyChoiceClick(pIndex, index)" class="iconfont" :class="item.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'" ></i>
              {{ item.Name }}
              <input type="text" v-model="item.Context" v-if="item.Other && item.OtherSort" class="itemInput cInput itemInputOther" />
              <span :opid="item.OptionId" :top="item.TopicId">{{ item.OptionName }}</span>
              <input type="text" v-model="item.Context" v-if="item.Other && !item.OtherSort" class="itemInput cInput itemInputOther" />
              <span>{{item.OtherDescribe}}</span>
            </div>
          </div>
        </div>
      <div class="subBox">
        <span @click="submitThis">提交</span>
      </div>
    </div>
    <div class="resultContainer" v-if="resultShow">
      <div class="rightBox" v-if="rightShow">
        <div class="iconBox">
          <!-- <van-icon name="checked" /> -->
        </div>
        <p>提交成功!!</p>
      </div>
      <div class="errorBox" v-if="!rightShow">
        <div class="iconBox">
          <!-- <van-icon name="clear" /> -->
        </div>
        <p>提交失败!!</p>
        <!-- <div class="btnBox">
          <span>重新填写</span>
        </div> -->
      </div>
    </div>
    <signature v-if="showSignature" @handlegoback="handleGoBack" @handlesubmit="handleSubmit"></signature>
  </div>
</template>
<script>
import areaList from '../../assets/js/area.js'
// import { mapActions } from 'vuex'
import signature from '../../components/signature'
import {
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast,
  setRegPoint,
  showAlert
} from '../../vuex/actions'
import $ from 'jquery'

export default {
  name: 'healthQuestion',
  data () {
    return {
      PatientInfo: {
        PatientId: (this.$route.query.patientId || this.$route.query.patientid) || '',
        AnswerList: '' // 登记信息
      },
      // 渲染web list
      questionList: [], // 使用到
      questionRender: [], // 使用到
      afterData: [],
      questionTitle: '', // 使用到
      Statement: '', // 使用到
      toastArr: [], // 使用到,错误提示
      resultShow: false,
      rightShow: false,
      resultMsg: '',
      cardInfo: {}, // 默认卡的信息
      hosp: { // 获取主站信息
        H5BaseAddress: ''
      },
      areaprovince: areaList.province_list,
      areacity: {},
      areacounty: {},
      areadata: {
        p: 0,
        c: 0,
        a: 0
      },
      // 公共状态码
      commcode: {
        // 国籍
        NationalityList: [],
        // 户籍地（省一级）
        HouseholdDivisionList: [],
        // 证件类型
        IdentityTypeList: [],
        // 人员来源
        PersonSourceList: [],
        // 人员身份
        PersonIdentityList: [],
        // 参保类型
        InsuranceTypeList: [],
        // 险种
        InsuranceCategoryList: []
      },
      identype2: '',
      idenno2: '',
      departName: '',
      area: [],
      showAddress: false,
      type: '',
      toa: false,
      risk: false,
      autographImg: '',
      showSignature: false
    }
  },
  components: {
    'signature': signature
  },
  created () {
    // 获取公共状态码
    // this.getCommonCoding()
    this.getcard()
    // this.gethospadmin()
    console.log('保存信息', this.order)
    this.departName = this.$route.query.departName || ''
    this.type = this.$route.query.type || ''
  },
  computed: {
  },
  watch: {
    questionList: {
      handler: function (val, oldVal) {
        if (this.questionRender.length > 0) {
          this.questionList = this.questionRender
        }
      },
      deep: true
    }
  },
  methods: {
    // 查找卡
    getcard () {
      let self = this
      self.$ajax.get('GetAll', 'Card', {}).then(res => {
        res.Cards = res.Cards.map(item => {
          let oItem = {
            Cellphone: item.Cellphone,
            IdenNo: item.IdenNo,
            PatientId: item.PatientId,
            id: item.Id,
            name: item.Name,
            isDefault: item.IsDefault
          }
          return oItem
        })
        if (self.PatientInfo.PatientId !== '') {
          self.cardInfo = res.Cards.find(x => x.PatientId === self.PatientInfo.PatientId)
        } else {
          self.cardInfo = res.Cards.find(x => x.IsDefault)
          if (!self.cardInfo) {
            self.cardInfo = res.Cards[0]
          }
        }
        self.cardInfo = self.cardInfo || {}
        if (self.cardInfo.id > 0) {
          self.PatientInfo.PatientId = self.cardInfo.PatientId
        }
        this.getInfo()
        console.log('获取就诊卡：', self.cardInfo, self.PatientInfo.PatientId)
      })
    },
    // 获取问卷信息
    getInfo () {
      let self = this
      let params = {
        EditionType: 1
      }
      self.showLoadingToast({ msg: '加载中...' }, false)
      // 我们服务器
      // self.$ajax.get('GetTopicList', 'HealthQuestion', params).then(res => {
      // 调用His接口
      self.$ajax.get('GetRegLastDetail', 'HealthQuestion', { editionType: 1 }).then(res => {
        if (res.TopicList.length === 0) {
          self.$ajax.get('GetTopicList', 'HealthQuestion', params).then(res => {
            self.questionTitle = res.Title
            self.Statement = res.Statement
            // 格式化数据
            self.questionList = self.formatQuestionData(res.TopicList)
            self.hideLoadingToast()
          })
        } else {
          self.Statement = res.Statement
          // 格式化数据
          self.questionList = res.TopicList
          for (let i in self.questionList) {
            if (self.questionList[i].Mark === 'Title') {
              self.questionTitle = self.questionList[i].Name
            }
            if (self.questionList[i].Name === '基本信息') {
              for (let k in self.questionList[i].NextList) {
                let kItem = self.questionList[i].NextList[k]
                if (kItem.Mark === 'PatientName') {
                  kItem.Context = self.cardInfo.name || ''
                } else if (kItem.Mark === 'IdenNo') {
                  kItem.Context = self.cardInfo.IdenNo || ''
                } else if (kItem.Mark === 'Phone') {
                  kItem.Context = kItem.Context || self.cardInfo.Cellphone || ''
                } else if (kItem.Mark === 'Depart') {
                  kItem.Context = self.departName || ''
                } else if (kItem.Mark === 'RegDate') {
                  kItem.Context = self.order.regDt || self.dateFormat((new Date()), 'yyyy-MM-dd')
                } else if (kItem.Mark === 'IdenType') {
                  kItem.Context = kItem.Context || '身份证'
                }
              }
            }
          }
        }
        self.hideLoadingToast()
      })
    },
    // 单选
    oneChoiceClick (pIndex, index, cIndex, type, cnIndex, nItem) {
      // console.log(pIndex, index, cIndex, type, cnIndex, nItem)
      this.questionRender = []
      var $list = this.questionList
      let datas = $list[pIndex]
      let itemDatas = datas.NextList[index]
      let listIndex = cIndex
      if (type === 'NextList') {
        listIndex = cnIndex
        itemDatas = datas.NextList[index].NextList[cIndex]
        itemDatas.showNext = itemDatas.OptionList[listIndex].Name === '是'
      } else if (type === 'NextListOption') {
        itemDatas = datas.NextList[index].NextList[cIndex].NextList[cnIndex]
        listIndex = nItem
      } else {
      }
      if (itemDatas.OptionList[listIndex].Seleted) {
        return
      }
      let item = itemDatas.OptionList
      for (let i in item) {
        if (Number(i) !== listIndex) {
          item[i].Seleted = false
        }
      }
      itemDatas.OptionList[listIndex].Seleted = true
      if (itemDatas.OptionList[listIndex].OptionId === 13 && itemDatas.OptionList[listIndex].TopicId === 16) {
        this.showAddress = true
      } else {
        this.showAddress = true
      }
      this.questionRender = $list
      this.questionList = []

      // this.questionList[pIndex].NextList[index].OptionList[cIndex].Seleted = true
      // this.$set(itemDatas.OptionList[listIndex], 'is', true)

      // datas.paperAnswner.selectIds = datas.items[cIndex].id
      // datas.paperAnswner.questionId = datas.id
      // this.$forceUpdate()
    },
    // 多选
    anyChoiceClick (pIndex, index, cIndex) {
      this.questionRender = []
      var $list = this.questionList
      if (cIndex !== undefined) {
        $list[pIndex].NextList[index].OptionList[cIndex].Seleted = !$list[pIndex].NextList[index].OptionList[cIndex].Seleted
      } else {
        // 东升医院特殊处理
        if (this.hospId === 'dsyy') {
          if ($list[pIndex].OptionList[index].isSelete) {
            $list[pIndex].OptionList[index].Seleted = !$list[pIndex].OptionList[index].Seleted
          }
          var i = 0
          // var asympt = $list[pIndex].OptionList.find(x=> x.Mark === 'Asymptomatic') || null
          // 无症状处理
          if ($list[pIndex].OptionList[index].Mark === 'Asymptomatic' && $list[pIndex].OptionList[index].Seleted) {
            for (i = 0; i < $list[pIndex].OptionList.length; i++) {
              if (i !== index) {
                $list[pIndex].OptionList[i].isSelete = false
                $list[pIndex].OptionList[i].Seleted = false
              }
            }
          } else if ($list[pIndex].OptionList[index].Mark === 'Asymptomatic' && !$list[pIndex].OptionList[index].Seleted) {
            for (i = 0; i < $list[pIndex].OptionList.length; i++) {
              if (i !== index) {
                $list[pIndex].OptionList[i].isSelete = true
              }
            }
          }
        } else {
          $list[pIndex].OptionList[index].Seleted = !$list[pIndex].OptionList[index].Seleted
        }
      }
      // this.$forceUpdate()
      this.questionRender = $list
      this.questionList = []
    },
    // 提交
    submitThis () {
      this.toastArr = []
      this.afterData = []
      let phone = ''
      let self = this
      let IdenNo = ''
      let IdenType = ''
      self.getResult(self.questionList)
      // if (self.toa) {
      //   self.showAlert({
      //     title: '温馨提示',
      //     msg: '无7天内核酸检测结果，请挂发热门诊就诊',
      //     btnText: '确定'
      //   }).then(function () {
      //     self.$router.go({ name: 'portal' })
      //   })
      //   return false
      // }
      // if (self.risk) {
      //   self.showAlert({
      //     title: '温馨提示',
      //     msg: '涉及高风险人群，请选择发热门诊挂号',
      //     btnText: '确定'
      //   }).then(function () {
      //     self.$router.go({ name: 'portal' })
      //   })
      //   return false
      // }
      for (let to in self.toastArr) {
        self.showCommonToast({ msg: self.toastArr[to] })
        // this.$toast(this.toastArr[to])
        return false
      }
      // 根据this.afterData得到证件类型和证件号进行判断
      for (var i in this.afterData) {
        if (this.afterData[i].Mark === 'Phone') {
          phone = this.afterData[i].Answer
        }
        if (this.afterData[i].Mark === 'IdenNo') {
          IdenNo = this.afterData[i].Answer
        }
        if (this.afterData[i].Mark === 'IdenType') {
          IdenType = this.afterData[i].Answer
        }
      }
      if (IdenType === '') {
        this.showCommonToast({ msg: '请选择证件类型' })
        return
      }
      console.log(IdenType)
      if (IdenType === '身份证') {
        // 进行身份证号判断
        if (!this.checkUserInput(IdenNo)) {
          return
        }
      }
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        this.showCommonToast({ msg: '联系电话格式有误，请重新填写' })
        return
      }
      // if (!this.autographImg) {
      //   this.showCommonToast({ msg: '请签名' })
      //   return
      // }

      // this.PatientInfo.AnswerList = JSON.stringify(this.afterData)
      self.showLoadingToast({ msg: '正在提交...' }, false)
      this.PatientInfo.AnswerList = this.afterData
      this.PatientInfo.EditionType = 1
      console.log('获取就诊卡1111：', this.PatientInfo)
      // 调用His接口
      self.$ajax.post('SaveQuestion', 'HealthQuestion', {}, this.PatientInfo).then(res => {
        // self.resultShow = true
        if (res.ResultCode === '0') {
          self.$router.go({ name: 'doReg' })
          // self.saveImg(res.PatientRegId)
        } else if (res.ResultCode === '-1') {
          self.showCommonToast({ msg: res.ResultMsg })
          self.hideLoadingToast()
        } else {
          self.showCommonToast({ msg: res.ResultMsg })
          self.hideLoadingToast()
        }
      })
    },
    // 提交后获取
    getResult (arr) {
      let answerObj = {}
      let toastName = ''
      let result = []
      let self = this
      for (let i in arr) {
        let oneItem = arr[i]
        if (oneItem.Type === 1 || oneItem.Type === 5 || oneItem.Type === 6) {
          if (oneItem.Seleted || oneItem.Context !== '') {
            answerObj.Answer = oneItem.Context
            answerObj.TopicId = oneItem.TopicId
            answerObj.OptionId = 0
            answerObj.Selected = false
            answerObj.Type = oneItem.Type
            answerObj.Mark = oneItem.Mark
            answerObj.Required = oneItem.Required
            this.afterData.push(answerObj)
            answerObj = {}
          }
          if (oneItem.Required && !oneItem.Context) {
            result.push(oneItem.Seleted)
          }
          if (result.length > 0 && !result.includes(true)) {
            toastName = `请填写${oneItem.Name}`
            this.toastArr.push(toastName)
          }
          result = []
        } else {
          for (let k in oneItem.OptionList) {
            let kItem = oneItem.OptionList[k]
            if (oneItem.Required) {
              result.push(kItem.Seleted)
            }
            if (oneItem.Type === 2 && self.type === 'reg') {
              if (Number(kItem.Context) > 37.3 && kItem.Seleted) {
                self.toa = true
                // if (self.departName.includes('发热') || self.departName.includes('儿科')) {
                //   self.toa = false
                // }
              }
              // if (oneItem.Mark === 'Question2' || oneItem.Mark === 'Question3' || oneItem.Mark === 'Question4' || oneItem.Mark === 'Question5') {
              //   if (kItem.Name === '是' && kItem.Seleted && !self.departName.includes('发热')) {
              //     self.risk = true
              //   }
              // }
            }
            if (kItem.Seleted || kItem.Context !== '') {
              answerObj.Answer = kItem.Context
              answerObj.TopicId = kItem.TopicId
              answerObj.OptionId = kItem.OptionId
              answerObj.Selected = kItem.Seleted
              answerObj.Type = kItem.Type
              answerObj.Mark = kItem.Mark
              answerObj.Required = kItem.Required
              this.afterData.push(answerObj)
              answerObj = {}
              continue
            }
          }
          if (result.length > 0 && !result.includes(true)) {
            toastName = `请勾选${oneItem.Name}`
            this.toastArr.push(toastName)
          }
          result = []
          if (oneItem.NextList) {
            this.getResult(oneItem.NextList)
          }
        }
      }
      // console.log('==========')
      // console.log(this.afterData)
    },
    // 格式化数据
    formatQuestionData (arr) {
      // let self = this
      var resultList = []
      for (let i in arr) {
        let oneItem = arr[i]
        oneItem.Seleted = false
        oneItem.Context = ''
        oneItem.inputFont = false
        oneItem.isSelete = true
        if (oneItem.Mark === 'PatientName') {
          oneItem.Context = this.cardInfo.name || ''
          // if (oneItem.Context !== '') {
          //   oneItem.inputFont = true
          // }
          // oneItem.inputFont = this.$route.query.patientName !== undefined || !this.$route.query.patientName
        } else if (oneItem.Mark === 'IdenNo') {
          oneItem.Context = this.cardInfo.IdenNo || ''
        } else if (oneItem.Mark === 'Phone') {
          oneItem.Context = this.cardInfo.Cellphone || ''
        } else if (oneItem.Mark === 'IdenType') {
          oneItem.Context = oneItem.Context || '身份证'
        }
        if (oneItem.Mark === 'Depart') {
          oneItem.Context = this.departName || ''
          // if (oneItem.Context !== '') {
          //   oneItem.inputFont = true
          // }
          // oneItem.inputFont = this.$route.query.patientName !== undefined || !this.$route.query.patientName
        }
        for (let k in oneItem.OptionList) {
          let kItem = oneItem.OptionList[k]
          kItem.Seleted = false
          kItem.Context = ''
          kItem.inputFont = false
          kItem.isSelete = true
        }
        if (oneItem.NextList) {
          this.formatQuestionData(oneItem.NextList)
        }
        resultList.push(oneItem)
      }
      return resultList
    },
    // 时间格式化
    dateFormat (dt, fmt) {
      var o = {
        'M+': dt.getMonth() + 1, // 月份
        'd+': dt.getDate(), // 日
        'h+': dt.getHours() % 12 === 0 ? 12 : dt.getHours() % 12, // 小时
        'H+': dt.getHours(), // 小时
        'm+': dt.getMinutes(), // 分
        's+': dt.getSeconds(), // 秒
        'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
        'S': dt.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    // 选择卡
    selectCard: function () {
      // this.$router.go({ name: 'manageHealthCard' })
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    checkUserInput: function (idenNo) {
      // 加权因子
      var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
      // 身份证验证位值.10代表X
      var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

      var IdCardValidate =
        function (idCard) {
          // 去掉字符串头尾空格
          idCard = idCard.trim().replace(/ /g, '')
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

          if (aIdCard[17].toString().toUpperCase() === 'X') {
            // 将最后位为x的验证码替换为10方便后续操作
            // 最后一位为X时,要大写
            if (aIdCard[17].toString() === 'X') {
              aIdCard[17] = 10
            } else {
              return false
            }
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
      if (IdCardValidate(idenNo) === '') {
        console.log(idenNo)
        this.showCommonToast({ msg: '身份证号格式错误,请重新输入' })
        return false
      }
      return true
    },
    checkUserInput1: function () {
      // 回乡证格式判断
      var idCard = this.idenno2
      // 去掉字符串头尾空格
      idCard = $.trim(idCard.replace(/ /g, ''))
      // 规则为H（M）+8位或10位阿拉伯数字
      var reg = /^[HM]\d{8,10}$/.test(idCard)
      if (!reg) {
        this.showCommonToast({ msg: '回乡证格式错误,请重新输入' })
        return false
      }
      if (idCard.length === 10) {
        this.showCommonToast({ msg: '回乡证格式错误,请重新输入' })
        return false
      }
      return true
    },
    checkUserInput2: function () {
      // 判断台胞证格式
      // 规则:为8位阿拉伯数字。
      var idcard = this.idenno2
      idcard = $.trim(idcard.replace(/ /g, ''))
      var reg = /^\d{8}$/.test(idcard)
      if (!reg) {
        this.showCommonToast({ msg: '台胞证格式错误,请重新输入' })
        return false
      }
      return true
    },
    checkUserInput3: function () {
      // 判断出生医学证明格式
      // 规则:1位字母大写+9位数字。
      var idCard = this.idenno2
      // 去掉字符串头尾空格
      idCard = $.trim(idCard.replace(/ /g, ''))
      var reg = /^[A-Z]\d{9}$/.test(idCard)
      if (!reg) {
        this.showCommonToast({ msg: '出生医学证明填写不符合规范，请填写证件上的1位字母大写+9位数字' })
        return false
      }
      return true
    },
    // 选择省
    selpro: function (ele, pIndex, index) {
      var that = this
      that.selareahandle(pIndex, index)
      let bval = parseInt(ele.target.value)
      let enval = bval + 10000
      let obj = areaList.city_list
      that.areacity = {}
      Object.keys(obj).forEach(function (key) {
        if (key > bval && key < enval) {
          that.areacity[key] = obj[key]
        }
      })
      console.log('城市', that.areacity)
      that.areadata.p = bval
      that.areadata.c = 0
      that.areadata.a = 0
    },
    // 选择城市
    selcity: function (ele, pIndex, index) {
      var that = this
      that.selareahandle(pIndex, index)
      let bval = parseInt(ele.target.value)
      let enval = bval + 100
      let obj = areaList.county_list
      that.areacounty = {}
      Object.keys(obj).forEach(function (key) {
        if (key > bval && key < enval) {
          that.areacounty[key] = obj[key]
        }
      })
      console.log('地区', that.areacounty)
      that.areadata.c = bval
      that.areadata.a = 0
    },
    // 选择地区
    selarea: function (ele, pIndex, index) {
      var that = this
      that.selareahandle(pIndex, index)
      let bval = parseInt(ele.target.value)
      that.areadata.a = bval
      var $list = that.questionList
      let provinceName = that.areaprovince[that.areadata.p] || null
      let cityName = that.areacity[that.areadata.c] || null
      let countyName = that.areacounty[bval] || null
      if (!provinceName || !cityName || !countyName) {
        console.log('默认值为空，不做处理')
      } else {
        $list[pIndex].NextList[index].Context = provinceName + cityName + countyName
        that.PatientInfo.area = that.areadata.p + '@' + that.areadata.c + '@' + that.areadata.a
      }
    },
    // 选择处理
    selareahandle: function (pIndex, index) {
      var that = this
      var $list = that.questionList
      $list[pIndex].NextList[index].Context = ''
    },
    toSignature () {
      if (this.autographImg) {
        return
      }
      this.showSignature = true
    },
    handleGoBack () {
      this.showSignature = false
    },
    handleSubmit (data) {
      console.log(data)
      this.autographImg = data
      this.showSignature = false
    },
    saveImg (id) {
      let self = this
      self.$ajax.post('SaveImagesTwo', 'ImgFile', {}, { baseImg: self.autographImg, patientRegId: id }).then(res => {
        // self.resultShow = true
        self.hideLoadingToast()
        if (res.ResultCode === '0') {
          if (self.type === 'reg' && self.order.timeSlice !== '' || self.order.timeSlice) {
            self.$router.go({ name: 'doReg' })
          } else {
            this.$router.replace({ name: 'healthQuestionInfo', query: { id } })
          }
        } else {
          // self.rightShow = false
          // self.resultMsg = res.ResultMsg
          self.showCommonToast({ msg: res.ResultMsg })
        }
      })
    }
  },
  vuex: {
    getters: {
      order: ({ regOrder }) => regOrder,
      cards: ({ card }) => card.cards
    },
    actions: {
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast,
      setRegPoint,
      showAlert
    }
  }
}
</script>
<style>
@import url("../../assets/css/alifont.css");
.paperContainer {
  padding: 0.4rem;
  font-size: 0.3rem;
}
.colorRed {
  color: red;
}
.questionTitle {
  padding: 0.4rem 0rem;
}
.questionTitle h2 {
  font-weight: 600;
  font-size: 0.32rem;
  line-height: 0.4rem;
  margin-bottom: 0.1rem;
}
.oneTitle {
  font-weight: 600;
  text-align: left;
  margin: 0.15rem 0;
  line-height: 0.5rem;
}
.iconfont {
  font-size: 0.4rem;
}
.moreFont {
  line-height: 0.54rem;
  text-align: left;
}
.moreFont .itemInput {
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
}
.moreFont .check p {
  margin: 0 0.2rem;
}
.checkFlex {
  display: flex;
  margin-left: 2em;
}
.childItem {
  text-indent: 2em;
}
.cchildItem {
  text-indent: 4em;
}
.cInput {
  width: 2rem;
}
.quesItem {
  /* display: flex; */
  justify-items: flex-start;
  line-height: 0.54rem;
  text-align: left;
}
.quesItem .itemInput {
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
}
.quesItem .check p {
  display: inline-block;
  margin: 0 0.2rem;
}
.yourself p {
  display: inline-block;
}
.yourself p i {
  padding: 0 4px;
}
.manDate {
  text-align: right;
  line-height: 0.6rem;
}
.manDate .itemInput {
  border-bottom: 1px solid #ccc;
}
.subBox {
  margin: 0.4rem;
  text-align: center;
}
.subBox span {
  display: inline-block;
  padding: 0.3rem 0;
  width: 70%;
  background: #0e72de;
  color: #fff;
  border-radius: 6px;
}
.subBox span {
  display: inline-block;
  padding: 0.3rem 0;
  width: 70%;
  background: #0e72de;
  color: #fff;
  border-radius: 6px;
  text-align: center;
}
.resultContainer {
  padding: 1rem 0;
  text-align: center;
}
.resultContainer .rightBox .van-icon {
  font-size: 1.2rem;
  color: #15a015;
}
.resultContainer .errorBox .van-icon {
  font-size: 1.2rem;
  color: red;
}
.resultContainer p {
  margin-top: 0.2rem;
  font-size: 0.4rem;
}
.resultContainer .btnBox span {
  width: 50%;
  padding: 10px 0;
  display: inline-block;
  background: #0e72de;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  margin-top: 0.4rem;
  font-size: 0.3rem;
}
.quesTextarea {
  width: 100%;
  border-color: #ccc;
  border-radius: 5px;
  padding: 6px;
  box-sizing: border-box;
  resize: none;
}
.itemInputType {
  width: 100%;
  height: 30px;
  border-radius: 3%;
  border: 1px solid #e3dbdb;
  text-indent: 0.2em;
}
.itemInputOther {
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
  background-color: #f5f5f9;
  width: 8em;
  text-indent: 0.3em;
}
input,
select {
  background-color: #f5f5f9;
}
.moreFontBottom {
  margin-bottom: 0.5em;
}
.required-inp {
  color: #ff0000;
  position: absolute;
  left: 0.7em;
}
.icon-duoxuankuang2 {
  color: #0e72de;
}
.imgBox {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.uploadBox {
  width: 60px;
}
.previewImgBox {
  display: flex;
  flex-wrap: wrap;
}
.previewImgBox .imgItem {
  width: 60px;
  height: 60px;
  position: relative;
  margin-right: 15px;
  margin-bottom: 20px;
}
.imgItem i {
  position: absolute;
  top: -10px;
  right: 0;
  font-size: 22px;
  color: red;
}
.imgItem img {
  width: 60px;
  height: 60px;
}

.uploadImgContainer {
  height: 58px;
  background: #fff9f4;
  border: 1px dashed #969798;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #e68a41;
}
.uploadImgContainer i {
  width: 18px;
  height: 14px;
}
.uploadImgContainer span {
  font-size: 14px;
}
.uploadImgContainer input {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;
  z-index: 2;
}
.autograph {
  display: flex;
  align-items: baseline;
  /* margin-top: 20px; */
}
.autograph p:first-child {
  width: 9em;
}
.autograph .autographImg {
  flex: 1;
  border-bottom: 1px solid #ccc;
  min-height: 20px;
}
.autograph .autographImg img {
  width: 100%;
}
.attentionTip {
  font-size: 14px;
  color: #717171;
}
</style>
