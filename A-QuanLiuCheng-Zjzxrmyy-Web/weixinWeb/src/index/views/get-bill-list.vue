<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">门诊缴费</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <a @click="displayLayer" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>门诊缴费（仅限自费）</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
        <a @click="$router.go({'name': 'selectCard', 'query': {'type': 'bill'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>线下就诊缴费（线下处方流转）</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
  </div>
  <partial name="footer-copyright"></partial>
</template>
<style scoped>
.hd {
  padding: 2em 0;
}

.page_title {
  text-align: center;
  font-size: 34px;
  color: #B86086;
  font-weight: 400;
  margin: 0 15%;
}
</style>
<script>
import { showAlert } from '../../vuex/actions'
export default {
  name: 'GetOrderListView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards
    },
    actions: {
      showAlert
    }
  },
  methods: {
    displayLayer: function () {
      this.$router.go({ name: 'getBill' })
      // this.showAlert({
      //   title: '温馨提示',
      //   msg: '<div style="text-align: center;"><span style="color: #ff0000">线上门诊缴费，暂未开放！</span></div>',
      //   btnText: '确定'
      // }).then(function () {
      // })
    }
  }
}
</script>
