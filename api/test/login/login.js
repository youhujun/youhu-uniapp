/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-09-21 16:51:13
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-10-09 17:35:59
 */

import request from '@/utils/request'

//app 一键登录
export function loginByUserId(data)
{
  return request({
    url: '/loginByUserId',
    method: 'post',
    data,
	uniCloud:false
  })
}