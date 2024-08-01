/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-09-21 16:51:13
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-10-09 17:35:59
 */
import request from '@/utils/request'

/**
 * 微信公众号登录-1获取授权码
 */
export function wechatOfficialGetCodeByLogin()
{
	return request({
	  url: '/wechatOfficialGetCodeByLogin',
	  method: 'post',
	  uniCloud:false
	})
}

/**
 * 微信公众号登录-2获取授权
 * @param {Object} data 
 */
export function wecahtOfficialAuthToLogin(data)
{
	return request({
	  url: '/wecahtOfficialAuthToLogin',
	  method: 'post',
	  data,
	  uniCloud:false
	})
}

/**
 * 微信公众号静默授权-1获取授权码
 */
export function wechatOfficialGetCode()
{
	return request({
	  url: '/wechatOfficialGetCode',
	  method: 'get',
	  uniCloud:false
	})
}

/**
 * 微信公众号登录-2获取授权
 * @param {Object} data 
 */
export function wecahtOfficialAuth(data)
{
	return request({
	  url: '/wecahtOfficialAuth',
	  method: 'post',
	  data,
	  uniCloud:false
	})
}

//app 一键登录
export function univerifyLogin(data)
{
  return request({
    url: '/univerifyLogin',
    method: 'get',
    data,
	uniCloud:false
  })
}

//发送手机验证码
export function sendVerifyCode(data)
{
   return request({
    url: '/sendVerifyCode',
    method: 'get',
    data,
	uniCloud:false
  })
}

//手机号 验证码登录
export function loginByPhone(data)
{
   return request({
    url: '/loginByPhone',
    method: 'get',
    data,
	uniCloud:false
  })
}



//发送手机验证码 忘记密码
export function sendPasswordCode(data)
{
   return request({
    url: '/sendPasswordCode',
    method: 'get',
    data,
	uniCloud:false
  })
}

//重置手机密码
export function restPasswordByPhone(data)
{
   return request({
    url: '/restPasswordByPhone',
    method: 'post',
    data,
	uniCloud:false
  })
}

//手机号 密码登录
export function loginByUser(data)
{
   return request({
    url: '/loginByUser',
    method: 'post',
    data,
	uniCloud:false
  })
}

//检测是否登录
export function checkIsLogin() 
{
	return request({
	  url: '/checkIsLogin',
	  method: 'get',
	  uniCloud:false
	})
}

//获取用户信息
export function getUserInfo() 
{
	return request({
	  url: '/getUserInfo',
	  method: 'get',
	  uniCloud:false
	})
}

//手机号 绑定验证码
export function sendBindCode(data)
{
   return request({
    url: '/sendBindCode',
    method: 'post',
    data,
	uniCloud:false
  })
}

//微信登录绑定手机号
export function bindPhone(data)
{
   return request({
    url: '/bindPhone',
    method: 'post',
    data,
	uniCloud:false
  })
}

//退出
export function logout()
{
	return request({
	  url: '/logout',
	  method: 'post',
	  uniCloud:false
	})
}
