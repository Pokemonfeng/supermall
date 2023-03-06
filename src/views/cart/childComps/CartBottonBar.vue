<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
      class="check-buttom"
      :isChecked="isSelectAll"
      @click.native="checkCLick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算： {{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/contents/checkButton/CheckButton.vue'

export default {
  name: "CartBottonBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }

  },
  methods: {
    checkCLick() {
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.Show('请选择购买的商品', 2000)
      }
    }
  }

}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    bottom: 40px;
    z-index: 9;
    line-height: 40px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 90px;
  }



  .check-buttom {
    width: 22px;
    height: 22px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }

</style>
