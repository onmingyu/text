<template>
  <div class="container">
    <div class="weui_panel weui_panel_access">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <i class="fa fa-user-md fa-2x icon-color"></i>
          </div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{drName}}</h4>
            <p class="weui_media_desc"> {{drTitle}}</p>
            <p class="weui_media_desc">{{departName}}</p>
          </div>
        </div>
        <div class="am-tab">
          <div class="am-tab-item" @click="showAppt" :data-tab="drDescShowed? '': 'selected'">挂号</div>
          <div class="am-tab-item" @click="showDesc" :data-tab="drDescShowed? 'selected': ''">介绍</div>
        </div>
      </div>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div v-show="!drDescShowed">
          <div class="weui_cells" style="margin-top:10px;">
            <div class="weui_cell">
              <div class="weui_cell_bd weui_cell_primary">
                <div class="fn-left am-ft-md" style="width:60%;">
                  <span>已选:</span>
                  <span class="am-ft-orange">{{selectedDay}} {{selectedDayTip}}</span>
                </div>
                <div class="fn-right am-ft-blue am-ft-right" style="width:40%;">
                  <div @click="toggleDateSelector">
                    <span v-show="!dateSelectorShowed"><i class="fa fa-chevron-circle-down fa-fx"></i>&nbsp;更多日期</span>
                    <span v-show="dateSelectorShowed"><i class="fa fa-chevron-circle-up fa-fx"></i>&nbsp;收起日期</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="dateSelectorShowed">
            <weekday-selector :days="days" @weekday-selection-changed="weekdaySelected"></weekday-selector>
          </div>
          <div class="weui_cells weui_cells_access" style="margin-top:-1px;">
            <a @click="sliceClicked($index)" v-for="ts in timeSlices" class="weui_cell" href="javascript:;">
              <div class="weui_cell_hd">
                <i class="fa fa-clock-o fa-2x icon-color" style="width:35px;margin-right:5px;display:block;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
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
        </div>
        <div v-show="drDescShowed">
          <div class="weui_cells_title">详细介绍</div>
          <div class="weui_cells">
            <div class="weui_cell">
              <div class="weui_cell_bd weui_cell_primary">
                <p>{{drDesc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_panel {
  position: absolute;
  height: 134px;
  width: 100%;
  top: 0;
  left: 0;
}

.scroll-wrapper {
  position: absolute;
  top: 135px;
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
  name: 'DrDetailView',
  vuex: {
    actions: {
      setRegSlice,
      setRegOrderType
    }
  },
  data: function () {
    var drId = this.$route.params.drId
    var departId = this.$route.params.departId

    return {
      drId: drId,
      drDescShowed: false,
      dateSelectorShowed: false,
      drName: '',
      drSex: '',
      drTitle: '',
      departId: departId,
      departName: '',
      drDesc: '',
      selectedDay: '',
      selectedDayTip: '',
      today: '',
      days: [],
      timeSlices: [],
      orgData: {}
    }
  },
  methods: {
    toggleDateSelector: function (event) {
      this.dateSelectorShowed = !this.dateSelectorShowed
      this.$nextTick(function () {
        this.iscroll.refresh()
      })
    },
    weekdaySelected: function (weekday) {
      var self = this
      this.selectedDay = weekday.date
      this.selectedDayTip = this.$common.getDayTip(weekday.date)
      this.timeSlices = _.map(_.find(this.orgData.RegDays, function (val) {
        return val.Date === self.selectedDay
      }).TimeSlices, function (val) {
        return {
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
        name: 'drDetail',
        params: {
          departId: this.$route.params.departId,
          drId: this.$route.params.drId,
          selectedDay: weekday.date
        }
      })
    },
    showAppt: function () {
      if (!this.drDescShowed) {
        return
      }
      this.drDescShowed = false
      this.$nextTick(function () {
        this.iscroll.refresh()
      })
    },
    showDesc: function () {
      if (this.drDescShowed) {
        return
      }
      this.drDescShowed = true
      this.$nextTick(function () {
        this.iscroll.refresh()
      })
    },
    sliceClicked: function (idx) {
      var timeSlice = this.timeSlices[idx]
      if (timeSlice.totalCount > 0 && timeSlice.leaveCount <= 0) {
        return
      }
      this.setRegSlice(this.departId, this.departName, this.drId, this.drName, this.drTitle, this.selectedDay,
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
        this.$router.go({ name: 'healthQuestion', query: {departName: this.departName, type: 'reg'} })

        // this.$router.go({ name: 'doReg' })
          // var hasDefaultCard = this.setDefaultRegCard()
          // if (hasDefaultCard) {
          //   this.$router.go({ name: 'doReg' })
          // } else {
          //   this.$router.go({ name: 'selectCard', query: { nextRoutePath: '/index/do-reg' } })
          // }
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

    this.$ajax.get('GetByDoctorId', 'Doctor', { deptId: this.departId, doctorId: this.drId }).then(function (data) {
      var viewSelectedDay = self.$route.params.selectedDay
      if (viewSelectedDay !== ':selectedDay') {
        self.selectedDay = viewSelectedDay
      } else {
        self.selectedDay = data.DefaultSelectedDay
      }

      self.drName = data.DoctorName
      self.drSex = data.Sex
      self.drTitle = data.Title
      self.departName = data.DeptName
      self.drDesc = data.DoctorDesc
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
