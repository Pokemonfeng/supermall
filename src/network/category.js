import { request } from './request'

// 获取分类数据

export function getCategory() {
  return request({
    url: '/category'
  })
}


// 获取每个分类栏的数据

export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

// 获取每个分类里面的商品信息
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type,
    },
  });
}
