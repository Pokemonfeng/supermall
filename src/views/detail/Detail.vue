<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <!-- 滑动 -->
    <scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll">

      <detail-swiper v-if="topImages!=''" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-parm-info :param-info="paramInfo" ref="params"></detail-parm-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParmInfo from './childComps/DetailParmInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from '../../components/common/scroll/Scroll.vue'
  import GoodsList from 'components/contents/goods/GoodsList.vue'


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import { itemListennerMixin, backTopMixin } from 'common/mixin'
  import { debouce } from '../../common/utils'

  import { mapActions } from 'vuex'



  export default {
  name: 'Detail',
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParmInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
    mixins: [itemListennerMixin, backTopMixin],
    data() {
    return {
      iid: null,
      topImages:[],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,

    }
  },
  created() {
    //将保存的数据传入iid
    this.iid = this.$route.params.iid

    // 请求详细数据
    this.getDetail()

    // 请求推荐数据
    this.getRecommend()

    // 监听详情数据加载完成

    // 给getThemeTopY赋值
    this.getThemeTopY = debouce(() => {
      this.themeTopY = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    })


  },
  mounted() {

  },
  destroyed() {
    // 取消detail组件事件总线的监听
    this.$bus.$off("imgLoad", this.imgListener);
  },
  methods: {
    ...mapActions({
      addCart: 'addCart'
    }),
    // 根据iid请求详情数据
    getDetail() {
      getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 店铺信息
      this.shops = new Shop(data.shopInfo)
      // console.log(this.shops);
      // 获取商品详细信息
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo);
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo);
      // 取出评论信息
      if(data.rate.cRate !==0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    },

    getRecommend() {
      getRecommend().then(res => {
      this.recommends = res.data.list
      // console.log(this.recommends);
    })
    },

    imgLoad() {
      this.$refs.scroll.refresh();
      // console.log(this.$refs.scroll.refresh);
      this.getThemeTopY()
      // 图片加载完获取classList
      // this.getClassList();
    },

    // 获取classList
    // getClassList() {
    //   // Array.from() 将伪数组转换成纯数组
    //   this.detailClassList = [];
    //   this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
    //   let maxValue = 10000000;
    //   this.detailClassList.push({ offsetTop: maxValue });
    //   console.log(this.detailClassList);
    // },

    // 跳转到指定位置
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },

    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y
      let length = this.themeTopYs.length
       for(let i =0; i < length - 1; i++) {
        //  if (this.currentIndex != i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = i
        //  }
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = i
        }
       }
       // 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000
    },

    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid

      // 将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.addCart(product).then(res => {
        // console.log(this.$toast)
        this.$toast.Show(res, 2000)
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })
    }

  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
