/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-06-08 17:03:22
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-24 15:10:00
 */
import permision from "@/js_sdk/wa-permission/permission.js"
const TokenKey = 'User-Token'

const PhoneKey = 'User-Phone'

const OpenidKey = 'User-Openid'

/**
 * 获取token
 */
export function getToken() {
  return uni.getStorageSync(TokenKey)
}

/**
 * @param {设置token} token
 */
export function setToken(token) {
  return uni.setStorageSync(TokenKey, token)
}

/**
 * 移除token
 */
export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}

/**
 * 获取phone
 */
export function getPhone() {
  return uni.getStorageSync(PhoneKey)
}

/**
 * @param {设置phone} phone
 */
export function setPhone(phone) {
  return uni.setStorageSync(PhoneKey, phone)
}

/**
 * 移除phone
 */
export function removePhone() {
  return uni.removeStorageSync(PhoneKey)
}

/**
 * 获取openid
 */
export function getOpenid() {
  return uni.getStorageSync(OpenidKey)
}

/**
 * @param {设置openid} openid
 */
export function setOpenid(openid) {
  return uni.setStorageSync(OpenidKey, openid)
}

/**
 * 移除openid
 */
export function removeOpenid() {
  return uni.removeStorageSync(OpenidKey)
}


/**
 * 检测是否同意隐私政策
 */
export function isAgreePrivacy() {
// #ifdef APP-PLUS
  return plus.runtime.isAgreePrivacy()
  // #endif

  // #ifndef APP-PLUS
  return false
  // #endif
}

/**
 * 引导用户获取位置授权
 */
export function getAuthLocation()
{
	// #ifdef APP-PLUS
	//获取手机授权状态
	const appAuthorizeSetting = uni.getAppAuthorizeSetting()
	
	if(appAuthorizeSetting.locationAuthorized === 'denied')
	{
		console.log('授权被拒绝,引导请求授权')
		uni.showModal({
			title: "定位未授权",
			content: "定位未授权将会影响系统的正常使用,",
			showCancel: true,
			confirmText: "确定",
				cancelText:'取消',
				success:function(res)
				{
					if (res.confirm) 
					{
						console.log('用户点击确定');
						permision.gotoAppPermissionSetting()
							
					} 
					else if (res.cancel) 
					{
						console.log('用户点击取消');
					}
				}
		})
			
	}
	// #endif
}

