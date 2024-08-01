import request from '@/utils/request'

// 获取我的订单
export function getMyOrder(data)
{
  return request({
    url: '/getMyOrder',
    method: 'post',
	data,
	uniCloud:false
  })
}