import request from '@/utils/request'

// 服务tabbar 获取项目(产品)
export function getGoodsList(data)
{
  return request({
    url: '/getGoodsList',
    method: 'post',
    data,
	uniCloud:false
  })
}

//  获取产品详情
export function getGoodsInfo(data)
{
  return request({
    url: '/getGoodsInfo',
    method: 'post',
    data,
	uniCloud:false
  })
}

// 获取用户购物车
export function getShopCart()
{
  return request({
    url: '/getShopCart',
    method: 'get',
	uniCloud:false
  })
}

// 清空购物车
export function clearShopCart()
{
  return request({
    url: '/clearShopCart',
    method: 'get',
	uniCloud:false
  })
}

// 将产品添加到购车
export function addShopCart(data)
{
  return request({
    url: '/addGoodToShopCart',
    method: 'post',
    data,
	uniCloud:false
  })
}

// 用户下单
export function prepareOrder(data)
{
  return request({
    url: '/prepareOrder',
    method: 'post',
    data,
	uniCloud:false
  })
}
