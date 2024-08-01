
import request from '@/utils/request'

//手机端测试
export function test(data)
{
  return request({
    url: '/test',
    method: 'post',
    data,
	uniCloud:false
  })
}