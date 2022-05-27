<template>
  <div class="container">
    <div class="select">
      <div class="weui_cells_title">请选择就诊卡：</div>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell weui_cell_switch">
          <div class="weui_cell_hd weui_cell_primary">将选择的卡作为默认卡</div>
          <div class="weui_cell_ft">
            <input class="weui_switch" type="checkbox" checked="checked" v-model="selectAsDefault">
          </div>
        </div>
      </div>
      <div class="weui_cells weui_cells_access">
        <a @click="clickCard($index)" v-for="cd in cards" class="weui_cell" href="javascript:;">
          <div class="weui_cell_hd">
            <i class="fa fa-credit-card fa-2x icon-color" style="width:35px;margin-right:15px;display:block;"></i>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>{{cd.name | hideMiddle}} <span style="margin-left:15px;" class="blue_tag">{{cd.type}}</span></p>
            <p>{{cd.num}}</p>
          </div>
          <div class="weui_cell_ft">
            <span v-show="cd.isDefault" class="orange_tag">默认</span>
          </div>
        </a>
      </div>
      <div class="button_sp_area" style="text-align:center">
        <a @click="goAddBinding" href="javascript:;" style="font-size:18px;margin-right:16px;" class="weui_btn weui_btn_mini weui_btn_primary">绑就诊卡</a>
       <!--  <a @click="goAddNew" href="javascript:;" style="font-size:18px;margin-left:16px;" class="weui_btn weui_btn_mini weui_btn_primary">初诊建卡</a> -->
      </div>
    </div>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<style scoped>
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
import { selectCard, showCommonToast, addBindingCard } from '../../vuex/actions'

export default {
  name: 'SelectCardView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      selectCard,
      showCommonToast,
      addBindingCard
    }
  },
  data: function () {
    return {
      selectAsDefault: true
    }
  },
  methods: {
    clickCard: function (idx) {
      var cardId = this.cards[idx].id
      this.selectCard(cardId, this.selectAsDefault)
      if (this.$route.query.nextRoutePath) {
        this.$router.replace({ path: this.$route.query.nextRoutePath })
      } else {
        window.history.go(-1)
      }
    },
    goAddBinding: function () {
      this.$router.go({ name: 'addBindingCard' })
    },
    goAddNew: function () {
      this.$router.go({ name: 'addNewCard' })
    }
  }
}
</script>
