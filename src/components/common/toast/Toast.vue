<template>
  <transition name="silde-fade">
    <div class="toast" v-show="isShow">{{message}}</div>
  </transition>

</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
      //   show: {
      // type: Boolean,
      // default: false
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      Show(message = '默认文字', duration = 2000) {
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration);
      }
    },

  }

</script>

<style scoped>
  .silde-fade-enter {transition: all 2s linear;}
  /* .silde-fade-leave-active {transition: all 2s linear;} */
  /* .slide-fade-enter, .slide-fade-leave-to{transform: translateX(5px);opacity: 0;} */
  .toast {
    /* transition: all 1s linear; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 9;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }


</style>
