<template>
  <div class="container">
    <div v-show="!showNoRecord">
      <div v-show="showDetail">
        <!-- <div class="am-ft-center am-ft-xl">
          <p>广东省妇幼保健院</p>
          <p>广东省儿童医院</p>
          <p>广东省妇产医院</p>
        </div> -->
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
                <span class="info">{{cardNo}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</span>
                <span class="info">{{deptName}}</span>
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
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</span>
                <span class="info">{{regType}}</span>
              </p>
            </div>
          </div>
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
                <span class="label">就诊时间</span>
                <span class="info">{{regTime}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">流&nbsp;&nbsp;水&nbsp;&nbsp;号</span>
                <span class="info">{{visitNo}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">排&nbsp;&nbsp;队&nbsp;&nbsp;号</span>
                <span class="info">{{regNo}}</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">就诊位置</span>
                <span class="info">{{location}}</span>
              </p>
            </div>
          </div>
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
    <div class="reg-success" v-show="showSuccess">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">挂号成功</h2>
          <p class="weui_msg_desc">
            请牢记您的就诊时间:{{regDate}} {{regTime}}, 就诊医生:{{deptName}} {{doctorName}}
          </p>
        </div>
        <div class="weui_opr_area">
          <p class="weui_btn_area">
            <a href="javascript:;" @click="goOrderDetail" class="weui_btn weui_btn_primary">查看详情</a>
          </p>
        </div>
      </div>
    </div>
    <div class="reg-failed" v-show="showFailed">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">挂号失败</h2>
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
  import {
    showLoadingToast,
    hideLoadingToast
  } from '../../vuex/actions'

  export default {
    name: 'DoRegCallbackView',
    vuex: {
      actions: {
        showLoadingToast,
        hideLoadingToast
      }
    },
    data: function () {
      return {
        id: '',
        outTradeNo: '',
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
        showDetail: true,
        showNoRecord: false,
        showSuccess: false,
        showFailed: false,
        isCity: false
      }
    },
    methods: {
      getOrderDetail: function () {
        var self = this
        this.$ajax.get('GetOrderDetailByNo', 'RegOrder', { orderNo: self.outTradeNo }).then(function (data) {
          if (data.ResultCode === '0') {
            self.id = data.OrderId
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
            self.regNo = data.RegNo
            self.visitNo = data.VisitNo
            self.location = data.Location
            self.regTime = data.RegTime
            self.showLoadingToast({ msg: '正在取号...' }, false)
            window.setTimeout(function () {
              self.paySucceed()
            }, 500)
          } else {
            self.showNoRecord = true
          }
        })
      },
      paySucceed: function () {
        var self = this
        this.$ajax.get('GetRegStatus', 'Reg', {
          orderId: self.id
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
                // self.citySucceed()
              } else {
                self.showDetail = false
                self.showSuccess = true
                self.showFailed = false
                self.hideLoadingToast()
              }
            } else {
              window.setTimeout(function () {
                self.paySucceed()
              }, 500)
            }
          }
        })
      },
      goOrderDetail: function () {
        this.$router.replace({ name: 'regOrderDetail', params: { orderId: this.id } })
      },
      gotoPortal: function () {
        this.$router.replace({ name: 'portal' })
      }
    },
    ready: function () {
      this.isCity = this.$cookie.get('IsCity') && this.$cookie.get('IsCity') === '1'
      this.outTradeNo = this.$route.query.out_trade_no
      this.getOrderDetail()
    }
  }
</script>
