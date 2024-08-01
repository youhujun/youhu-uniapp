import request from '@/utils/request'

// 获取订单的产品技师价格
export function getOrderGoodsAndtechnician(data)
{
  return request({
    url: '/getOrderGoodsAndtechnician',
    method: 'post',
	data,
	uniCloud:false
  })
}

// 用户订单付款
export function payOrder(data)
{
  return request({
    url: '/payOrder',
    method: 'post',
	data,
	uniCloud:false
  })
}

// 用户提交订单
export function commitOrder(data)
{
  return request({
    url: '/commitOrder',
    method: 'post',
	data,
	uniCloud:false
  })
}