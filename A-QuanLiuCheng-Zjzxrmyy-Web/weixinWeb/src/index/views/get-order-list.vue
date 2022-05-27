<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">检查检验单查询</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'getHsCheck'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>核酸报告查询</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getInspection', 'query': {'type': '1'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检查：病理结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
        <a @click="$router.go({'name': 'getInspection', 'query': {'type': '2'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检查：超声结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
        <a @click="$router.go({'name': 'getInspection', 'query': {'type': '3'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检查：放射结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
        <a @click="$router.go({'name': 'getInspection', 'query': {'type': '4'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检查：内镜结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
        <a @click="$router.go({'name': 'getInspection', 'query': {'type': '5'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
         <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检查：心电结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="menuInpay" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
      <!-- <i class="fa fa-file-excel-o fa-2x icon-color"></i> -->
        <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>新生儿筛查结果</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getCheck'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
      <!-- <i class="fa fa-file-excel-o fa-2x icon-color"></i> -->
        <i class="fa fa-file-excel-o fa-2x icon-color" style="width:40px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>检验单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <!--   -->
  <!--   <a @click="$router.go({'name': 'prepayOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-hospital-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>住院预缴金订单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'dinnerOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-yelp icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>点餐订单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a> -->
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
export default {
  name: 'GetOrderListView',
  methods: {
    menuInpay: function () {
      window.location.href = 'http://zsxcy.dr0759.cn:8082/zjzxyybbcx/default.aspx'
    }
  }
}
</script>
