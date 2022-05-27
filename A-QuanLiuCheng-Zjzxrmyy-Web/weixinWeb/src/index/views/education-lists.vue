<template>
  <div class="container">
  <div class="container">
      <div class="hd">
        <h1 class="page_title">健康大讲堂</h1>
      </div>
    </div>
    <div class="weui_cells weui_cells_access">
      <a v-for="item in items" @click="goEductionDetail(item.id)" class="weui_cell" href="javascript:;">
        <div class="weui_cell_hd">
          <i class="fa fa-heart icon-color" style="width:20px;margin-right:5px;display:block;"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p>{{ item.title }}</p>
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
import _ from 'underscore'

export default {
  name: 'EducationListsView',
  data: function () {
    return {
      educationType: this.$route.params.educationType,
      items: []
    }
  },
  methods: {
    goEductionDetail: function (educationId) {
      this.$router.go({ name: 'educationDetail', params: { educationId: educationId } })
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetEducationLists', 'Education', { educationType: this.educationType }).then(function (data) {
      self.items = _.map(data.EduKlgs, function (val) {
        return {
          id: val.Id,
          title: val.Title
        }
      })
    })
  }
}
</script>
