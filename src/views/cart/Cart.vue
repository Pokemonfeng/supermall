<template>
    <div class="cart">

      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>

      <!-- 商品列表 -->
      <scroll class="content" ref="scroll">
      <cart-list class="cart-list"></cart-list>
      </scroll>

      <!-- 底部汇总 -->
      <cart-botton-bar></cart-botton-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottonBar from './childComps/CartBottonBar.vue'

  import { mapGetters } from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottonBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        cartLength: 'cartLength',
        list: 'cartList'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }

</script>

<style scoped>
  .cart {
    height: 100vh;
    /* position: relative; */
  }

  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    /* font-weight: 700; */
    /* position: relative; */
    /* z-index: 9; */
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    /* width: 100%; */
  }

   .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
</style>
