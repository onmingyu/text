<template>
  <div class="container">
    <div class="title-section">
      <div class="weui_cells_title">
        <h1 style="color:#007aff;text-align:center;font-size: 18px;">{{deptName}}</h1>
      </div>
    </div>
    <div class="top-section">
      <div class="fn-left" style="width:100%;padding-top:9px;padding-left:8px;">
        <span>已选:</span>
        <span class="am-ft-orange">{{selectedDay}} <span class="am-ft-red">{{selectedDayTip}}</span></span>
      </div>
    </div>
    <div class="date-selector-section">
      <weekday-selector :days="days" @weekday-selection-changed="weekdaySelected"></weekday-selector>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div align="center">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span> 温馨提示：
          <br /> <p style="color:red">预约订单，如果要退号必须提前一天自行操作退号，谢谢合作！</p>
        </div>
        <div class="weui_cells weui_cells_access" style="margin-top:10px;">
          <a @click="sliceClicked($index)" v-for="ts in timeSlices" class="weui_cell" href="javascript:;">
            <div class="weui_cell_hd">
              <i class="fa fa-clock-o fa-2x icon-color" style="width:35px;margin-right:5px;display:block;"></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{ts.drName}} <span class="am-ft-13 am-ft-gray">{{ts.drDepartName}}  ({{ts.drTitle}})</span></p>
              <p>{{ts.sliceStartTime}}-{{ts.sliceEndTime}}</p>
              <!--<p><span class="orange_tag">{{ts.regType}}</span></p>-->
            </div>
            <div class="weui_cell_bd">
              <p>
                <span v-show="ts.totalCount <= 0" class="blue_tag">有号</span>
                <span v-show="ts.totalCount > 0 && ts.leaveCount > 0" class="blue_tag">剩 {{ts.leaveCount}}</span>
                <span v-show="ts.totalCount <= 0 || ts.leaveCount > 0" class="blue_tag">{{ts.totalFee}} 元</span>
                <span v-show="ts.totalCount > 0 && ts.leaveCount <= 0" class="am-ft-gray am-ft-13">已约满</span>
              </p>
            </div>
            <div class="weui_cell_ft" v-show="ts.leaveCount !== 0">
            </div>
          </a>
        </div>
        
        <partial name="footer-copyright"></partial>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title-section {
  position: absolute;
  height: 43px;
  width: 100%;
  top: 0;
  left: 0;
  border-bottom: 1px solid #bcbab6;

}
.top-section {
  position: absolute;
  height: 43px;
  width: 100%;
  top: 43px;
  left: 0;
}
.top-section:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #bcbab6;
  color: #bcbab6;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}

.date-selector-section {
  position: absolute;
  top: 86px;
  left: 0;
  width: 100%;
  height: 50px;
}

.scroll-wrapper {
  position: absolute;
  top: 136px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.scroller {
  position: absolute;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
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
import { iScroll as IScroll } from '../../assets/lib/iscroll4/iscroll'
import WeekdaySelectorComponent from '../../components/weekday-selector'
import _ from 'underscore'
import { setRegSlice, setRegOrderType } from '../../vuex/actions'

export default {
  name: 'SelectRegSliceDoctorView',
  vuex: {
    actions: {
      setRegSlice,
      setRegOrderType
    }
  },
  data: function () {
    return {
      departId: this.$route.query.departId,
      drId: this.$route.query.drId === '-1' ? '' : this.$route.query.drId,
      deptName: this.$route.query.deptName,
      today: '',
      selectedDay: '',
      selectedDayTip: '',
      days: [],
      timeSlices: [],
      orgData: {}
    }
  },
  methods: {
    weekdaySelected: function (weekday) {
      var self = this
      this.selectedDay = weekday.date
      this.selectedDayTip = this.$common.getDayTip(weekday.date)
      this.timeSlices = _.map(_.find(this.orgData.RegDays, function (val) {
        return val.Date === self.selectedDay
      }).TimeSlices, function (val) {
        return {
          departId: val.DeptId,
          departName: val.DeptName,
          drDepartName: val.DoctordepartNm,
          drId: val.DoctorId,
          drName: val.DoctorName,
          drTitle: val.Title,
          regType: val.RegType,
          sliceName: val.SliceName,
          sliceStartTime: val.SliceStartTime,
          sliceEndTime: val.SliceEndTime,
          leaveCount: val.LeaveCount,
          totalCount: val.TotalCount,
          hasTimePoint: val.HasTimePoint,
          regFee: val.RegFee,
          treatFee: val.TreatFee,
          otherFee: val.OtherFee,
          totalFee: val.TotalFee
        }
      })
      this.$nextTick(function () {
        this.iscroll.refresh()
      })

      this.$router.replace({
        name: 'selectRegSlice',
        params: {
          departId: this.$route.params.departId,
          drId: this.$route.params.drId,
          selectedDay: weekday.date
        },
        query: {
          deptName: this.$route.query.deptName
        }
      })
    },
    sliceClicked: function (idx) {
      var timeSlice = this.timeSlices[idx]
      if (timeSlice.totalCount > 0 && timeSlice.leaveCount <= 0) {
        return
      }

      this.setRegSlice(timeSlice.departId, timeSlice.departName, timeSlice.drId, timeSlice.drName, timeSlice.drTitle, this.selectedDay,
        timeSlice.regType, timeSlice.sliceName, timeSlice.sliceStartTime, timeSlice.sliceEndTime, timeSlice.regFee,
        timeSlice.treatFee, timeSlice.otherFee, timeSlice.totalFee)

      if (timeSlice.hasTimePoint) {
        if (this.selectedDay === this.today) {
          this.setRegOrderType('当日有序')
        } else {
          this.setRegOrderType('预约有序')
        }
        this.$router.go({ name: 'selectRegPoint' })
      } else {
        if (this.selectedDay === this.today) {
          this.setRegOrderType('当日无序')
        } else {
          this.setRegOrderType('预约无序')
        }
        this.$router.go({ name: 'healthQuestion', query: {departName: timeSlice.departName, type: 'reg'} })

        // this.$router.go({ name: 'doReg' })
      }
    }
  },
  components: {
    'weekday-selector': WeekdaySelectorComponent
  },
  ready: function () {
    var self = this

    var myScroll = new IScroll('scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    this.iscroll = myScroll

    this.$ajax.get('GetTimeSlices', 'Depart', { deptName: this.deptName, deptId: this.departId, doctorId: this.drId }).then(function (data) {
      var viewSelectedDay = self.$route.query.selectedDay
      if (viewSelectedDay !== '-1') {
        self.selectedDay = viewSelectedDay
      } else {
        self.selectedDay = data.DefaultSelectedDay
      }
      // self.deptName = data.DeptName

      self.today = data.Today

      self.selectedDayTip = self.$common.getDayTip(self.selectedDay)
      self.days = _.map(data.RegDays, function (val) {
        var isEmpty = true
        if (val.TimeSlices && val.TimeSlices.length > 0) {
          isEmpty = false
        }
        return {
          date: val.Date,
          isFull: val.IsFull,
          isEmpty: isEmpty,
          isSelected: val.Date === self.selectedDay // val.isSelected
        }
      })
      if (self.selectedDay !== '无剩余号源') {
        self.timeSlices = _.map(_.find(data.RegDays, function (val) {
          return val.Date === self.selectedDay
        }).TimeSlices, function (val) {
          return {
            departId: val.DeptId,
            departName: val.DeptName,
            drId: val.DoctorId,
            drName: val.DoctorName,
            drDepartName: val.DoctordepartNm,
            drTitle: val.Title,
            regType: val.RegType,
            sliceName: val.SliceName,
            sliceStartTime: val.SliceStartTime,
            sliceEndTime: val.SliceEndTime,
            leaveCount: val.LeaveCount,
            totalCount: val.TotalCount,
            hasTimePoint: val.HasTimePoint,
            regFee: val.RegFee,
            treatFee: val.TreatFee,
            otherFee: val.OtherFee,
            totalFee: val.TotalFee
          }
        })
      }
      self.orgData = data
      self.$nextTick(function () {
        self.iscroll.refresh()
      })
    })
  },
  beforeDestroy: function () {
    this.iscroll.destroy()
    this.iscroll = null
  },
  iscroll: null
}
</script>
