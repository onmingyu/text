<template>
  <div class="paperContainer">
    <div class="contentContainer">
      <div v-if="regExpired">
        <div class="weui_cells weui_cells_access" style="margin-top:0;">
          <div class="weui_cell" style="height: 4rem;">
            <div id="qrcode" style="margin: 0 auto;"></div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">姓名</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.name}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">卡号</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.patientId}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">电话</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.phone}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">身份证号</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.idenNo}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">填表日期</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.createDate}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">预约就诊日期</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.writeDate}}
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">有效期</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              {{regInfo.expirationDate}}&nbsp;前
            </div>
          </div>
        </div>
        <div class="weui_cells weui_cells_access">
          <div class="weui_cell" v-on:click="viewInfo">
            <div class="weui_cell_bd weui_cell_primary">
              <p class="am-ft-sm">查看明细</p>
            </div>
            <div class="weui_cell_ft am-ft-sm">
              &nbsp;
            </div>
          </div>
        </div>

        <div class="" style="font-size: 0.8em; padding: 0.5em; color: #FF0000;" v-if="hospId == 'dsyy'">
          <span>温馨提醒：</span>
          <span>我院未设发热门诊，体温超过37.3℃患者请勿网上挂号。</span>
        </div>
      </div>
      <div v-else>
        <article class="weui_article" id="weui_article" style="position: absolute; top: 20%; width: 100%; padding: 0; left: 0;">
          <section>
            <p>
            <span style="display: block; text-align: center;">
              <img src="../../assets/img/none01.png" style="width:150px;" />
            </span>
            <p>&nbsp;</p>
            <!-- <p>&nbsp;</p> -->
            <p style="text-align: center; text-indent: 0em;">还未获取通行证或通行证已过期</p>
            <!-- <p>&nbsp;</p> -->
            <p>&nbsp;</p>
          </section>
        </article>
      </div>
      <div class="questionContent" v-if="IsInfo" id="imgBox">
        <div v-for="(pIndex, pItem) in questionList" :key="pIndex">
          <div class="oneTitle">{{pItem.Name}}</div>
          <div
            v-for="(index, item) in pItem.NextList"
            :class="item.Type == 3 || item.Mark == 'Sex' ? 'quesItem' :'moreFont'"
            :key="index">
            <!-- <div>{{showData(item)}}</div> -->
            <!-- 填空 001 1填空 5下拉框 6时间控件-->
            <template v-if="item.Type == 1 || item.Type == 5 || item.Type == 6">
              <div>
                <div>{{ item.Name }}</div>
                <div class="div-text">
                  <template v-if="item.TopicId == 51">
                    {{item.Context == 1 ? '上午' : '下午'}}
                  </template>
                  <template v-else>
                    {{item.Context}}
                  </template>
                </div>
              </div>
                <!-- <span>{{ item.Name }}</span>
                <input v-model="item.input" type="text" :disabled="item.inputFont" class="itemInput" /> -->
            </template>
            <!-- 单选 004 -->
            <template v-if="item.Type == 2">
              <!-- 性别处理 -->
              <div class="check" v-if="item.Mark == 'Sex'">
                <div>{{ item.Name }}</div>
                <template v-for="(cIndex, cItem) in item.OptionList">
                  <div :key="cIndex" style="display: inline-block; margin-right: 1em;">
                    <i class="iconfont" :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                  </div>
                </template>
              </div>
              <div class="check" v-else>
                <div>{{ item.Name }}</div>
                <template v-for="(cIndex, cItem) in item.OptionList">
                  <div :key="cIndex" style="display: inline-block; margin-right: 1em;">
                    <i class="iconfont" :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                    <span v-if="cItem.Other && cItem.OtherSort" class="itemInput itemInputOther" style="display: inline-block;">
                      {{cItem.Context}}&nbsp;
                    </span>
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                    <span v-if="cItem.Other && !cItem.OtherSort" class="itemInput itemInputOther" style="display: inline-block;">
                      {{cItem.Context}}&nbsp;
                    </span>
                    <span>{{cItem.OtherDescribe}}</span>
                  </div>
                </template>
              </div>
            </template>
            <!-- 上传 -->
            <template v-if="item.Type == 7">
              <!-- false竖排 true横排 -->
              <div>
                <div><span class="required-inp" v-if="item.Required">*</span>{{ item.Name }}</div>
                <div class="imgBox" v-if="item.Type == 7 && item.Context.length > 0">
                  <div class="previewImgBox" :id="'imgBox' + item.TopicId">
                    <div class="imgItem" v-for="imgItem in item.Context" :key="imgItem">
                      <img :src="imgItem" :data-original="imgItem" alt="">
                    </div>
                  </div>
                </div>
                <div class="zanwu" v-if="item.Context.length == 0">无图片</div>
              </div>
            </template>
            <!-- 多选 005 -->
            <template v-if="item.Type == 3">
              <div>{{ item.Name }}</div>
              <div class="check">
                <template v-for="(cIndex, cItem) in item.OptionList">
                  <div :key="cIndex" style="display: inline-block; margin-right: 1em;">
                    <i class="iconfont" :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                    <template v-if="cItem.Other && cItem.OtherSort">
                      <span>{{cItem.OtherDescribe}}</span>
                    </template>
                    <span v-if="cItem.Other && cItem.OtherSort" class="itemInput cInput itemInputOther" style="display: inline-block;">
                      {{cItem.Context}}&nbsp;
                    </span>
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                    <span v-if="cItem.Other && !cItem.OtherSort" class="itemInput cInput itemInputOther" style="display: inline-block;">
                      {{cItem.Context}}&nbsp;
                    </span>
                    <template v-if="cItem.Other && !cItem.OtherSort">
                      <span>{{cItem.OtherDescribe}}</span>
                    </template>
                  </div>
                </template>
              </div>
            </template>
            <!-- 多层题 006 -->
            <template v-if="item.Type == 0">
              <p :class="pItem.Name == '注意事项：' ? 'attentionTip' : ''" v-if="item.Mark != 'DoctorTips' && item.Mark != 'DoctorSignature' && item.Mark != 'PatientSignature'" :style="item.Mark == 'Warning'? 'color: red' : ''">{{ item.Name }}</p>
              <div class="autograph" v-if="item.Mark == 'PatientSignature'">
                <p>患者/填报人签名：</p>
                <p class="autographImg toSignature" class="">
                  <img v-if="item.Context" :src="item.Context" alt="">
                </p>
              </div>
              <div class="moreFont childItem" v-for="(cIndex, cItem) in item.NextList" :key="cIndex">
                <!-- 多层填空 -->
                <template v-if="cItem.Type == 1">
                  <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                  <span class="itemInput itemInputOther">{{cItem.Context}}</span>
                </template>
                <!-- 多层单选 -->
                <template v-if="cItem.Type == 2">
                  <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                  <span v-if="cItem.Other" class="itemInput cInput">{{cItem.Context}}&nbsp;</span>
                  <div class="check" v-bind:style="'display: flex;'">
                    <div v-for="(cnIndex, cnItem) in cItem.OptionList" :key="cnIndex" >
                      <i class="iconfont" :class="cnItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                      <span :opid="cnItem.OptionId" :top="cnItem.TopicId">{{ cnItem.Name }}</span>
                      <span v-if="cnItem.Other" class="itemInput itemInputOther" style="display: inline-block;">{{cnItem.Context}}&nbsp;</span>
                    </div>
                  </div>
                </template>
                <!-- 多层单选下 选择是 显示下一层 -->
                <template v-if="cItem.showNext">
                  <div class="moreFont cchildItem" v-for="(nIndex, nItem) in cItem.NextList" :key="nIndex">
                    <template v-if="nItem.Type == 1">
                      <span :opid="nItem.OptionId" :top="nItem.TopicId">{{ nItem.Name }}</span>
                      <input v-model="nItem.input" type="text" class="itemInput cInput" />
                    </template>
                    <span>{{ nItem.Name }}</span>
                    <div class="check" v-bind:style="'display: ' + (nItem.TypeSet?'flex':'block') +';'">
                      <p v-for="(nnIndex, nnItem) in nItem.OptionList" :key="nnIndex" >
                        <i class="iconfont" :class="nnItem.is ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                        <span :opid="nnItem.OptionId" :top="nnItem.TopicId">{{ nnItem.Name }}</span>
                        <input
                          type="text"
                          v-model="nnItem.input"
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
            <textarea class="quesTextarea" v-model="pItem.input"></textarea>
          </div>

          <!-- 多选 105 -->
          <div class="moreFont quesItem" v-for="(index, item) in pItem.OptionList" :key="index" >
            <div class="check">
              <i class="iconfont" :class="item.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'" ></i>
              {{ item.Name }}
              <span v-if="item.Other && item.OtherSort" class="itemInput cInput itemInputOther" style="display: inline-block;">{{item.Context}}&nbsp;</span>
              <span :opid="item.OptionId" :top="item.TopicId">{{ item.OptionName }}</span>
              <span v-if="item.Other && !item.OtherSort" class="itemInput cInput itemInputOther" style="display: inline-block;">{{item.Context}}&nbsp;</span>
              <span>{{item.OtherDescribe}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
// import Viewer from 'viewerjs'
// import areaList from '../assets/js/area'
// import { mapActions } from 'vuex'
import {
  showCommonToast,
  hideCommonToast,
  showLoadingToast,
  hideLoadingToast
} from '../../vuex/actions'
import QRCode from 'qrcodejs2'
export default {
  name: 'healthQuestion',
  data () {
    return {
      // 渲染web list
      questionList: [], // 列表
      regInfo: {
        name: '',
        phone: '',
        idenNo: '',
        createDate: '',
        writeDate: '',
        expirationDate: '',
        patientId: '',
      },
      questionTitle: '', // 标题
      regstatus: '', // 状态
      regExpired: true, // 是否有效
      // 二维码处理
      qrcode_colorDark: ['#000000', '#bf0707', '#10d05d', '#f5892d', '#666666'],
      IsInfo: false, // 是否查看明细
      id: (this.$route.query.Id || this.$route.query.id) || 0
    }
  },
  ready () {
    this.getInfo()
  },
  methods: {
    // 获取问卷信息
    getInfo () {
      let self = this
      let status = ''
      new Promise (resolve => {
        let params = {
          id: self.id,
          editionType: 1
        }
        self.showLoadingToast({ msg: '加载中...' }, false)
        // 我们服务器
        // self.$ajax.get('GetRegDetail', 'HealthQuestion', params).then(res => {
        // 调用His接口
        self.$ajax.get('GetRegDetail', 'HealthQuestion', params).then(res => {
          self.questionTitle = res.Title
          self.questionList = res.TopicList
          self.regExpired = res.Expired
          self.regInfo.name = res.RegInfo.Name
          self.regInfo.phone = res.RegInfo.Phone
          self.regInfo.idenNo = res.RegInfo.IdenNo
          self.regInfo.createDate = res.RegInfo.CreateDate
          self.regInfo.writeDate = res.RegInfo.WriteDate
          self.regInfo.expirationDate = res.RegInfo.ExpirationDate
          self.regInfo.patientId = res.RegInfo.PatientId
          for (let i in self.questionList) {
            let item = self.questionList[i]
            for (let k in item.NextList) {
              let Nitem = item.NextList[k]
              if (Nitem.Type === 7 && Nitem.Context) {
                Nitem.Context = Nitem.Context.split(';')
              }
              if (Nitem.Mark === 'Question1') {
                for (let j in Nitem.OptionList) {
                  if (Nitem.OptionList[j].Name === '是' && Nitem.OptionList[j].Seleted) {
                    if (Number(Nitem.OptionList[j].Context) > 37.3) {
                      status = 1
                    } else {
                      if (self.formateDate(self.regInfo.expirationDate) > 24) {
                        status = 3
                      } else {
                        status = 2
                      }
                    }
                  }
                  if (Nitem.OptionList[j].Name.includes('否') && Nitem.OptionList[j].Seleted) {
                    if (self.formateDate(self.regInfo.expirationDate) > 24) {
                      status = 3
                    } else if (self.formateDate(self.regInfo.expirationDate) < 24 && self.formateDate(self.regInfo.expirationDate) >= 0) {
                      status = 2
                    } else if (self.formateDate(self.regInfo.expirationDate) < 24) {
                      status = 4
                    }
                  }
                }
              }
            }
          }
          resolve(status)
          self.hideLoadingToast()
        })
      }).then((res) => {
      
        // 如果不加定时，会报：Cannot read property 'appendChild' of null
        // setTimeout(function () {
          // 在vue中 setTimeout 只执行一次
          // 生成二维码
          if (self.regExpired) {
            self.qrcode(res)
          }
        // }, 500)
      })
    },
    viewInfo () {
      if (this.IsInfo) {
        this.IsInfo = false
      } else {
        this.IsInfo = true
        this.$nextTick(() => {
          // const ViewerDom = document.getElementById('imgBox')
          // const viewer = new Viewer(ViewerDom, {
          //   url: 'data-original',
          //   title: false,
          //   show: function () {
          //     viewer.update()
          //   },
          //   hide: function () {
          //     viewer.destroy()
          //   }
          // })
        })
      }
    },
    // 生成二维码 # npm install --save qrcodejs2
    qrcode (status) {
      var that = this
      var _colorDark = that.qrcode_colorDark[status] || that.qrcode_colorDark[0]
      let text = that.regInfo.patientId
      // console.log('卡号',that.regInfo.patientId)
      let qrcode = new QRCode('qrcode', {
        width: 180,
        height: 180, // 高度
        text: text, // 二维码内容
        colorDark: _colorDark, // '#f0f', // 前景色
        colorLight: '#ffffff', // '#ff0', // 背景色
        correctLevel: QRCode.CorrectLevel.L // 容错等级
      })
      console.log(qrcode)
    },
    // 时间转换，将xxxx年xx月xx日转成xxxx-xx-xx
    formateDate (date) {
      let self = this
      // 现在时间
      let nowDate = new Date()
      var time = date
      // 时间转换，将xxxx年xx月xx日转成xxxx-xx-xx
      time = time.replace(/([年月])/g, '/')
      time = time.replace(/日/g, '')
      time = new Date(time)
      let cu = time.getTime() - nowDate.getTime()
      let hour = cu / 1000 / 3600
      return hour
    }
  },
  vuex: {
    actions: {
      showCommonToast,
      hideCommonToast,
      showLoadingToast,
      hideLoadingToast
    }
  }
}
</script>
<style>
/* @import '../../../node_modules/viewerjs/dist/viewer.css'; */
@import url("../../assets/css/alifont.css");
.paperContainer {
  padding: 0.4rem;
  font-size: 0.3rem;
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
.check p {
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
.check p {
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
    padding: .3rem 0;
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
input, select {
  background-color: #f5f5f9;
}
.moreFontBottom {
  margin-bottom: 0.5em;
}
.required-inp {
  color: #FF0000;
  position: absolute;
  left: 0.7em;
}

.div-text, .zanwu {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: auto;
  min-width: 10em;
  padding: 5px;
  border-radius: 5px;
  word-break: break-all;
  text-indent: 0;
}
.icon-duoxuankuang2 {
  color: #0e72de;
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

.autograph {
  display: flex;
  align-items: baseline;
  /* margin-top: 20px; */
}
.autograph p:first-child{
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
