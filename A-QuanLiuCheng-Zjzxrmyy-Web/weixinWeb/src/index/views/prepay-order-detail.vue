<template>
  <div class="container">
    <div v-show="!showNoRecord">
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
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">床&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
              <span class="info">{{bedNo}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</span>
              <span class="info">{{orderDept}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">住院流水号</span>
              <span class="info">{{inHosSerialNo}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">发&nbsp;&nbsp;票&nbsp;&nbsp;号</span>
              <span class="info">{{invoiceNo}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">缴费时间</span>
              <span class="info">{{createDt}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额</span>
              <span class="info">{{prepayMoney}} 元</span>
            </p>
          </div>
        </div>
      </div>
      <p style="padding:10px;" class="am-ft-sm am-ft-gray">
        <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
        <br /> 如需补打发票，请于当天移步人工窗口办理，过期无效。
      </p>
    </div>
    <div v-show="showNoRecord">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
        <div class="weui_text_area">
          <h2 class="weui_msg_title">找不到住院预缴单</h2>
          <p class="weui_msg_desc">
            该住院预缴单不存在
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
export default {
  name: 'PrepayOrderDetailView',
  data: function () {
    return {
      id: -1,
      num: '',
      cardNo: '',
      cardName: '',
      createDt: '',
      prepayMoney: '',
      failedMsg: '',
      showNoRecord: false,
      orderDept: '',
      depositMoney: '',
      inHosSerialNo: '',
      bedNo: '',
      invoiceNo: ''
    }
  },
  methods: {
    getOrderDetail: function () {
      var self = this
      this.$ajax.get('GetOrderDetail', 'PrepayOrder', { orderId: this.id }).then(function (data) {
        if (data.ResultCode === '0') {
          self.num = data.OrderNo
          self.cardNo = data.CardNo
          self.cardName = data.CardName
          self.createDt = data.CreateDt
          self.prepayMoney = data.PrepayMoney
          self.bedNo = data.bedNo
          self.orderDept = data.OrderDept
          self.depositMoney = data.depositMoney
          self.inHosSerialNo = data.inHosSerialNo
          self.invoiceNo = data.invoiceNo
        } else {
          self.showNoRecord = true
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    }
  },
  ready: function () {
    this.id = this.$route.params.orderId
    this.getOrderDetail()
  }
}
</script>