import {debouce} from './utils'
import BackTop from 'components/contents/backTop/BackTop.vue'
import Toast from "components/common/toast/Toast";


export const itemListennerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null,
      // newRefresh: null
    };
  },
  mounted() {
   // 给防抖函数赋值一个新的函数
  //  console.log(this.$refs.scroll.refresh);
   const refresh = debouce(this.$refs.scroll.refresh, 50);

   // 接收发射的事件总线,并用监听图片变量保存
   this.imgListener = () => {
     refresh();
   };
   this.$bus.$on("imgLoad", this.imgListener);
  //  console.log('我是混入');
 }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

  }
}

export const showToast = {
  components: {
    Toast,
  },
  data() {
    return {
      // 模态框消息
      msg: "",
      // 是否显示模态框
      isShowToast: false,
    };
  },
  methods: {
    toastMixin(timer = 2000) {
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
      }, timer);
    },
  },
};
