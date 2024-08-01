import request from '@/utils/request'

// 首页获取推荐技师
export function getIndexRecommendTechnician(data)
{
  return request({
    url: '/getIndexRecommendTechnician',
    method: 'post',
    data,
	uniCloud:false
  })
}
