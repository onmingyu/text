<template>
  <div class="container">
    <div v-show="!showNoRecord">
      <div v-show="showDetail">
        <div class="weui_cells_title">下单时间：{{createDt}}</div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                <span class="info">{{patientName}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
                <!-- <span class="info">{{patientNo}}</span> -->
                <p style="text-align: center">
                <img id="barcode" />
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
                <span class="info">{{OrderNo}}</span>
                <!-- <p style="text-align: center">
                <img id="barcodeCard" /> -->
              </p>
            </div>
          </div>
        </div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
                <span class="info">{{sex}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>
                <span class="info">{{phone1}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>
                <span class="info">{{addrr}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">登记时间</span>
                <span class="info">{{createTime}}</span>
              </p>
            </div>
          </div>
          <!-- <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">采样状态</span>
                <span class="info" v-if="CJBZ === '1'">已采样</span>
                <span class="info" v-else>未采样</span>
              </p>
            </div>
          </div>
          <div class="weui_cell" v-show="CJBZ === '1'">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">采样时间</span>
                <span class="info">{{getTime}}</span>
              </p>
            </div>
          </div> -->
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">登&nbsp&nbsp记&nbsp&nbsp号</span>
                <span class="info">{{djid}}</span>
              </p>
              <!-- <p style="text-align: center">
                <img id="barcode" />
              </p> -->
            </div>
          </div>
            <div class="weui_cell"  @click="gethsID()">
              <div class="weui_cell_hd">
                <label class="label">核酸条码</label>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <input class="weui_input" v-model="hsId"  style="color: #a5a5a5; padding-left: 15px;height:44px;font-size:14px;"  placeholder="点击扫码" readonly="readonly">
              </div>
              <div class="weui_cell_ft">
                 [ — ]
              </div>
            </div>
        </div>
      </div>
      <!-- <div class="weui_opr_area" v-show="showhsId">
        <p class="weui_btn_area">
          <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">保存</a>
        </p>
      </div> -->
    </div>
    <div v-show="showNoRecord">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">找不到挂号单</h2>
          <p class="weui_msg_desc">
            该挂号单不存在或已退号
          </p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
          </p>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
span.label {
  display: inline-block;
  width: 80px;
}

span.info {
  color: #0ae;
}

.weui_icon_warn.weui_icon_msg:before {
  color: #a5a5a5;
}
</style>
<script>
import JsBarcode from '../../assets/lib/jsbarcode/jsbarcode'
import {
  showConfirm,
  showLoadingToast,
  hideLoadingToast,
  showAlert
} from '../../vuex/actions'
import wx from 'weixin-js-sdk'

export default {
  name: 'doDnaOrderDetail',
  vuex: {
    actions: {
      showConfirm,
      showLoadingToast,
      hideLoadingToast,
      showAlert
    }
  },
  data: function () {
    return {
      id: -1,
      addrr: '',
      CJBZ: '',
      createTime: '',
      djid: '',
      getTime: '',
      patientName: '',
      patientNo: '',
      phone1: '',
      Phone2: '',
      sex: '',
      OrderNo: '',
      showDetail: true,
      showNoRecord: false,
      showhsId: false,
      hsId: ''
    }
  },
  methods: {
    gethsID: function () {
      var self = this
      wx.ready(function () {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            self.hsId = res.resultStr.split(',')[1]
            self.showhsId = true
            self.getOrderDetail()
          },
          error: function (err) {
            console.log(err)
          }
        })
      })
    },
    getOrderDetail: function () {
      var self = this
      this.showLoadingToast({msg: '正在获取...'}, false)
      this.$ajax.get('GetQueryDna', 'Dna', { orderId: this.id, hsId: this.hsId }).then(function (data) {
        if (data.ResultCode === '0') {
          if (data.Orders !== null) {
            self.OrderNo = data.Orders[0].OrderNo
            // JsBarcode('#barcodeCard', data.Orders[0].OrderNo, {
            //   format: 'CODE128',
            //   displayValue: true,
            //   fontSize: 24,
            //   lineColor: '#000',
            //   height: 66,
            //   textAlign: 'center'
            // })
          }
          if (data.datalist === null) {
            return
          }
          self.addrr = data.datalist[0].addrr
          self.CJBZ = data.datalist[0].CJBZ
          self.createTime = data.datalist[0].createTime
          self.djid = data.datalist[0].djid
          self.getTime = data.datalist[0].getTime
          self.patientName = data.datalist[0].patientName
          self.patientNo = data.datalist[0].patientNo
          JsBarcode('#barcode', data.datalist[0].patientNo, {
            format: 'CODE128',
            displayValue: true,
            fontSize: 24,
            lineColor: '#000',
            height: 66,
            textAlign: 'center'
          })
          self.phone1 = data.datalist[0].phone1
          self.Phone2 = data.datalist[0].Phone2
          self.sex = data.datalist[0].sex
          self.hsId = data.datalist[0].HsId
          self.hideLoadingToast()
        } else {
          self.hideLoadingToast()
          self.showNoRecord = true
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    }
  },
  ready: function () {
    this.id = this.$route.query.orderId
    this.getOrderDetail()
  }
}
</script>
