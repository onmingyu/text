<template>
  <div class="container">
    <div class="title-section">
      <div class="weui_cells_title">
        <h1 style="color:#007aff;text-align:center;font-size: 18px;">{{deptName}}</h1>
      </div>
    </div>
    <div class="date-selector-section">
      <weekday-selector :days="days"></weekday-selector>
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
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
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
import WeekdaySelectorComponent from '../../components/weekday-select'
import _ from 'underscore'
import { setRegSlice, setRegOrderType } from '../../vuex/actions'

export default {
  name: 'HospSchedulingView',
  vuex: {
    actions: {
      setRegSlice,
      setRegOrderType
    }
  },
  data: function () {
    return {
      departId: this.$route.params.departId,
      drId: this.$route.params.drId === '-1' ? '' : this.$route.params.drId,
      deptName: this.$route.params.deptName,
      branch: this.$route.query.branch,
      days: []
    }
  },
  components: {
    'weekday-selector': WeekdaySelectorComponent
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetHospTimeSlices', 'Depart', { deptId: this.departId, doctorId: this.drId, doctordepartNm: this.deptName, branch: this.branch }).then(function (data) {
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
          timeSlices: val.TimeSlices,
          isSelected: val.Date === self.selectedDay // val.isSelected
        }
      })
    })
  }
}
</script>
