/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-09-24 16:34:00
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-10-09 17:42:27
 */

import store from '@/store'
import {  isAgreePrivacy } from '@/utils/auth'
import { checkIsLogin,wechatOfficialGetCode } from '@/api/login/login'

import { isWechat } from '@/utils/wechat'

// #ifdef APP-PLUS
const univerifyManager = uni.getUniverifyManager()
// #endif

// 预登陆
export function preLogin() 
{
  
  // #ifdef APP-PLUS
   if (!store.getters.token) 
   {
        if(isAgreePrivacy())
        {
            univerifyManager.preLogin({
              provider: 'univerify',
              success: (res) => 
			  {
            	  console.log('preLogin success: ', res)
              },
              fail: (res) => 
			  {
            	  console.log('preLogin fail res: ', res)
            	 
              }
            })
        }
        else
        {
            const options = 
            {
                success:function(response)
                {
                    console.log("success  " + JSON.stringify(response));
					if (response.code == 1) {
						console.log('同意了')
						//用户已同意隐私政策，可以使用其它业务功能
						plus.runtime.restart();
						
						univerifyManager.preLogin({
						  provider: 'univerify',
						  success: (res) => 
						  {
							  console.log('preLogin success: ', res)
						  },
						  fail: (res) => 
						  {
							  console.log('preLogin fail res: ', res)
						  }
						})
					}
				},
				fail: function(response) {
					console.log("fail  " + JSON.stringify(response));
				}
			}

			plus.runtime.showPrivacyDialog(options);
		}

	}
	// #endif
}

//后端校验是否登录
export function checkApiLogin()
{
	//检测是否登录
	checkIsLogin()
}
//前端检测token
export function checkToken() 
{
	checkIsLogin()
	if (!store.getters.token) 
	{
		// #ifdef H5
		uni.showModal({
			title: '登录提示!',
			content: '您还未登录,请先去登录',
			confirmText:'去登录',
			confirmColor:'#0D8CE9',
			cancelText:'不了',
			cancelColor:' #868889',
			success: function (res) 
			{
				if (res.confirm) 
				{
					uni.reLaunch({
						url:'/pages/YouHu/V1/login/login/login'
					})
				} 
				else if (res.cancel) 
				{
					console.log('用户点击取消');
				}
			}
		});
		
		// #endif

		// #ifdef APP-PLUS
		console.log('一键登录')
		// showToast('登录中...')
		if (isAgreePrivacy()) 
		{
			//执行 一键登录
			
		} 
		else 
		{
			const options = 
			{
				success: function(response) 
				{
					console.log("success  " + JSON.stringify(response));

					if (response.code == 1) {
						console.log('同意了')
						//用户已同意隐私政策，可以使用其它业务功能
						plus.runtime.restart();
						//执行一键登录
					}
				},
				fail: function(response) 
				{
					console.log("fail  " + JSON.stringify(response))
				}
			}

			plus.runtime.showPrivacyDialog(options)
		}
		// #endif
	} 
}

//检测手机号
export function checkPhone()
{
	if (!store.getters.phone) 
	{
		uni.showModal({
			title: '手机认证提示!',
			content: '您还未绑定手机,为不影响您的权益,请尽快绑定!',
			confirmText:'去绑定',
			confirmColor:'#0D8CE9',
			cancelText:'不了',
			cancelColor:' #868889',
			success: function (res) 
			{
				if (res.confirm) 
				{
					uni.reLaunch({
						url:'/pages/YouHu/V1/login/phone-auth/phone-auth'
					})
				} 
				else if (res.cancel) 
				{
					console.log('用户点击取消');
				}
			}
		});
	}
}

//检测用户的openid 
export function checkOpenid()
{
	console.log(store.getters.openid)
	if (!store.getters.openid) 
	{
		// #ifdef H5
		wechatOfficialGetCode().then(res=>
		{
			if(res && res.code === 0)
			{
				const { url } = res.data
				
				if(isWechat())
				{
					window.location.href = url
				}
			}
		})
		// #endif
		
	}
}

/**
 * 检测所有
 */
export function checkAll()
{
	checkOpenid()
	checkPhone()
	checkToken()
}