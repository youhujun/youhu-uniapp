/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-06-08 14:29:17
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-06-08 17:02:41
 */
import request from '@/utils/request'

export function test(data)
{
  return request({
    url: '/test',
    method: 'get',
    data,
	uniCloud:false
  })
}