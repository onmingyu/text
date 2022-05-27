<template>
  <div class="container">
    <div class="weui_cells_title">就诊卡：</div>
    <div class="weui_cells weui_cells_access" style="margin-top: 10px">
      <a @click="selectCard" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i
            class="fa fa-credit-card fa-2x icon-color"
            style="width: 45px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            {{ card ? card.name : "" }}
            <span style="margin-left: 15px" class="blue_tag">{{
              card ? card.type : ""
            }}</span>
          </p>
          <p>{{ card ? card.num : "" }}</p>
        </div>
        <div class="weui_cell_ft">选就诊卡</div>
      </a>
    </div>
    <div v-show="isInp == '0'">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          只支持查询开单日期起15日内化验单
        </p>
      </div>
      <div class="weui_cells weui_cells_access weui_cells_form">
        <div class="weui_cell">
          <div class="weui_cell_hd">
            <label class="weui_label">开单日期</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="date" v-model="startDate" />
          </div>
          <div class="weui_cell_ft"></div>
        </div>
      </div>
    </div>
    <div v-show="isInp == '1'">
      <div class="weui_cells_title">
        <p class="am-ft-sm am-ft-gray">
          <span class="am-ft-orange"><i class="fa fa-info-circle"></i></span>
          住院病人显示当前住院期内所有化验单
        </p>
      </div>
    </div>
    <div class="weui_cells_title" v-show="showEmpty">{{ emptyMsg }}</div>
    <div class="weui_cells weui_cells_access">
      <g-preview :images="images"></g-preview>
    </div>
    <div class="weui_cells weui_cells_access ft-sm" style="margin-top: 10px">
      <a
        @click="viewInspection($index)"
        v-for="inspection in inspections"
        class="weui_cell"
        href="javascript:;"
      >
        <div class="weui_cell_hd">
          <i
            class="fa fa-file-excel-o fa-2x icon-color"
            style="width: 35px; margin-right: 5px; display: block"
          ></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            开单日期：<span class="am-ft-sm am-ft-blue">{{
              inspection.date
            }}</span>
          </p>
          <p>
            化验编号：<span class="am-ft-sm am-ft-blue">{{
              inspection.id
            }}</span>
          </p>
          <p>
            化验名称：<span class="am-ft-sm am-ft-blue">{{
              inspection.name
            }}</span>
          </p>
        </div>
        <div class="weui_cell_bd">
          <p>
            <span v-show="inspection.status != '1'" class="am-ft-gray am-ft-13"
              >未出报告</span
            >
          </p>
        </div>
        <div v-show="inspection.status == '1'" class="weui_cell_ft"></div>
      </a>
    </div>
  </div>
</template>
<style scoped>
.ft-sm p {
  padding: 3px;
  font-size: 12px;
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
<script type="text/ecmascript-6">
import { commonUtil } from '../../plugins/common'
import { showCommonToast, showImagePreview, closeImagePreview } from '../../vuex/actions'
import ImagePreviewComponent from '../../components/image-preview'
import _ from 'underscore'
import Swiper from '../../../node_modules/swiper/dist/js/swiper.jquery.js'

export default {
  name: 'GetInspectionAliView',
  data: function () {
    return {
      startDate: '',
      inspections: [],
      isInp: '0',
      images: [],
      showEmpty: false,
      emptyMsg: ''
    }
  },
  vuex: {
    getters: {
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    },
    actions: {
      showCommonToast,
      showImagePreview,
      closeImagePreview
    }
  },
  components: {
    'g-preview': ImagePreviewComponent
  },
  ready: function () {
    this.startDate = commonUtil.getDateStr(-15)

    this.$watch('startDate', function (val) {
      this.getInspections()
      this.closeImagePreview()
    })

    this.$watch('card', function (val) {
      this.getInspections()
      this.closeImagePreview()
    })

    this.getInspections()
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination'
    })
    this.swiper = mySwiper
    this.closeImagePreview()
    mySwiper.removeSlide(0)
    mySwiper.update()
  },
  methods: {
    selectCard: function () {
      if (navigator.userAgent.indexOf('AlipayClient') > -1) {
        this.$router.go({ name: 'selectCard' })
      } else {
        this.$router.go({ name: 'selectHealthCard' })
      }
    },
    getInspections: function () {
      if (!this.card || this.startDate === '') {
        return
      }
      this.showEmpty = false

      var self = this

      this.$ajax.get('GetInspections', 'Inspection', {
        cardId: this.card.id,
        startDate: this.startDate
      }).then(function (data) {
        if (data.ResultCode !== '0') {
          self.showEmpty = true
          self.emptyMsg = data.ResultMsg
          self.inspections = []
        } else {
          self.inspections = _.map(data.Inspections, function (val) {
            return {
              id: val.Id,
              name: val.Name,
              date: val.Date,
              status: val.Status
            }
          })
          self.isInp = data.IsInp
          if (self.inspections.length <= 0) {
            self.showEmpty = true
            self.emptyMsg = '找不到化验单'
            self.inspections = []
          }
        }
      })
    },
    viewInspection: function (idx) {
      var self = this
      var inspection = this.inspections[idx]
      if (inspection.status === '1') {
        this.$ajax.get('GetInspectionImgUrls', 'Inspection', {
          appNo: inspection.id
        }).then(function (data) {
          if (data.ResultCode !== '0') {
            this.showCommonToast({ msg: data.ResultMsg })
          } else {
            self.images = data.ImgUrls
            self.showImagePreview()
            window.setTimeout(function () {
              self.swiper.update()
            }, 1000)
          }
        })
      }
    }
  },
  swiper: null
}
</script>
