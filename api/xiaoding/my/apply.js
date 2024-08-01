import request from '@/utils/request'

// 用户申请技师
export function applyTechnician(data)
{
  return request({
    url: '/technicianApply',
    method: 'post',
    data,
	uniCloud:false
  })
}