<template>
  <div>
    <div class="container" v-show="showEmp">
      <!-- <div class="weui_cells_title">就诊卡：</div>
      <div class="weui_cells weui_cells_access" style="margin-top:10px;">
        <a @click="selectCard" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:45px;margin-right:5px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{card?card.name:''}} <span style="margin-left:15px;" class="blue_tag">{{card?card.type:''}}</span></p>
            <p>{{card?card.num:''}}</p>
          </div>
          <div class="weui_cell_ft">
            选就诊卡
          </div>
        </a>
      </div> -->
      <div class="weui_cells_title">健康卡:</div>
      <div class="weui_cells weui_cells_access" style="margin-top: 10px">
        <a
          @click="selectCard"
          class="weui_cell"
          href="javascript:;"
          v-if="card.cardId !== -1"
        >
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{ card ? card.name : "" }}</p>
            <p>{{ card ? card.idNumber : "" }}</p>
          </div>
          <div class="weui_cell_ft">另选</div>
        </a>
        <a @click="selectCard" class="weui_cell" href="javascript:;" v-else>
          <div class="weui_cell_hd">
            <i
              class="fa fa-credit-card fa-2x icon-color"
              style="width: 45px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>暂无健康卡</p>
          </div>
          <div class="weui_cell_ft">新建</div>
        </a>
      </div>
      <div>
        <div class="weui_cells_title">
          <p class="am-ft-sm am-ft-gray">
            <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
            默认查询30日内报告，如需查询历史报告，请更改查询时间！
          </p>
        </div>
        <div class="weui_cells weui_cells_access weui_cells_form">
          <div class="weui_cell">
            <div class="weui_cell_hd">
              <label class="weui_label">开始时间</label>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <input class="weui_input" type="date" v-model="startDate" />
            </div>
            <div class="weui_cell_ft"></div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_hd">
              <label class="weui_label">结束时间</label>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <input class="weui_input" type="date" v-model="endDate" />
            </div>
            <div class="weui_cell_ft"></div>
          </div>
        </div>
      </div>
      <div class="weui_cells_title">{{ emptyMsg }}</div>
      <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
        <a
          v-for="listReport in listReport"
          @click="viewCheck($index)"
          class="weui_cell"
          href="javascript:;"
        >
          <div class="weui_cell_hd">
            <i
              class="fa fa-file-excel-o fa-2x icon-color"
              style="width: 35px; margin-right: 5px; display: block"
            ></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <!-- <p>姓名：<span class="am-ft-sm am-ft-blue">{{listReport.Pat_Name}}</span></p>
            <p>性别：<span class="am-ft-sm am-ft-blue">{{listReport.Sex}}</span></p>
            <p>出生日期：<span class="am-ft-sm am-ft-blue">{{listReport.Date_Birth}}</span></p>
            <p>检查来源：<span class="am-ft-sm am-ft-blue">{{listReport.Exam_Pat_Resoutce_Name}}</span></p>
            <p>检查科室：<span class="am-ft-sm am-ft-blue">{{listReport.Execut_Dept_Name}}</span></p>
            <p>检查医生：<span class="am-ft-sm am-ft-blue">{{listReport.Report_Dr_Name}}</span></p>
            <p>报告单编号：<span class="am-ft-sm am-ft-blue">{{listReport.Report_No}}</span></p> -->
            <p>
              报告单名称：<span class="am-ft-sm am-ft-blue">{{
                listReport.EXAM_ITEM_NAME
              }}</span>
            </p>
            <!-- <p>检查类别名称：<span class="am-ft-sm am-ft-blue">{{listReport.Exam_Categ_Name}}</span></p> -->
            <p>
              报告申请日期：<span class="am-ft-sm am-ft-blue">{{
                listReport.APPLY_Date
              }}</span>
            </p>
            <!-- <p>检查类别名称：<span class="am-ft-sm am-ft-blue">{{listReport.Exam_Categ_Name}}</span></p> -->
            <!-- <p>检查描述：<span class="am-ft-sm am-ft-blue">{{listReport.Exam_Result}}</span></p> -->
            <!-- <p>检查结果：<span class="am-ft-sm am-ft-blue">{{listReport.Exam_Descr}}</span></p> -->
          </div>
        </a>
      </div>
      <partial name="footer-copyright"></partial>
    </div>
  </div>
</template>
<style scoped>
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
// /*global WeixinJSBridge*/
import { commonUtil } from '../../plugins/common'
import { showCommonToast } from '../../vuex/actions'
import _ from 'underscore'

export default {
  name: 'GetInspectionView',
  data: function () {
    return {
      startDate: '',
      endDate: '',
      listReport: [],
      emptyMsg: '',
      name: '',
      deptName: '',
      drName: '',
      Content: '',
      Diagnostic: '',
      showEmp: 'true',
      type: this.$route.query.type
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
    this.startDate = commonUtil.getDateStr(-30)
    this.endDate = commonUtil.getDateStr()

    this.$watch('startDate', function (val) {
      this.getInspections()
    })

    this.$watch('endDate', function (val) {
      this.getInspections()
    })

    this.$watch('card', function (val) {
      this.getInspections()
    })

    this.getInspections()
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    viewCheck: function (idx) {
      var check = this.listReport[idx]
      console.log(check)
      this.$router.go({ name: 'getInspectiondetal', query: { reportNo: check.Report_No, type: this.type, reporttype: check.checkType } })
    },
    getDetail: function (idx) {
      var self = this
      var detail = this.inspections[idx]
      self.name = detail.name
      self.deptName = detail.deptName
      self.drName = detail.drName
      self.Content = detail.Content
      self.Diagnostic = detail.Diagnostic
      this.showEmp = false
    },
    getInspections: function () {
      if (!this.card || this.startDate === '' || this.endDate === '') {
        return
      }
      var self = this
      this.$ajax.get('InspectResults', 'Check', {
        cardId: this.card.id,
        startDate: this.startDate,
        endDate: this.endDate,
        type: this.type
      }).then(function (data) {
        if (data.resultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.resultMsg
          self.listReport = []
        } else {
          self.emptyMsg = data.resultMsg
          self.listReport = _.map(data.listReport, function (val) {
            return {
              Report_No: val.Report_No,
              EXAM_ITEM_NAME: val.EXAM_ITEM_NAME,
              Exam_Pat_Resoutce_Name: val.Exam_Pat_Resoutce_Name,
              APPLY_Date: val.APPLY_Date,
              Exam_Categ_Name: val.Exam_Categ_Name,
              Exam_Result: val.Exam_Result,
              Exam_Descr: val.Exam_Descr,
              Execut_Dept_Name: val.Execut_Dept_Name,
              Report_Dr_Name: val.Report_Dr_Name,
              Sex: val.Sex,
              Date_Birth: val.Date_Birth,
              Pat_Name: val.Pat_Name
            }
          })
        }
      })
    }
    // ,
    // viewInspection: function (idx) {
    //   var inspection = this.inspections[idx]
    //   if (inspection.status === '1') {
    //     this.$ajax.get('GetInspectionImgUrls', 'Inspection', {
    //       appNo: inspection.id
    //     }).then(function (data) {
    //       if (data.ResultCode !== '0') {
    //         this.showCommonToast({ msg: data.ResultMsg })
    //       } else {
    //         WeixinJSBridge.invoke('imagePreview', {
    //           'current': data.ImgUrls[0],
    //           'urls': data.ImgUrls
    //         })
    //       }
    //     })
    //   }
    // }
  }
}
</script>
