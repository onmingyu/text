<template>
  <div class="weui_tab">
    <div class="weui_tab_bd">
    </div>
    <div class="weui_navbar">
      <div v-for="day in days" class="weui_navbar_item" >
        <div v-show="day.isFull || day.isEmpty" class="right-angle"></div>
        <div v-show="!day.isEmpty && day.isFull" class="full-font">满</div>
        <div v-show="day.isEmpty" class="full-font">无</div>
        <p class="am-ft-red" style="line-height:15px;font-size: 18px;">{{day.weekday}}</p>
        <p class="am-ft-12" style="line-height:8px;margin-top:6px;">{{day.shortDay}}</p>

        <div class="weui_cells weui_cells_access weui_1" v-for="ts in day.timeSlices" v-show="ts.SliceStartTime === '08:00'">
          <p class="am-ft-orange">{{ts.DoctorName}}</p>
          <p class="am-ft-orange">上午</p>
        </div>
        <div class="weui_cells weui_cells_access weui_1" v-for="ts in day.timeSlices" v-show="ts.SliceStartTime === '14:00'">
          <p>{{ts.DoctorName}}</p>
          <p>下午</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.weui_tab_bd {
  padding-bottom: 49px;
}

.weui_navbar_item {
  padding: 10px 0;
  color: #000;
}
.weui_1 {
  font-size: 14px;
  margin-top: 0px;
  top: 10px;
  padding: 10px 0;
  color: #000;
}

.weui_bar_item_on {
  color: #FFF;
  background: #0ae;
}

.weui_bar_item_on .right-angle {
  border-color: #f85800;
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.right-angle {
  width: 0;
  height: 0;
  border-width: 14px;
  border-style: solid;
  border-color: #999;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
}

.full-font {
  position: absolute;
  top: 0px;
  right: 2px;
  color: #fff;
  /*transform: rotate(45deg);*/
  font-size: 12px;
}

.weui_bar_item_on .full-font {
  color: #FFF;
}
</style>
<script>
import _ from 'underscore'
import { commonUtil } from '../plugins/common'
export default {
  name: 'WeekdaySelectorComponent',
  props: {
    days: {
      type: Array,
      default: function () {
        var days = []
        var now = new Date()
        for (var i = 0; i < 8; i++) {
          var date = new Date(now.valueOf() + i * 24 * 60 * 60 * 1000)
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
          var yearStr = year.toString()
          var monthStr = month < 10 ? ('0' + month) : month.toString()
          var dayStr = day < 10 ? ('0' + day) : day.toString()
          var dateStr = yearStr + '-' + monthStr + '-' + dayStr

          days.push({
            date: dateStr,
            isFull: false,
            isEmpty: false,
            isSelected: i === 1
          })
        }
        return days
      },
      coerce: function (val) {
        for (var i = 0; i < val.length; i++) {
          var dateparts = val[i].date.split('-')
          var dDate = new Date(parseInt(dateparts[0]), parseInt(dateparts[1]) - 1, parseInt(dateparts[2]))
          val[i] = _.extend({}, val[i], {
            weekday: commonUtil.parseWeekday(dDate.getDay().toString()),
            shortDay: dDate.getDate().toString()
          })
        }
        return val
      }
    }
  },
  data: function () {
    return {
      selectedDay: '',
      timeSlices: []
    }
  },
  ready: function () {
    this.$watch('days', function (val) {
      for (var i = 0; i < this.days.length; i++) {
        if (this.days[i].isSelected) {
          this.selectedDay = this.days[i].date
        }
      }
    })
  }
}
</script>
