import {
  ADD_COUNTER,
  ADD_TO_CAET
} from './mutation-type.js'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
          // state.cartList.push(payload)
    // 查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前的商品数量+1')
    }else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CAET, payload)
      resolve('添加了新的商品')
    }
    })

  }
}
