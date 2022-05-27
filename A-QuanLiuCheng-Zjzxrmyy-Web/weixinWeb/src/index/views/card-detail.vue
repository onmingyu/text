<template>
  <div class="container">
    <div class="weui_cells_title">电子就诊卡</div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">卡类型</span>
            <span>{{type}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">姓名</span>
            <span>{{name | hideMiddle}}</span>
          </p>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>
            <span style="display:inline-block;width:60px;">卡号</span>
            <span>{{num}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="weui_cells_title">条形码</div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div style="text-align:center;" class="weui_cell_bd weui_cell_primary">
          <img id="barcode" />
        </div>
      </div>
    </div>
    <a @click="back" href="javascript:;" style="margin:10px 8px;" class="weui_btn weui_btn_primary">返回</a>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<script>
import JsBarcode from '../../assets/lib/jsbarcode/jsbarcode'
import _ from 'underscore'

export default {
  name: 'CardDetailView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    }
  },
  data: function () {
    return {
      id: 0,
      type: '',
      name: '',
      num: ''
    }
  },
  ready: function () {
    this.id = parseInt(this.$route.params.cardId)
    var card = _.findWhere(this.cards, { id: this.id })
    this.type = card.type
    this.name = card.name
    this.num = card.num

    JsBarcode('#barcode', this.num, {
      format: 'CODE128',
      displayValue: true,
      fontSize: 24,
      lineColor: '#000',
      height: 66,
      textAlign: 'center'
    })
  },
  methods: {
    back: function () {
      window.history.go(-1)
    }
  }
}
</script>
