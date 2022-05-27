<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">门住服务</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'menuInpay'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-stethoscope icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>住院服务</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'departList', 'query': { 'purpose': 'hosp' }})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-money icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>门诊安排</p>
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
  color: #007aff;
  font-weight: 400;
  margin: 0 15%;
}
</style>
<script>
export default {
  name: 'ServiceListView'
}
</script>
