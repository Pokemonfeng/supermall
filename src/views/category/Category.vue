<template>
  <div class="wrapper">
    <NavBar class="navBar">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="cateBox">
      <div class="cateType">
        <ul>
          <li
            v-for="(item, index) in typeList"
            :key="index"
            :class="{ active: nowIndex == index }"
            @click="typeClick(index, item.maitKey)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="cateGoods" ref="cateGoods">
        <div class="goodsType">
          <div
            class="goodsTypeItem"
            v-for="(item, index) in subCateList"
            :key="index"
          >
            <img :src="item.image" />
            <span class="small">{{ item.title }}</span>
          </div>
        </div>
        <GoodsList :goods="goodList" />
      </div>
    </div>
  </div>
</template>

<script>
// 网络请求部分
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";

// 导入顶部导航栏模块
import NavBar from "@/components/common/navbar/NavBar.vue";

// 引入商品模块
import GoodsList from "@/components/contents/goods/GoodsList";

export default {
  name: "category",
  data() {
    return {
      typeList: [],
      nowIndex: 0,
      subCateList: [],
      goodList: [],
      dataLoad: [],
    };
  },
  components: {
    NavBar,
    GoodsList,
  },
  created() {
    // 获取分类左边栏数据
    getCategory().then(
      ({
        data: {
          data: { category },
        },
      }) => {
        // console.log(category);
        this.typeList = category.list;
        // console.log(this.typeList);
        // 获取分类左边栏所对应的右边各个商品的表面数据
        // 这里先获取第一栏的数据
        this.getSubcategory(this.typeList[this.nowIndex].maitKey);

        // 获取第一栏的商品数据
        this.getCategoryDetail(this.typeList[this.nowIndex].miniWallkey);
      }
    );
  },
  methods: {
    // 点击栏目触发的事件
    typeClick(index, maitKey) {
      this.nowIndex = index;
      // console.log(this.nowIndex);
      this.getSubcategory(maitKey);
      // 点击每一个类型分类视图中返回顶部
      this.$refs.cateGoods.scrollTop = 0;
    },
    // 取左边栏中相对于的上半部分数据
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then(({ data: { data } }) => {
        // console.log(data);
        this.subCateList = data.list;
        // console.log(this.subCateList);
      });
    },
    // 取左边栏中相对于的上半部分商品数据
    getCategoryDetail(miniWallkey) {
      getCategoryDetail(miniWallkey).then(({ data }) => {
        this.goodList = data;
        // console.log(this.goodList);
      });
    },
  },
};
</script>


<style scoped>
.wrapper {
  position: relative;
  height: 100vh;
}
.navBar {
  color: #fff;
  background-color: var(--color-tint);
  font-size: 14px;
}
.cateBox {
  display: flex;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
.cateType {
  flex: 1;
  text-align: center;
  background-color: rgb(247, 245, 247);
  color: rgb(119, 119, 119);
  overflow: auto;
  font-size: 13px;
}
.cateType li {
  padding: 15px 0;
}
.active {
  color: var(--color-high-text);
  font-weight: 550;
  border-left: 5px solid var(--color-high-text);
  font-size: 14px;
}

.cateGoods {
  flex: 2;
  overflow: auto;
  text-align: center;
}
.goodsType {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.goodsTypeItem {
  display: flex;
  flex-direction: column;
  width: 30%;
}
.goodsTypeItem img {
    margin: 0 auto;
    width: 60px;
}
.goodsTypeItem span {
  padding: 10px 0;
}

</style>
