<template>
  <div class="contaier">
    <div class="weui_cells_title">填写问卷调查：</div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell" :class="{'weui_cell_warn' : invalidName}">
        <div class="weui_cell_hd">
          <label class="weui_label">服务态度</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img1_1" name="1" title="1"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img1_2" name="2" title="1"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img1_3" name="3" title="1"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img1_4" name="4" title="1"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img1_5" name="5" title="1"></i>
        </div>
        <div class="weui_cell_ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui_cell" :class="{'weui_cell_warn' : invalidCertNo}">
        <div class="weui_cell_hd">
          <label class="weui_label">就诊流程</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img2_1" name="1" title="2"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img2_2" name="2" title="2"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img2_3" name="3" title="2"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img2_4" name="4" title="2"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img2_5" name="5" title="2"></i>
        </div>
        <div class="weui_cell_ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui_cell" :class="{'weui_cell_warn' : invalidCellphone}">
        <div class="weui_cell_hd">
          <label class="weui_label">等候时间</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img3_1" name="1" title="3"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img3_2" name="2" title="3"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img3_3" name="3" title="3"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img3_4" name="4" title="3"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img3_5" name="5" title="3"></i>
        </div>
        <div class="weui_cell_ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label">环境卫生</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img4_1" name="1" title="4"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img4_2" name="2" title="4"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img4_3" name="3" title="4"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img4_4" name="4" title="4"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img4_5" name="5" title="4"></i>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label">医德医风</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img5_1" name="1" title="5"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img5_2" name="2" title="5"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img5_3" name="3" title="5"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img5_4" name="4" title="5"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img5_5" name="5" title="5"></i>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label">总体评价</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img6_1" name="1" title="6"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img6_2" name="2" title="6"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img6_3" name="3" title="6"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img6_4" name="4" title="6"></i>
          <i class="fa fa-star fa-2x icon-star-empty-color" style="width:20px;margin-left:15px;" id="star_img6_5" name="5" title="6"></i>
        </div>
      </div>
    </div>
    <div class="weui_cells_title">请写下您的就医体验</div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <textarea class="weui_textarea" v-model="answer" maxlength="50" placeholder="请输入就医体验" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div class="weui_cells_title">请留下您的联系方式</div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_textarea" v-model="phone" maxlength="50" placeholder="请输入联系方式" />
        </div>
      </div>
    </div>
    <p style="padding:10px;" class="am-ft-sm am-ft-gray">
    </p>
  </div>
  <a @click="submitPingjia" href="javascript:;" style="margin:5px 8px;" class="weui_btn weui_btn_primary">提交评价</a>
  <partial name="footer-copyright"></partial>
  </div>
</template>
<style>
.icon-star-color {
  color: #EEEE00;
}

.icon-star-empty-color {
  color: #DDDDDD;
}

.weui_label {
  display: block;
  width: 4em;
}
</style>
<script>
import { showCommonToast, showSuccessToast, hideSuccessToast, addNewCard } from '../../vuex/actions'
import $ from 'jquery'

export default {
  name: 'PaperDetailView',
  vuex: {
    actions: {
      showCommonToast,
      addNewCard,
      showSuccessToast,
      hideSuccessToast
    }
  },
  data: function () {
    return {
      paperId: this.$route.params.paperId,
      socre1: 0,
      socre2: 0,
      socre3: 0,
      socre4: 0,
      socre5: 0,
      socre6: 0,
      answer: '',
      phone: ''
    }
  },
  methods: {
    submitPingjia: function () {
      if (!this.checkUserInput()) {
        return
      }

      var requestParams = {
        paperId: this.paperId,
        socre1: this.socre1,
        socre2: this.socre2,
        socre3: this.socre3,
        socre4: this.socre4,
        socre5: this.socre5,
        socre6: this.socre6,
        answer: encodeURI(this.answer),
        phone: encodeURI(this.phone)
      }

      var self = this
      this.$ajax.get('SubmitPingJia', 'Paper', requestParams).then(function (data) {
        if (data.ResultCode !== '0') {
          this.showCommonToast({ msg: '提交失败，系统或网络发生错误，请稍后再试！' })
          return
        }

        self.showSuccessToast({ msg: '提交评价成功，感谢您的宝贵意见！' }, false)
        window.setTimeout(function () {
          self.hideSuccessToast()
          self.$router.go({ name: 'paperList' })
        }, 1600)
      })
    },
    checkUserInput: function () {
      var self = this
      for (let j = 1; j < 6; j++) {
        if ($('#star_img1_' + j).hasClass('icon-star-color')) {
          self.socre1 = j
        }
      }

      for (let j = 1; j < 6; j++) {
        if ($('#star_img2_' + j).hasClass('icon-star-color')) {
          self.socre2 = j
        }
      }

      for (let j = 1; j < 6; j++) {
        if ($('#star_img3_' + j).hasClass('icon-star-color')) {
          self.socre3 = j
        }
      }

      for (let j = 1; j < 6; j++) {
        if ($('#star_img4_' + j).hasClass('icon-star-color')) {
          self.socre4 = j
        }
      }

      for (let j = 1; j < 6; j++) {
        if ($('#star_img5_' + j).hasClass('icon-star-color')) {
          self.socre5 = j
        }
      }

      for (let j = 1; j < 6; j++) {
        if ($('#star_img6_' + j).hasClass('icon-star-color')) {
          self.socre6 = j
        }
      }

      if (self.socre1 === 0 && self.socre2 === 0 && self.socre3 === 0 && self.socre4 === 0 && self.socre5 === 0 && self.socre6 === 0 && self.answer === '' && self.phone === '') {
        this.showCommonToast({ msg: '请至少完成一项评价' })
        return false
      }

      if (this.answer.length > 50) {
        this.showCommonToast({ msg: '就医体验字数请填写于50字以内' })
        return false
      }

      if (this.phone.length > 50) {
        this.showCommonToast({ msg: '联系方式字数请填写于50字以内' })
        return false
      }

      return true
    }
  },
  ready: function () {
    $(document).ready(function () {
      for (var j = 1; j < 7; j++) {
        for (var i = 1; i < 6; i++) {
          $('#star_img' + j + '_' + i).click(function (e) {
            if ($(this).hasClass('icon-star-empty-color')) {
              for (var m = 1; m < 6; m++) {
                if (m <= $(this).attr('name')) {
                  $('#star_img' + $(this).attr('title') + '_' + m).addClass('icon-star-color').removeClass('icon-star-empty-color')
                } else {
                  $('#star_img' + $(this).attr('title') + '_' + m).addClass('icon-star-empty-color').removeClass('icon-star-color')
                }
              }
            } else {
              for (var n = 1; n < 6; n++) {
                if (n < $(this).attr('name')) {
                  $('#star_img' + $(this).attr('title') + '_' + n).addClass('icon-star-color').removeClass('icon-star-empty-color')
                } else {
                  $('#star_img' + $(this).attr('title') + '_' + n).addClass('icon-star-empty-color').removeClass('icon-star-color')
                }
              }
            }
          })
        }
      }
    })
  }
}
</script>
