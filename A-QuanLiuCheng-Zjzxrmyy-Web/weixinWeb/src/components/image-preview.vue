<template>
   <!--<div class="weui_dialog_alert" v-show="isShow" >-->
      <!--<div class="weui_mask"></div>-->
      <!--<div class="weui_dialog" style="width:98%">-->
        <!--<div class="weui_dialog_bd" style="padding:0">-->
          <div class="swiper-container"   v-show="isShow" >
            <div class="swiper-wrapper">
              <div class="swiper-slide">&nbsp;</div>
              <div v-for="image in images" class="swiper-slide"  >
                <a @click="closeImagePreview" href="javascript:;">
                <img :src="image" />
              </a>
              </div>
            </div>
            <div class="swiper-pagination" ></div>
          </div>
        <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>
<style scoped>
  .swiper-container {
    width: 100%;
    height: 196px;
  }

  .swiper-container img {
    width: 100%;
    height: 100%;
  }

</style>
<script type="text/ecmascript-6">
  import { closeImagePreview } from '../vuex/actions'

  export default {
    name: 'ImagePreviewComponent',
    props: {
      images: Array
    },
    vuex: {
      getters: {
        isShow: ({ global }) => global.imagePreviewIsShow
      },
      actions: {
        closeImagePreview
      }
    }
  }
</script>
