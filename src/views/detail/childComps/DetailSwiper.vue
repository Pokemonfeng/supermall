<template>
    <swiper class="detail">
      <swiper-item  v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
  name: "DetailSwiper",
  // data () {
  //   return {
  //     topimages: []
  //   }
  // },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },

}
</script>

<style scoped>
  .detail {
    height: 300px;
    overflow: hidden;
  }
</style>
