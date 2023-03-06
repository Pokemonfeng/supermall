<template>
  <div class="wrapper">
  <ul  class="content">
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
  </ul>

  </div>

</template>

<script>
import BScroll from 'better-scroll'

  export default {
     name: "Category",
     data() {
       return {
       }
     },

    //  created() {
    //    new BScroll('.wrapper',{
    //    })
    //  },
     mounted() {
       this.scroll = new BScroll('.wrapper',{
       })
     }
  }
</script>

<style scoped>

  .wrapper {
    height: 150px;
    background-color: rebeccapurple;
    /* overflow: hidden; */
  }
  /* .content {
    height: 200px;
    color: #fff;
    overflow: hidden;
    overflow-y: scroll;
  } */
</style>
