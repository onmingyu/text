<template>
  <div class="container">
    <div class="am-tab">
      <div class="am-tab-item" @click="tabName='menzhen'" :data-tab="tabName === 'menzhen'? 'selected': ''">门诊楼</div>
      <div class="am-tab-item" @click="tabName='zhuyuan'" :data-tab="tabName === 'zhuyuan'? 'selected': ''">住院楼</div>
    </div>
    <div class="weui_panel weui_panel_access" v-show="tabName==='menzhen'" style="margin-bottom:10px;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">一楼</h4>
          <p class="weui_media_desc">挂号\收费处，药房，检验科，急诊科，肌注皮试室，输液注射室，观察室，抢救室，抽血室，
          检验标本分理处，导诊咨询台，取验单处，儿科，儿童神经康复科，心脏中心，内科，中医科，外科，小儿外科，口腔科，皮肤性病科，
          乳腺病中心，乳管内视镜室，门诊手术室，消化内镜室，妇科宫颈疾病诊疗中心，妇科夜诊，孕妇学校
          </p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">二楼</h4>
          <p class="weui_media_desc">儿童保健科，计划免疫接种室，失眠与睡眠障碍专科门诊，儿童学习潜力开发与学习困难专科门诊，
          五官科，超声诊断科，阴道超声检查室，放射科，心电图室，脑电图室，理疗室，中医按摩室，体验中心</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三楼</h4>
          <p class="weui_media_desc">挂号\收费处，产科门诊，胎心监护室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">四楼</h4>
          <p class="weui_media_desc">产前诊断中心，优生遗传咨询，亲子鉴定室，遗传室，病理科，生殖健康科(男性不育)，检验科，
          检验中心，康复科治疗室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">五楼</h4>
          <p class="weui_media_desc">挂号\收费处，妇科，妇科门诊手术室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">六楼</h4>
          <p class="weui_media_desc">信息资料科，多功能厅</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">七楼</h4>
          <p class="weui_media_desc">行政办公室，会议室</p>
        </div>
      </div>
    </div>    
    <div class="weui_panel weui_panel_access" v-show="tabName==='zhuyuan'" style="margin-bottom:10px;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">一楼</h4>
          <p class="weui_media_desc">门诊大厅</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">二楼</h4>
          <p class="weui_media_desc">综合病区</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三楼</h4>
          <p class="weui_media_desc">产科</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">四楼</h4>
          <p class="weui_media_desc">儿科</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">五楼</h4>
          <p class="weui_media_desc">妇科，手术室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">六楼</h4>
          <p class="weui_media_desc">新生儿科</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">七楼</h4>
          <p class="weui_media_desc">生殖医学科</p>
        </div>        
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
.weui_media_box .weui_media_desc {
  text-overflow: inherit;
  -webkit-line-clamp: inherit;
  font-size: 16px;
}
</style>
<script>
export default {
  name: 'DepartDistYuexiuView',
  data: function () {
    return {
      tabName: 'menzhen'
    }
  }
}
</script>
