/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-09-21 16:51:13
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-10-09 17:35:59
 */
import request from '@/utils/request'

//用户注册
export function userRegister(data) 
{
	return request({
	  url: '/userRegister',
	  method: 'post',
	  data,
	  uniCloud:false
	})
}

//发送用户注册码
export function sendUserRegisterCode(data) 
{
	return request({
	  url: '/sendUserRegisterCode',
	  method: 'post',
	  data,
	  uniCloud:false
	})
}
