<template>
  <div id="home">
    <nav-bar class="home_navbar">
      <div slot="center" class="home_title">首页</div>
    </nav-bar>
    <tab-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl1" class="tab-control"
        v-show="isTabFixed"></tab-control>

      <scroll class="content" ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">

        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>
        <tab-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommendView from './childComps/HomeRecommendView.vue'
  import FeatureView from './childComps/HomeFeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/contents/tabControl/TabControl.vue'
  import GoodsList from 'components/contents/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/contents/backTop/BackTop.vue'

  import { getHomeMultiData, getHomeGoods } from 'network/home'
  import { itemListennerMixin } from 'common/mixin'




  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListennerMixin],
    data() {
      return {
      banners: [],
      recommends: [],
      goods: {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
      }

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 3.赋值
      // this.$bus.$on('imgLoad', () => {
      //   // console.log(this.$refs.scroll.refresh);
      //   this.$refs.scroll.refresh()
      // })
    },
    activated() {
      // console.log("active");
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrolly()
      // console.log(this.saveY)

    },
    // 使用混入 'common/mixin'
    mounted() {
      // const refresh = this.debounce(this.$refs.scroll.refresh,200)
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()
      // })
    },
    methods: {
      // 获取tabControl的offsetTop
      // 事件监听相关方法
      tabClick(index) {
        // console.log(index)
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      // 判断BackTop显示
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000
        // 决定tabControl是否吸顶(position: flexd)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        // console.log("上拉加载更多")
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh( )
      },
      // 吸顶
      swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop)
      },
      // 网络请求
      getHomeMultiData() {
        getHomeMultiData().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        // console.log(banners)
        this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
        // console.log(res);
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page += 1
         this.$refs.scroll.finishPullUp()
      })
      },
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }

  .home_navbar {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .home_title {
    text-align: center;
  }

  .fixed {
     position: fixed;
     left: 0;
     right: 0;
     top: 44px;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
