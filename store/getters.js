/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-09-21 13:45:40
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-24 16:07:54
 */

const getters = {
    //token
    token:state => state.user.token,
	//手机号
	phone:state => state.user.phone,
	//微信openid,用于微信支付
	openid: state => state.user.openid,
	//用户id
	user_id: state => state.user.user_id,
	// 认证状态
	real_auth_staus:state => state.user.real_auth_staus,
	//登录角色
	currentRole:state=>state.user.currentRole,
	//用户角色
	roles:state => state.user.roles,
	
	//个人介绍
	introduction:state => state.user.introduction,
	//头像
	avatar:state => state.user.avatar,
	//昵称
	name:state => state.user.name,
	//注册时间
	created_at:state => state.user.created_at,
	// 性别
	sex:state => state.user.sex,
    //登录支持方式
    loginProvider: state => state.user.loginProvider,
    
    //是否uni一键登录
    isUniverifyLogin: state => state.user.isUniverifyLogin,
    //一键登录错误日志
    univerifyErrorMsg: state => state.user.univerifyErrorMsg
}

export default getters