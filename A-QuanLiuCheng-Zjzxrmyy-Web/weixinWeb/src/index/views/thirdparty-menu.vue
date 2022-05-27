<template>
<div>   
  <div class="container">
    <div class="hd">
      <h1 class="page_title">健康园地</h1>
    </div>
  </div>
  <div class="weui_cells weui_cells_access">
    <!-- <a @click="$router.go({'name': 'prepayOrderList'})" class="weui_cell" href="javascript:;">
      <div class="weui_cell_hd">
        <i class="fa fa-hospital-o icon-color" style="width:20px;margin-right:5px;display:block;"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>广东母子健康e手册</p>
      </div>
      <div class="weui_cell_ft">
      </div>
      <wx-open-launch-weapp>

      </wx-open-launch-weapp>
    </a> -->
    <div class="weui_cell" style="height: 80px;box-sizing: border-box;">
        <wx-open-launch-weapp
          id="launch-btn"
          username="gh_19b96d135b12"
          path="pages/boot"
          style="position:absolute;top:0;right:0;bottom:0;left:15px;overflow:hidden;"
        >
          <script type="text/wxtag-template">
            <style>
              .weui_cell_primary {
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                font-size 18px;
                colo: #D94600;
              }
              .weui_cell_ft {
                text-align: right;
                color: #888;
              }
              .weui_cells_access .weui_cell_ft:after {
                content: " ";
                display: inline-block;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                height: 5px;
                width: 5px;
                border-width: 2px 2px 0 0;
                border-color: #c8c8cd;
                border-style: solid;
                position: relative;
                top: -2px;
                top: -1px;
                margin-left: .3em;
              }
              .weui-cell {
                display: flex;
                align-items: center;
              }
            </style>
            <div class="weui-cell">
              <!-- <div class="weui_cell_hd">
                <img src="http://wx.gdbkyz.com/gy1y.jpg" style="width:60px;margin-right:10px;display:block;"></img>
              </div> -->
              <div class="weui_cell_bd weui_cell_primary">
                <p style="margin-block:27px;">广东母子健康e手册</p>
              </div>
            </div>
          </script>
        </wx-open-launch-weapp>
        <div class="weui_cell_ft" style="position: absolute;right: 16px;"></div>
    </div>
  </div>
</div>
  <!-- <partial name="footer-copyright"></partial> -->
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
  name: 'ThirdpartyMenuView'
}
</script>
