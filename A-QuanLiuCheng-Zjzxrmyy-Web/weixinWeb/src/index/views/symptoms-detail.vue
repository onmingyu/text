<template>
	<div class="container">
		<div class="weui_panel weui_panel_access">
			<div class="weui_panel_bd">
				<div class="am-tab">
					<div class="am-tab-item" @click="showCategory(0)" :data-tab="tabName==0? 'selected': ''">简介</div>
					<div class="am-tab-item" @click="showCategory(1)" :data-tab="tabName==1? 'selected': ''">治疗</div>
					<div class="am-tab-item" @click="showCategory(2)" :data-tab="tabName==2? 'selected': ''">诊断</div>
					<div class="am-tab-item" @click="showCategory(3)" :data-tab="tabName==3? 'selected': ''">病因</div>
					<!--<div class="am-tab-item" @click="showCategory(4)" :data-tab="tabName==4? 'selected': ''">科室</div>-->
				</div>
			</div>
		</div>
		<div id="list-scroll-wrapper" class="list-scroll-wrapper" >
			<div class="scroller">
				<div class="weui-media-box weui-media-box_text" v-show="tabName===0">
					<!--<h4 class="weui-media-box__title">标题二</h4>-->
					<p class="weui-media-box_desc">	{{{intro}}}</p>
				</div>
				<div class="weui-media-box weui-media-box_text" v-show="tabName===1">
					<p class="weui-media-box_desc">	{{{treatmentDescr}}}</p>
				</div>
				<div class="weui-media-box weui-media-box_text" v-show="tabName===2">
					<p class="weui-media-box_desc">	{{{diagnosisDescr}}}</p>
				</div>
				<div class="weui-media-box weui-media-box_text" v-show="tabName===3">
					<p class="weui-media-box_desc">	{{{pathogenyDescr}}}</p>
				</div>
			</div>
		</div>
		<div class="weui_panel weui_panel_access list-depart">
      <div class="weui-media-box_title"><h4 style="color:#0ae">推荐科室：</h4></div>
			<div class="weui_panel_bd">
				<div class="weui-media-box weui-media-box_text">
					<div  class="weui_cells weui_cells_access" style="margin-top:-1px;">
						<a v-for="d in departs " @click="goToSelectRegSliceList(d.DeptId)" class="weui_cell" href="javascript:;">
							<div class="weui_cell_hd">
								<i class="fa fa-group icon-color" style="width:20px;margin-right:5px;display:block;"></i>
							</div>
							<div class="weui_cell_bd weui_cell_primary">
								<p>{{d.DeptName}}</p>
							</div>
							<div class="weui_cell_ft">
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<style scoped>
	.weui_navbar_item {
		padding: 6px 0;
		color: #000;
	}

	.weui_bar_item_on {
		color: #FFF;
		background: #0ae;
	}

	.weui_tab_bd {
		padding-bottom: 34px;
	}

	.list-scroll-wrapper {
		position: absolute;
		top: 44px;
		left: 0;
		right: 0;
		height:250px;
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

	.list-depart{
		position: absolute;
		top: 294px;
		left: 0;
		right: 0;
	}
</style>
<script>
  import { iScroll as IScroll } from '../../assets/lib/iscroll4/iscroll'
  export default {
    name: 'SymptomsDetailView',
    data: function () {
      return {
        tabName: 0,
        symptomsId: this.$route.params.symptomsId,
        diagnosisDescr: '',
        intro: '',
        treatmentDescr: '',
        pathogenyDescr: '',
        departs: []
      }
    },
    methods: {
      goToSelectRegSliceList: function (departId) {
        this.$router.go({name: 'selectRegSlice', params: {departId: departId, drId: -1}})
      },
      showCategory: function (type) {
        this.tabName = type
        this.$nextTick(function () {
          this.listIScroll.refresh()
          this.listIScroll.scrollTo(0, 0, 0)
        })
      }
    },
    ready: function () {
      var self = this

      this.listIScroll = new IScroll('list-scroll-wrapper', {
        hScroll: false,
        vScroll: true,
        hScrollbar: false,
        vScrollbar: false
      })
      this.$ajax.get('GetSymptomsBySymptomsId', 'DaoZhen', {symptomsId: self.symptomsId}).then(function (data) {
        if (data.ResultCode === '0') {
          self.diagnosisDescr = data.DiagnosisDescr
          self.intro = data.Intro
          self.treatmentDescr = data.TreatmentDescr
          self.pathogenyDescr = data.PathogenyDescr
          self.departs = data.Departs
        }
        self.$nextTick(function () {
          self.listIScroll.refresh()
          self.listIScroll.scrollTo(0, 0, 0)
        })
      })
    },
    beforeDestroy: function () {
      this.listIScroll.destroy()
      this.listIScroll = null
    },
    listIScroll: null
  }
</script>
