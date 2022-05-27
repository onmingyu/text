<template>
  <div class="weui_tab">
    <div class="weui_tab_bd">
    </div>
    <div class="weui_navbar">
      <div v-for="day in days" @click="select($index)" class="weui_navbar_item" :class="{ 'weui_bar_item_on': day.date === selectedDay }">
        <div v-show="day.isFull || day.isEmpty" class="right-angle"></div>
        <div v-show="!day.isEmpty && day.isFull" class="full-font">满</div>
        <div v-show="day.isEmpty" class="full-font">无</div>
        <p class="am-ft-12" style="line-height:12px;">{{day.weekday}}</p>
        <p class="am-ft-12" style="line-height:12px;margin-top:5px;">{{day.shortDay}}</p>
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
      selectedDay: ''
    }
  },
  methods: {
    select: function (idx) {
      var selectedWeekday = this.days[idx]
      // if (selectedWeekday.isFull) {
      //   return
      // }
      if (selectedWeekday.isEmpty) {
        return
      }

      var changed = false
      var changedParam = {}
      for (var i = 0; i < this.days.length; i++) {
        if (i === idx) {
          if (!this.days[i].isSelected) {
            this.days[i].isSelected = true
            this.selectedDay = this.days[i].date
            changed = true
            changedParam = {
              date: this.days[idx].date,
              weekday: this.days[idx].weekday
            }
          }
        } else {
          this.days[i].isSelected = false
        }
      }
      if (changed) {
        this.$dispatch('weekday-selection-changed', changedParam)
      }
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
