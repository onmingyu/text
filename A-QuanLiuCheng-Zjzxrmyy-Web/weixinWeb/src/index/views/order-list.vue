<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">订单记录</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'regOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-stethoscope icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>挂号订单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'billOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-money icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>缴费订单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
     <a @click="$router.go({'name': 'apptOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-money icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>预约号交费</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'prepayOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-hospital-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>住院预缴金订单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'doDnaOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-hospital-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>核酸检测登记订单</p>
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
  name: 'OrderListView'
}
</script>
