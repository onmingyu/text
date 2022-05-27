<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">住院服务</h1>
    </div>
  <div class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'doPrepay'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-stethoscope icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>预交金充值</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getInpatientBill'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-stethoscope icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>每日清单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
  </div>
  </div>
</template>
<style scoped>
.hd {
  padding: 0.5em 0;
}

.page_title {
  text-align: center;
  font-size: 34px;
  color: #27A291;
  font-weight: 400;
  margin: 0 15%;
}
</style>
<script>
export default {
  name: 'MenuInpayView'
}
</script>
