<template>
  <div class="cart-list">
    <cart-listitem v-for="(item, index) in cartList" :key="index" :product="item"></cart-listitem>
  </div>
</template>

<script>
import CartListitem from './CartListitem.vue'

import { mapGetters  } from 'vuex'


export default {
  name: "CartList",
  components: {
    CartListitem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
}
</script>

<style scoped>


</style>
