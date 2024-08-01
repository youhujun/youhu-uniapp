
import request from '@/utils/request'

//app 一键登录
export function getLocationRegionByH5(data)
{
  return request({
    url: '/getLocationRegionByH5',
    method: 'post',
    data,
	uniCloud:false
  })
}