<template>
  <div class="container">
    <div class="bill-detail" v-show="showDetail">
      <div class="weui_cells_title"></div>
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
              <span class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
              <!-- <span class="info">{{cardNo}}</span> -->
              <p style="text-align: center">
                <img id="barcode" />
              </p>
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
      </div>
      <div class="weui_cells">
       <!--  <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">处&nbsp;&nbsp;方&nbsp;&nbsp;号</span>
              <span class="info">{{clinicNo}}</span>
            </p>
          </div>
        </div> -->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单科室</span>
              <span class="info">{{orderDept}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">开单医生</span>
              <span class="info">{{orderDate}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">缴费时间</span>
              <span class="info">{{payDate}}</span>
            </p>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">缴费金额</span>
              <span class="info">{{prescMoney}} 元</span>
            </p>
          </div>
        </div>
      </div>
   <!--    <div v-show="hasYiBao">
        <div class="weui_cells_title">医保：</div>
        <div class="weui_cells">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">自费金额</span>
                <span class="info">{{cost}} 元</span>
              </p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
              <p>
                <span class="label">医保记账</span>
                <span class="info">{{charges}} 元</span>
              </p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="weui_cells_title">收据列表：</div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p>
              <span class="label">发票号：</span>
              <span class="info">{{visitNo}}</span>
            </p>
            <p style="text-align: center">
              <img id="barcode_visitNo" />
            </p>
            <a @click="getinvoice" v-show="pictureUrl !== ''" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">查看电子票据</a>
            <!--<p>
              <span class="label">流水号：</span>
              <span class="info">{{disWin.visitNo}}</span>
            </p>
            <p>
              <span class="info">{{disWin.disWinAdd}}</span>
            </p> -->
          </div>
        </div>
      </div>
      <div v-show="resultMsg.indexOf('佑元庄') > 0" class="weui_cells">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <p style="color: #0ae;">
              {{resultMsg}}
            </p>
          </div>
        </div>
      </div>
      <div class="weui_cells_title">明细列表：</div>

      <div class="weui_cells" v-for="b in bills" class="weui_cells">
        <div class="weui_cell" style="border-bottom: solid 1px #a5a5a5 ;">
          <div class="weui_cell_bd weui_cell_primary">
            <p><span style="display: block;">收据号：</span></p>
            <p style="text-align: center"><img id="barcode_{{$index}}" /></p>
            <p><span style="display: block;">指引信息：<span style="color: #0ae;">{{b.DisWinAdd}}</span></span></p>
            <!-- <p><span style="display: block;">执行状态：<span style="color: #0ae;">未执行</span></span></p> -->
          </div>
        </div>
        <div style="margin-left: 4%;">
          <div  class="weui_cell_bd weui_cell_primary" v-for="item in b.Items" style="border-bottom: dashed 1px #c7bfbf ;">
            <p> 
            <span style="display: block;">类型：<span style="color: #0ae;">{{item.Type}}</span></span>
            <span style="display: block;">名称：<span style="color: #0ae;">{{item.Name}}</span></span>
            </p>

            <p style="display: block;">
            <span style="display: inline-block;width: 49%;">数量：<span style="color: #0ae;">{{item.Account}}</span></span>
            <span style="display: inline-block;width: 49%;">单位：<span style="color: #0ae;">{{item.Unit}}</span></span>
            </p>
            
            <p style="display: block;">
            <span style="display: inline-block;width: 49%;">单价：<span style="color: #0ae;">{{item.ItemPrice}} 元</span></span>
            <span style="display: inline-block;width: 49%;">小计：<span style="color: #0ae;">{{item.Money}} 元</span></span>
            </p>
          </div>
          
        </div>
      </div>

        <!-- <div v-for="b in bills" class="weui_cells">
          <div class="weui_cell_bd weui_cell_primary" >
            <p><span style="display: block;">收据号：</span></p>
            <p style="text-align: center"><img id="barcode_{{$index}}" /></p>
            <p><span style="display: block;">指引信息：<span style="color: #0ae;">{{b.DisWinAdd}}</span></span></p>
          </div>
          <div class="weui_cell_bd weui_cell_primary" v-for="item in b.Items">
            <p>
              <span style="display: block;">类型：<span style="color: #0ae;">{{item.Type}}</span></span>
              <span style="display: block;">名称：<span style="color: #0ae;">{{item.Name}}</span></span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">数量：<span style="color: #0ae;">{{item.Account}}</span></span>
              <span style="display: inline-block;width: 50%;float: left;">单位：<span style="color: #0ae;">{{item.Unit}}</span></span>
              </span>
              <span style="display: block;width: 100%;">
                <span style="display: inline-block;width: 50%;float: left;">单价：<span style="color: #0ae;">{{item.ItemPrice}} 元</span></span>
              <span style="display: inline-block;width: 50%;float: left;">小计：<span style="color: #0ae;">{{item.Money}} 元</span></span>
              </span>
            </p>
          </div>
        </div> -->
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
          <h2 class="weui_msg_title">找不到缴费单</h2>
          <p class="weui_msg_desc">
            该缴费单不存在或已退费
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
  color: #aaa5a5;
}
</style>
<script>
import JsBarcode from '../../assets/lib/jsbarcode/jsbarcode'
// import _ from 'underscore'

export default {
  name: 'RegOrderDetailView',
  data: function () {
    return {
      id: -1,
      num: '',
      cardNo: '',
      cardName: '',
      clinicNo: '',
      prescMoney: '',
      orderDept: '',
      orderDate: '',
      hasYiBao: false,
      charges: '',
      payDate: '',
      cost: '',
      bills: [],
      disWins: [],
      visitNo: '',
      showDetail: true,
      showNoRecord: false,
      resultMsg: '',
      pictureUrl: ''
    }
  },
  methods: {
    getOrderDetail: function () {
      var self = this
      this.$ajax.get('GetOrderDetail', 'BillOrder', { orderId: this.id }).then(function (data) {
        if (data.ResultCode === '0') {
          self.num = data.OrderNo
          self.cardNo = data.CardNo
          self.cardName = data.CardName
          self.clinicNo = data.ClinicNo
          self.prescMoney = data.PrescMoney
          self.payDate = data.PayDate
          self.orderDept = data.OrderDept
          self.orderDate = data.OrderDate
          self.hasYiBao = data.HasYiBao
          self.charges = data.Charges
          self.cost = data.Cost
          self.resultMsg = data.ResultMsg
          self.visitNo = data.Remark
          self.pictureUrl = data.pictureUrl
          self.bills = data.Bills
          // self.disWins = _.map(data.DisWins, function (val, index) {
          //   return {
          //     rcptNo: val.RcptNo,
          //     visitNo: val.VisitNo,
          //     disWinAdd: val.DisWinAdd,
          //     disWin: val.DisWin
          //   }
          // })
          JsBarcode('#barcode', self.cardNo, {
            format: 'CODE128',
            displayValue: true,
            fontSize: 24,
            lineColor: '#000',
            height: 66,
            textAlign: 'center'
          })
          JsBarcode('#barcode_visitNo', self.visitNo, {
            format: 'CODE128',
            displayValue: true,
            fontSize: 24,
            lineColor: '#000',
            height: 66,
            textAlign: 'center'
          })
          self.$nextTick(function () {
            for (var i = 0; i < self.bills.length; i++) {
              JsBarcode('#barcode_' + i, self.bills[i].ClinicNo, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 24,
                lineColor: '#000',
                height: 66,
                textAlign: 'center'
              })
            }
          })
        } else {
          self.showDetail = false
          self.showNoRecord = true
        }
      })
    },
    gotoPortal: function () {
      this.$router.replace({ name: 'portal' })
    },
    getinvoice: function () {
      var self = this
      window.location.href = self.pictureUrl
    }
  },
  ready: function () {
    this.id = this.$route.params.orderId
    this.getOrderDetail()
  }
}
</script>
