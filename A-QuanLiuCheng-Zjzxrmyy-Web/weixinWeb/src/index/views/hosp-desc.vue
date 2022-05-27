<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">医院介绍</h1>
    </div>
    <div class="am-tab">
      <div class="am-tab-item" @click="showIntroduce" :data-tab="introduceShowed? 'selected': ''">医院简介</div>
      <div class="am-tab-item" @click="showDept" :data-tab="deptShowed? 'selected': ''">科室分布</div>
      <div class="am-tab-item" @click="showComm" :data-tab="commShowed? 'selected': ''">交通</div>
      <div class="am-tab-item" @click="showContact" :data-tab="contactShowed? 'selected': ''">联系我们</div>
    </div>
    <div id="scroll-wrapper" class="scroll-wrapper">
      <div class="scroller">
        <div v-show="introduceShowed">
          <article class="weui_article" >
            <section>
              <section>
                <p style="text-indent:2em;"> 湛江中心人民医院始建于1938年，2017年10月易地搬迁，新院区占地面积216亩、建筑面积34.2万平方米，创下了广东省最大医疗单体建筑的纪录。规划床位3000张，现开放床位2800张，拥有64个临床医技科室。在职员工2800人，其中博士研究生20人，高级职称600人，享受国务院政府特殊津贴专家9人。我院同时是广东省30家高水平医院建设单位之一，广东省博士工作站，湛江市临床医学研究所和湛江市新生儿筛查中心均设在我院。医院先后荣获中国最佳百姓放心示范医院、广东省文明医院等多项荣誉称号。连续三年进入中国地级市医院竞争力100强，连续两年在广东省130家二级以上公立医院群众满意度第三方测评结果中排名粤西地区三级医院首位，在全省三级医院绩效评价中排名第17位。</p>
              </section>
              <section>
                <p style="text-indent:2em;">随着搬迁，医院迎来了跨越式发展的历史性机遇，目前医院正在实施六大战略举措：全面提升信息化程度，助推现代医院管理制度体系的构建完善;出台人才引进培养措施，全面提升人才队伍素质;建设公共科研平台，提升医院的科研创新能力和核心竞争力;加强特色重点专科建设，打造特色显著的环北部湾急救医疗中心，拓展医院医疗服务的承接能力和辐射范围;以患者需求为核心，以“互联网+”为手段优化服务流程，提升医院的医疗服务质量和品牌影响力;美化医院环境，营造人文和谐的医院氛围，为医院的可持续发展和长远布局传承优秀文化基因并融入国际化元素。随着高水平医院建设的有力推进，医院正朝着“技术优良、服务优质、环境优美、人文和谐的医疗研究型的现代化综合医院”大步迈进，将建成医疗、教学、科研协调发展，省内一流，北部湾有影响力的区域性医教研中心。</p>
              </section>
            </section>
          </article>
        </div>
        <div v-show="deptShowed">
          <div class="swiper-container">
            <div class="swiper-pagination"></div>
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/1.jpg">
                  <span>医院平面图1号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="javascript:;">
                  <img src="../../assets/img/2.jpg">
                  <span>医院平面图2号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/3.jpg">
                  <span>医院平面图3号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/4.jpg">
                  <span>医院平面图4号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/5.jpg">
                  <span>医院平面图5号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/6.jpg">
                  <span>医院平面图6号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/7.jpg">
                  <span>医院平面图7号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/8.jpg">
                  <span>医院平面图8号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/9.jpg">
                  <span>医院平面图9号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/10.jpg">
                  <span>医院平面图10号</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a  href="javascript:;">
                  <img src="../../assets/img/11.jpg">
                  <span>医院平面图11号</span>
                </a>
              </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <!-- 如果需要滚动条 -->
            <!--<div class="swiper-scrollbar"></div>-->
            <!--<div class="swiper-pagination"></div>-->
          </div>
        </div>
        <div v-show="commShowed">
          <div class="weui_cells weui_cells_access" style="margin-top:0;">
            <a class="weui_cell" href="https://map.qq.com/m/place/info/uid=15876749993288310932&word=%E6%B9%9B%E6%B1%9F%E4%B8%AD%E5%BF%83%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2&type=point">
              <div class="weui_cell_hd">
                <i class="fa fa-map-marker fa-fw icon-color" style="width:20px;margin-right:5px;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p class="am-ft-sm">湛江市赤坎区南桥街道办源珠路236号湛江中心人民医院</p>
              </div>
              <div class="weui_cell_ft">
              </div>
            </a>
            <div class="weui_panel_hd">乘车路线</div>
            <div class="weui_panel_bd">
              <div class="weui_media_box weui_media_text">
                <h4 class="weui_media_title"> 公交路线</h4>
                <p class="weui_media_desc">医院周边交通便利，多种公交路线途经我院，具体途经我院的公交车有：2K路、27路、34路、39路、11K路，</p>
                <p class="weui_media_desc">康宁加油站下车。</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="contactShowed">
          <div class="weui_cells weui_cells_access" style="margin-top:0;">
            <a class="weui_cell" href="tel:0759-3157999转">
              <div class="weui_cell_hd">
                <i class="fa fa-phone fa-fw icon-color" style="width:20px;margin-right:5px;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p class="am-ft-sm">联系电话</p>
              </div>
              <div class="weui_cell_ft am-ft-sm">
                0759-3157999转
              </div>
            </a>
            <a class="weui_cell" href="http://www.dr0759.com/">
              <div class="weui_cell_hd">
                <i class="fa fa-edge fa-fw icon-color" style="width:20px;margin-right:5px;"></i>
              </div>
              <div class="weui_cell_bd weui_cell_primary">
                <p class="am-ft-sm">网址</p>
              </div>
              <div class="weui_cell_ft am-ft-sm">
                http://www.dr0759.com/
              </div>
            </a>
          </div>
        </div>
        <!-- <div style="height:8px;"></div>
        <div class="am-ft-center am-ft-13 am-ft-darkgray" style="box-shadow:2px 2px 3px 3px silver">
          金融支持：<img src="../../assets/img/cmb.png" alt="logo" width="15" height="15"/>招商银行；技术支持：<img src="../../assets/img/favicon.png" alt="logo"/>倍康益众
          <img src="../../assets/img/liantong.png" alt="logo" width="15" height="15"/>中国联通
        </div>
        <div style="height:8px;"></div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
  .hd {
    padding: 2em 0;
  }

  .page_title {
    text-align: center;
    font-size: 34px;
    color: #0BA6E4;
    font-weight: 400;
    margin: 0 10%;
  }

  .weui_panel {
    position: absolute;
    height: 134px;
    width: 100%;
    top: 0;
    left: 0;
  }

  .weui_icon_warn.weui_icon_msg:before {
    color: #a5a5a5;
  }

  .swiper-container {
    width: 100%;
    height: 476px;
  }

  .swiper-container img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }

  .swiper-slide p{
    margin-top: 10px;
    margin-left: 10px;
  }

  .scroll-wrapper {
    position: absolute;
    top: 175px;
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
</style>
<script>
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.jquery.js'
  import { iScroll as IScroll } from '../../assets/lib/iscroll4/iscroll'
  import $ from 'jquery'
  export default {
    name: 'HospDescView',
    data: function () {
      return {
        introduceShowed: true,
        deptShowed: false,
        commShowed: false,
        contactShowed: false
      }
    },
    methods: {
      showIntroduce: function () {
        if (this.introduceShowed) {
          return
        }
        this.introduceShowed = true
        this.deptShowed = false
        this.commShowed = false
        this.contactShowed = false
        this.$nextTick(function () {
          this.iscroll.refresh()
          this.iscroll.scrollTo(0, 0, 0)
        })
      },
      showDept: function () {
        if (this.deptShowed) {
          return
        }
        this.introduceShowed = false
        this.deptShowed = true
        this.commShowed = false
        this.contactShowed = false
        this.$nextTick(function () {
          this.iscroll.refresh()
          this.iscroll.scrollTo(0, 0, 0)
          if (!this.swiper) {
            var mySwiper = new Swiper('.swiper-container', {
              direction: 'horizontal',
              loop: true,
              autoplay: 3000,
              // 如果需要前进后退按钮
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev',
              pagination: '.swiper-pagination'
              // 如果需要滚动条
              // scrollbar: '.swiper-scrollbar'
            })
            this.swiper = mySwiper
          }
        })
      },
      showComm: function () {
        if (this.commShowed) {
          return
        }
        this.introduceShowed = false
        this.deptShowed = false
        this.commShowed = true
        this.contactShowed = false
        this.$nextTick(function () {
          this.iscroll.refresh()
          this.iscroll.scrollTo(0, 0, 0)
        })
      },
      showContact: function () {
        if (this.contactShowed) {
          return
        }
        this.introduceShowed = false
        this.deptShowed = false
        this.commShowed = false
        this.contactShowed = true
        this.$nextTick(function () {
          this.iscroll.refresh()
          this.iscroll.scrollTo(0, 0, 0)
        })
      }
    },
    ready: function () {
      $('#footer').hide()
      // var self = this
      var myScroll = new IScroll('scroll-wrapper', { hScroll: false, vScroll: true, hScrollbar: false, vScrollbar: false })
      this.iscroll = myScroll
    },
    beforeDestroy: function () {
      this.iscroll.destroy()
      this.iscroll = null
      $('#footer').show()
    },
    iscroll: null,
    swiper: null
  }
</script>
