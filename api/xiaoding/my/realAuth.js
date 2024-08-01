import request from '@/utils/request'

// 实名认证申请
export function realAuthApply(data)
{
  return request({
    url: '/realAuthApply',
    method: 'post',
    data,
	uniCloud:false
  })
}
