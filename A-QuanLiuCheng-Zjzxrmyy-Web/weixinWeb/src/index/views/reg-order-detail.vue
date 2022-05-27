<template>
  <div class="container">
    <div v-show="!showNoRecord">
      <div v-show="showDetail">
        <div class="weui_cells_title">下单时间：{{createDt}}</div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">订单类型</span>
                <span class="info">{{type}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">订&nbsp;&nbsp;单&nbsp;&nbsp;号</span>
                <span class="info">{{num}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                <span class="info">{{cardName}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
                <!-- <span class="info">{{cardNo}}</span> -->
                <p style="text-align: center">
                <img id="barcodeCard" />
              </p>
              </p>
            </div>
          </div>
        </div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">就诊科室</span>
                <span class="info">{{deptName}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">医生科室</span>
                <span class="info">{{location}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生</span>
                <span class="info">{{doctorName}}</span>
              </p>
            </div>
          </div>
          <!--<div class="weui_cell">-->
            <!--<div class="weui_cell_bd weui_cell_primary">-->
              <!--<p>-->
                <!--<span class="label">号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</span>-->
                <!--<span class="info">{{regType}}</span>-->
              <!--</p>-->
            <!--</div>-->
          <!--</div>-->
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">就诊日期</span>
                <span class="info">{{regDate}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">侯诊时间</span>
                <span class="info">{{regTime}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">就&nbsp;&nbsp;诊&nbsp;&nbsp;号</span>
                <span class="info">{{visitNo}}</span>
              </p>
              <p style="text-align: center">
                <img id="barcode" />
              </p>
            </div>
          </div>
          <!--<div class="weui_cell">-->
            <!--<div class="weui_cell_bd weui_cell_primary">-->
              <!--<p>-->
                <!--<span class="label">排&nbsp;&nbsp;队&nbsp;&nbsp;号</span>-->
                <!--<span class="info">{{regNo}}</span>-->
              <!--</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="weui_cell">-->
            <!--<div class="weui_cell_bd weui_cell_primary">-->
              <!--<p>-->
                <!--<span class="label">就诊位置</span>-->
                <!--<span class="info">{{location}}</span>-->
              <!--</p>-->
            <!--</div>-->
          <!--</div>-->
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">总&nbsp;&nbsp;费&nbsp;&nbsp;用</span>
                <span class="info">{{sumFee}} 元</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="deptName.indexOf('越秀')>=0">
          <p style="padding:10px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
            <br /> 由于本院越秀院区停车位紧张，医院门前路段禁止停车并有交通电子警察拍摄。就诊请尽量乘坐公共交通，谢谢！
          </p>
        </div>
        <div v-if="deptName=='儿科门诊(番禺)'||deptName=='儿童保健科门诊(番禺)'||deptName=='产科门诊(番禺)'||deptName=='产前诊断门诊(番禺)'">
          <p style="padding:10px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
            <br /> 请提前15分钟到护士站
            <span style="color:red">报到确认</span>！因故迟到、未超过预约就诊时间30分钟者，报到确认后，按系统排在当前三位候诊患者之后就诊；迟到超过30分钟以上、未超过正常下班时间者，系统安排在本班次最后就诊或者退号后重新挂号排队就诊。请见门诊就诊秩序。
          </p>
        </div>
        <div v-if="canUnpickup">
          <p style="padding:10px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 退号注意事项：
            <br /> 1、如需退预约号，至少提前1天；
            <br /> 2、挂当天号的，不允许退号；
            <br /> 3、因已占用号源，过期号不予退号；
            <!-- <br /> 4、退号后，挂号费在7个银行工作日退还到原支付银行卡； -->
            <br /> 4、挂诊查成功后，请您尽快到相应诊室候诊（迟到请重新排队）
            <br />
          </p>
          <a @click="unpickup" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">退号</a>
        </div>
        <div v-if="!canUnpickup">
          <p style="padding:10px;" class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
            <br /> 1.如因您自身原因迟到，系统将自动安排您在本班次最后就诊。
            <br /> 2.挂当天号的不是预约号，缴费成功后，请尽快到分诊台取号排队候诊。
          </p>
        </div>
      </div>
      <div class="reg-success" v-show="showSuccess">
        <div class="weui_msg">
          <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
          <div class="weui_text_area">
            <h2 class="weui_msg_title">退号成功</h2>
            <p class="weui_msg_desc">
              挂号费，{{platform}}零钱支付即刻到账，银行卡支付7个工作日内到账。
            </p>
          </div>
          <div class="weui_opr_area">
            <p class="weui_btn_area">
              <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
            </p>
          </div>
        </div>
      </div>
      <div class="reg-failed" v-show="showFailed">
        <div class="weui_msg">
          <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
          <div class="weui_text_area">
            <h2 class="weui_msg_title">退号失败</h2>
            <p class="weui_msg_desc">{{failedMsg}}</p>
          </div>
          <div class="weui_opr_area">
            <p class="weui_btn_area">
              <a href="javascript:;" @click="gotoPortal" class="weui_btn weui_btn_primary">返回首页</a>
            </p>
          </div>
        </div>
      </div>
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
  hideLoadingToast
} from '../../vuex/actions'

export default {
  name: 'RegOrderDetailView',
  vuex: {
    actions: {
      showConfirm,
      showLoadingToast,
      hideLoadingToast
    }
  },
  data: function () {
    return {
      id: -1,
      num: '',
      cardNo: '',
      cardName: '',
      createDt: '',
      type: '',
      regDate: '',
      deptName: '',
      doctorName: '',
      regType: '',
      sumFee: '',
      regNo: '',
      visitNo: '',
      location: '',
      regTime: '',
      canUnpickup: false,
      showDetail: true,
      showSuccess: false,
      showFailed: false,
      failedMsg: '',
      showNoRecord: false,
      isCity: false,
      platform: process.env.PLATFORM
    }
  },
  methods: {
    getOrderDetail: function () {
      var self = this
      this.$ajax.get('GetOrderDetail', 'RegOrder', { orderId: this.id }).then(function (data) {
        if (data.ResultCode === '0') {
          if (data.VisitNo !== null) {
            JsBarcode('#barcodeCard', data.CardNo, {
              format: 'CODE128',
              displayValue: true,
              fontSize: 24,
              lineColor: '#000',
              height: 66,
              textAlign: 'center'
            })
            JsBarcode('#barcode', data.VisitNo, {
              format: 'CODE128',
              displayValue: true,
              fontSize: 24,
              lineColor: '#000',
              height: 66,
              textAlign: 'center'
            })
          }
          self.num = data.OrderNo
          self.cardNo = data.CardNo
          self.cardName = data.CardName
          self.createDt = data.CreateDt
          self.type = data.OrderType
          self.regDate = data.RegDate
          self.deptName = data.DeptName
          self.doctorName = data.DoctorName
          self.regType = data.RegType
          self.sumFee = data.SumFee
          self.visitNo = data.VisitNo
          self.location = data.Location
          self.regTime = data.RegTime
          self.canUnpickup = data.CanUnpickup
        } else {
          self.showNoRecord = true
        }
      })
    },
    unpickup: function () {
      var self = this

      this.showConfirm({
        title: '请确认',
        msg: '您确定要退号吗？'
      }).then(function (clickedBtn) {
        if (clickedBtn === 'yes') {
          // 调起接收通知
          if (navigator.userAgent.indexOf('AlipayClient') > -1) {
            window.my.postMessage({ msgType: 'onregsendmessage' })
          } else {
            self.doUnpickup()
          }
        }
      })
    },
    doUnpickup: function () {
      var self = this

      this.showLoadingToast({ msg: '正在退号...' }, false)

      this.$ajax.get('Unpickup', 'Reg', { orderId: this.id }).then(function (dataUnpickup) {
        if (dataUnpickup.ResultCode !== '0') {
          self.showDetail = false
          self.showSuccess = false
          self.showFailed = true
          self.failedMsg = dataUnpickup.ResultMsg
          self.hideLoadingToast()
          return
        }
        self.unpickupSucceed()
      })
    },
    unpickupSucceed: function () {
      var self = this
      this.$ajax.get('GetCancellRegStatus', 'Reg', {
        orderId: this.id
      }, false).then(function (data) {
        if (data.ResultCode !== '0') {
          self.hideLoadingToast()
          window.history.go(-1)
        } else {
          if (data.RegStatus === '1') {
            self.failedMsg = data.FailedMsg
            self.showDetail = false
            self.showSuccess = false
            self.showFailed = true
            self.hideLoadingToast()
          } else if (data.RegStatus === '0') {
            if (self.isCity) {
              self.citySucceed()
            } else {
              self.showDetail = false
              self.showSuccess = true
              self.showFailed = false
              self.hideLoadingToast()
            }
          } else {
            window.setTimeout(function () {
              self.unpickupSucceed()
            }, 500)
          }
        }
      })
    },
    citySucceed: function () {
      var self = this

      this.$ajax.get('GetTemplateMsg', 'City', {
        orderId: this.id,
        msgtype: 'guahaotuifei'
      }, false).then(function (data) {
        self.showDetail = false
        self.showSuccess = true
        self.showFailed = false
        self.hideLoadingToast()
        window.location = data
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    }
  },
  ready: function () {
    // 接收授权接收通知返回，再调用退号事件
    if (navigator.userAgent.indexOf('AlipayClient') > -1) {
      if (window.my !== undefined) {
        window.my.onMessage = (msg) => {
          // window.alert('h5接收' + msg.msgType)
          if (msg.msgType === 'onregsendmessage') {
            this.doUnpickup()
          }
        }
      }
    }

    this.isCity = this.$cookie.get('IsCity') && this.$cookie.get('IsCity') === '1'

    this.id = this.$route.params.orderId
    this.getOrderDetail()
  }
}
</script>
