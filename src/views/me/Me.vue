<template>
  <div class="profile">
    <!-- 顶部导航栏 -->
    <NavBar class="navBar">
      <div slot="center">个人中心</div>
    </NavBar>
    <!-- 登录 -->
    <div class="userLogin">
      <div class="headImg">
        <img src="../../assets/images/profile/avatar.svg" />
      </div>
      <div class="userbing">
        <div class="username">
          <h3>pika</h3>
          <p>
            <img src="../../assets/images/profile/phone.svg" />
            <span>暂无绑定手机号</span>
          </p>
        </div>
        <div class="addMoney" @click="getMoney">
          <span>拿钱</span>
        </div>
      </div>
    </div>
    <!-- 金额部分 -->
    <div class="userBalance">
      <div>
        <p>
          <span>{{ userInfo.balance.toFixed(2) }}元</span>
        </p>
        <p>我的余额</p>
      </div>
      <div>
        <p>
          <span>{{ userInfo.discount }}个</span>
        </p>
        <p>我的优惠</p>
      </div>
      <div class="score">
        <p>
          <span>{{ userInfo.point }}分</span>
        </p>
        <p>我的积分</p>
      </div>
    </div>
    <!-- 下边部分 -->
    <div class="userMsg">
      <div class="Cart" @click="toCart">
        <span><img src="../../assets/images/profile/cart.svg" /></span>
        <p>我的购物车</p>
      </div>
      <div class="split" @click="toMyGoods">
        <span><img src="../../assets/images/profile/shopping.svg" /></span>
        <p>
          已购商品
          <i v-if="getMyGoods">{{ getMyGoods }}</i>
        </p>
      </div>
      <div class="message">
        <span><img src="../../assets/images/profile/message.svg" /></span>
        <p>我的消息</p>
      </div>
      <div class="store">
        <span><img src="~../../assets/images/profile/pointer.svg" /></span>
        <p>积分商城</p>
      </div>
      <div class="member">
        <span><img src="../../assets/images/profile/vip.svg" /></span>
        <p>会员卡</p>
      </div>
    </div>
    <!-- 静态弹窗 -->
    <Toast v-if="isShowToast" :msg="msg" />
  </div>
</template>

<script>
// 导入顶部导航栏模块
import NavBar from "../../components/common/navbar/NavBar";

// 导入混合模块使用Toast
import { showToast } from "../../common/mixin";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "profile",
  mixins: [showToast],
  components: {
    NavBar,
  },
  methods: {
    ...mapActions(["addMoney"]),
    toCart() {
      this.$router.push("/shopcart");
    },
    getMoney() {
      this.addMoney().then((res) => {
        this.msg = res;
        this.toastMixin();
      });
    },
    toMyGoods() {
      this.$router.push("/mygoods");
      // this.$router.go(0);
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["getMyGoods"]),
  },
};
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  .navBar {
    color: #fff;
    background-color: var(--color-tint);
  }
  .userLogin {
    display: flex;
    position: relative;
    background-color: var(--color-tint);
    padding: 20px;
    .headImg {
      flex: 1;
      margin-right: 10px;
      img {
        width: 80px;
        border-radius: 100%;
      }
    }
    .userbing {
      flex: 4;
      display: flex;
      .username {
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 12px;
        color: #fff;
        height: 100%;
        h3 {
          font-weight: normal;
        }
        p {
          display: flex;
          img {
            width: 20px;
          }
        }
      }
    }
    .addMoney {
      flex: 2;
      color: #fff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 16px;
      box-shadow: 2px 2px 5px 2px rgba(224, 106, 95, 0.638);
      border-radius: 20px;
    }
  }
  .userBalance {
    display: flex;
    text-align: center;
    div {
      flex: 1;
      padding: 15px 10px;
      border-left: 1px solid #ccc;
      p {
        margin-bottom: 5px;
        span {
          font-size: 25px;
          font-weight: 550;
          color: rgb(224, 105, 95);
          font-size: 18px;
        }
      }
    }
    .score {
      border-right: 1px solid #ccc;
    }
  }
  .userMsg {
    border-top: 20px solid rgb(242, 242, 242);
    div {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      span {
        text-align: center;
        flex: 1;
        img {
          width: 30px;
        }
      }
      p {
        flex: 5;
      }
    }
    .message {
      border-top: 20px solid rgb(242, 242, 242);
    }
    .split {
      i {
        margin-left: 2px;
        padding: 1px 3px;
        background-color: red;
        border-radius: 100%;
        color: #fff;
      }
    }
  }
}
</style>
