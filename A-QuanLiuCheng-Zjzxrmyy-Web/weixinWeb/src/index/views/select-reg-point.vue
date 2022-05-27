<template>
  <div class="container">
    <div class="weui_panel weui_panel_access">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <i class="fa fa-user-md fa-2x icon-color"></i>
          </div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{drName}} <span class="am-ft-gray am-ft-13">{{drTitle}}</span></h4>
            <p class="weui_media_desc">{{departName}}</p>
            <p>
              <!--<span class="orange_tag">{{regType}}</span>-->
              <span class="orange_tag">{{sumFee}}元</span>
            </p>
          </div>
          <div class="weui_media_bd" >
            <a style="color: #999999;font-size: 13px;line-height: 1.2;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;" @click='displayLayer' href="javascript:;">{{drDesc}}</a>
          </div>
        </div>
      </div>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div class="weui_cells_title">{{selectionTip}}</div>
        <div class="weui_cells weui_cells_access">
          <a @click="goReg($index)" v-for="tp in timePoints" class="weui_cell" href="javascript:;">
            <div class="weui_cell_hd">
              <i class="fa fa-clock-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>{{tp.startTime}} <!-- <span style="margin-left:8px;" class="blue_tag">{{tp.seqNo}}号</span> --></p>
            </div>
            <div class="weui_cell_ft">
            </div>
          </a>
        </div>
        <partial name="footer-copyright"></partial>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .scroll-wrapper {
    position: absolute;
    top: 94px;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
  .weui-media-boxdesc {
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
import { showAlert, setRegPoint } from '../../vuex/actions'
import _ from 'underscore'
export default {
  name: 'SelectRegPointView',
  vuex: {
    getters: {
      departId: ({ regOrder }) => regOrder.departId,
      departName: ({ regOrder }) => regOrder.departName,
      drId: ({ regOrder }) => regOrder.drId,
      drName: ({ regOrder }) => regOrder.drName,
      drTitle: ({ regOrder }) => regOrder.drTitle,
      regType: ({ regOrder }) => regOrder.regType,
      sumFee: ({ regOrder }) => regOrder.sumFee,
      regDt: ({ regOrder }) => regOrder.regDt,
      timeSlice: ({ regOrder }) => regOrder.timeSlice
    },
    actions: {
      setRegPoint,
      showAlert
    }
  },
  data: function () {
    return {
      timePoints: [],
      selectionTip: '请选择就诊时段',
      drDesc: ''
    }
  },
  methods: {
    goReg: function (idx) {
      var timePoint = this.timePoints[idx]
      this.setRegPoint(timePoint.seqNo, timePoint.startTime, timePoint.endTime)
      // this.$router.go({ name: 'healthQuestion', query: {departName: this.departName, type: 'reg'} })
      this.$router.go({ name: 'doReg' })
    },
    displayLayer: function () {
      this.showAlert({
        title: '医生描述',
        msg: this.drDesc,
        btnText: '确定'
      }).then(function () {
      })
    }
  },
  ready: function () {
    var myScroll = new IScroll('scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    this.iscroll = myScroll

    var self = this
    this.$ajax.get('GetScheduleTimePoints', 'Doctor', {
      deptId: this.departId,
      doctorId: this.drId,
      regDate: this.regDt,
      regType: this.regType,
      timeSlice: this.timeSlice
    }).then(function (data) {
      self.drDesc = data.DoctorDesc
      self.timePoints = _.map(data.TimePoints, function (val) {
        return {
          seqNo: val.SqNo,
          startTime: val.StartTime,
          endTime: val.EndTime,
          leaveCount: val.LeaveCount,
          totalCount: val.TotalCount
        }
      })

      if (self.timePoints.length === 0) {
        self.selectionTip = '已约满'
      }

      self.$nextTick(function () {
        self.iscroll.refresh()
      })
    })
  },
  route: {
    activate: function (transition) {
      // 阻止页面刷新，刷新时直接跳往首页
      if (transition.from.name === undefined) {
        this.$router.go({ name: 'portal' })
      } else {
        transition.next()
      }
    }
  },
  iscroll: null
}
</script>
