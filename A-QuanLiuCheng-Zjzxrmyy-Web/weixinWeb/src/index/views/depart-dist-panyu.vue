<template>
  <div class="container">
    <div class="am-tab">
      <div class="am-tab-item" @click="tabName='menzhen'" :data-tab="tabName === 'menzhen'? 'selected': ''">门诊楼</div>
      <div class="am-tab-item" @click="tabName='yiji'" :data-tab="tabName === 'yiji'? 'selected': ''">医技楼</div>
      <div class="am-tab-item" @click="tabName='zhuyuan'" :data-tab="tabName === 'zhuyuan'? 'selected': ''">住院楼</div>
    </div>
    <div class="weui_panel weui_panel_access" v-show="tabName==='menzhen'" style="margin-bottom:10px;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">一楼</h4>
          <p class="weui_media_desc">收费、挂号处，医学美容科，导诊台，急诊科（输液室、肌注室），儿科急诊，小儿外科门急诊， 内科急诊，门诊西药房，静脉输液配置中心，饭堂便民服务处，自助银行
          </p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">二楼</h4>
          <p class="weui_media_desc">妇科门诊，中医科，内科门诊，新生儿外科门诊，内镜中心，皮肤性病科门诊，口腔科门诊，仓库，
          转运中心，中药房，心电图室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三楼</h4>
          <p class="weui_media_desc">儿童保健科、全优+，儿科门诊，康复科理疗室，中医科理疗室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三A楼</h4>
          <p class="weui_media_desc">产前诊断中心门诊，产科门诊（含孕妇学校），超声科一区</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">五楼</h4>
          <p class="weui_media_desc">眼科，耳鼻咽喉科，乳腺科，体检中心</p>
        </div>
      </div>
    </div>
    <div class="weui_panel weui_panel_access" v-show="tabName==='yiji'" style="margin-bottom:10px;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">一楼</h4>
          <p class="weui_media_desc">综合病区住院部（内科、口腔科、美容科、眼科、耳鼻咽喉科、肥胖中心），病案科
          </p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">二楼</h4>
          <p class="weui_media_desc">腔镜中心、妇科门诊手术室，超声科二区，保健部</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三楼</h4>
          <p class="weui_media_desc">检验科</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三A楼</h4>
          <p class="weui_media_desc">产前诊断中心实验室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">五楼</h4>
          <p class="weui_media_desc">生殖中心</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">六楼</h4>
          <p class="weui_media_desc">生殖中心实验室，产前诊断中心实验室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">七楼</h4>
          <p class="weui_media_desc">信息科，多功能厅，小会议室，另址新建办公室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">八楼</h4>
          <p class="weui_media_desc">行政中心（含财务科）</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">九楼</h4>
          <p class="weui_media_desc">病理科</p>
        </div>
      </div>
    </div>
    <div class="weui_panel weui_panel_access" v-show="tabName==='zhuyuan'" style="margin-bottom:10px;">
      <div class="weui_panel_bd">
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">一楼</h4>
          <p class="weui_media_desc">入院处，放射科（含MRI），出入院结算处，基层检验协作科，中心药房，佑元庄大药房，
          妇儿驿站
          </p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">二楼</h4>
          <p class="weui_media_desc">心胸外科，麻醉科、手术室，供应室</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三楼</h4>
          <p class="weui_media_desc">康复科病房，脑电图室，员工宿舍</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">三A楼</h4>
          <p class="weui_media_desc">产科一区，产科分娩中心</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">五楼</h4>
          <p class="weui_media_desc">产科二区</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">六楼</h4>
          <p class="weui_media_desc">新生儿科、NICU，新生儿外科</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">七楼</h4>
          <p class="weui_media_desc">儿科、PICU</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">八楼</h4>
          <p class="weui_media_desc">妇科一区，妇科二区，妇科三区（生殖中心病房）</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">九楼</h4>
          <p class="weui_media_desc">小儿外科病房、外科病房</p>
        </div>
        <div class="weui_media_box weui_media_text">
          <h4 class="weui_media_title">十楼</h4>
          <p class="weui_media_desc">乳腺科</p>
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
  name: 'DepartDistView',
  data: function () {
    return {
      tabName: 'menzhen'
    }
  }
}
</script>
