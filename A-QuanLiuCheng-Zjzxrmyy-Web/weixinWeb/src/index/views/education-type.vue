<template>
  <div class="container">
    <div class="container">
      <div class="hd">
        <h1 class="page_title">健康大讲堂</h1>
      </div>
    </div>
    <div class="weui_cells weui_cells_access">
      <a @click="goEductionLists(1)" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i class="fa fa-heart icon-color" style="width:20px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>母乳喂养宣教</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a>
      <a @click="goEductionLists(2)" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i class="fa fa-heart icon-color" style="width:20px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>跟着奶爸学</p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </a>
    </div>    
    <partial name="footer-copyright"></partial>
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
  name: 'EducationTypeView',
  methods: {
    goEductionLists: function (type) {
      this.$router.go({ name: 'educationLists', params: { educationType: type } })
    }
  }
}
</script>
