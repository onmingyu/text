<template>
  <div class="container">
    <div class="hd">
      <h1 class="page_title">城市服务</h1>
    </div>
  </div>
  <div v-show="type=='my_danju'" class="weui_cells weui_cells_access">
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
  </div>
  <div v-show="type=='service_dangtianguahao'" class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'departList', 'query': {'branchName': 'panyu', 'purpose': 'appt'}})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-stethoscope icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>在线挂号</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getOtherAppt'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-tags icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>在线取号</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getQueue'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-reorder icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>候诊队列</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>    
  </div>
  <div v-show="type=='service_qubaogaodan'" class="weui_cells weui_cells_access">
    <a @click="$router.go({'name': 'getCheck'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-heartbeat icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>取检查单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>
    <a @click="$router.go({'name': 'getInspection'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-file-excel-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>取化验单</p>
      </div>
      <div class="weui_cell_ft">
      </div>
    </a>    
  </div>
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
  name: 'CityPortalView',
  data: function () {
    return {
      type: ''
    }
  },
  ready: function () {
    this.type = this.$route.query.type
  }
}
</script>
