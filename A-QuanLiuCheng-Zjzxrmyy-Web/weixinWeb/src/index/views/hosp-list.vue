<template>
  <div class="container">
 <!--  <div style="padding: 2em 0;">
    <h2 style="color:#de7c23;text-align:center;font-size:34px;font-weight:400;margin:0 15%;">在线挂号</h2>
  </div> -->
    <div class="weui_cells weui_cells_access">
      <a @click="$router.go({'name': 'departList', 'query': {'purpose': 'appt', 'day': 'today', 'branch': '门诊分区'}})" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <img src="../../assets/img/zjzx.jpg" style="width:60px;margin-right:10px;display:block;"></img>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>挂当天号</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a>
      <a @click="$router.go({'name': 'departList', 'query': {'purpose': 'appt', 'branch': '门诊分区'}})" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <img src="../../assets/img/zjzx.jpg" style="width:60px;margin-right:10px;display:block;"></img>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>预约挂号</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a>
      <!-- <a @click="doBinding()" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <img src="../../assets/img/zjzx.jpg" style="width:60px;margin-right:10px;display:block;"></img>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>核酸检测登记(演练)</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a> -->
      <a @click="$router.go({'name': 'doDna'})" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <img src="../../assets/img/zjzx.jpg" style="width:60px;margin-right:10px;display:block;"></img>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>核酸检测登记(医院指导专用)</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a>
    </div>

    <!-- <div>
      <p style="padding:10px;font-size: 16px; text-align: justify;" class="am-ft-sm am-ft-gray">
        <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
        <span style="color: grey;">预约说明</span>
        <br>
        <span style="color: grey;">&emsp;1.&emsp;无身份证号者无法在微信客户端办理建档手续，需到现场挂号处建档、绑卡，才能网上预约挂号、缴费。</span>
        <br>
        <span style="color: grey;">&emsp;2.&emsp;通过微信客户端建档的公医、医保或其他现场报销的患者，就诊时务必向接诊医生出示身份证、医保卡等证件，否则将影响当天的报销。</span>
        <br>
        <span style="color: grey;">&emsp;3.&emsp;您可挂当天或预约一周之内的医生号源。</span>
        <br>
        <span style="color: grey;">&emsp;4.&emsp;成功预约后如不能前来就诊，须在就诊前一天的24点前自行在微信端取消预约，诊金原路退回；就诊当天则需到现场取消及退费。过了预约就诊班次时间，因占用公众号源，诊金不予退还。</span>
        <br>
        <span style="color: grey;">&emsp;5.&emsp;预约挂号成功后，请查阅＂电子挂号单”。请在就诊当天预约就诊时间前15分钟到指定诊室外报到（或手机自助报到）、等候呼叫、就诊。迟到30分钟系统将自动安排到队伍最后。</span>
        <br>
        <span style="color: grey;">&emsp;6.&emsp;每个病人接诊时间有差异，准确就诊时间以现场为准。</span>
        <br>
        <span style="color: grey;">&emsp;7.&emsp;爽约累计达到3次，将暂停微信自助服务一个月。</span>
        <br>
        <span style="color: grey;">&emsp;8.&emsp;先填写新冠肺炎承诺书再到诊室就诊。</span>
      </p>
    </div> -->
  </div>
</template>
<!-- <style scoped>
  .hd {
    padding: 2em 0;
  }
  .hdr {
    position: fixed;
    /*bottom: 100;*/
    width: 100%;
    overflow: hidden;
    left: 0;
  }
  .weui_cell_bd {
    font-size: 18px;
    color: #D94600;
  }
  .desc-scroll-wrapper {
    position: absolute;
    top: 110px;
    left:15px;
    right: 15px;
    bottom: 0;
    overflow: hidden;
  }
  .desc-scroller {
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
  .weui_text_area {
    position:fixed;
    top: 150px;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    overflow: hidden;
  }
  .page_title {
    text-align: center;
    font-size: 34px;
    color: #B86086;
    font-weight: 400;
    margin: 0 15%;
  }
</style> -->
<script>
  import { showCommonToast } from '../../vuex/actions'
  export default {
    name: 'HospListView',
    vuex: {
      actions: {
        showCommonToast
      }
    },
    methods: {
      doBinding: function () {
        this.showCommonToast({ msg: '暂时未开启' })
      }
    }
    // ready: function () {
    //   var myScroll = new IScroll('desc-scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
    //   this.iscroll = myScroll
    // },
    // beforeDestroy: function () {
    //   this.iscroll.destroy()
    //   this.iscroll = null
    // },
    // iscroll: null
  }
</script>
