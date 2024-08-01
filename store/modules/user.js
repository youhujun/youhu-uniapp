/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-09-21 15:46:56
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-24 18:59:04
 */

import { getToken, setToken,removeToken,getPhone, setPhone,removePhone,getOpenid, setOpenid,removeOpenid } from '@/utils/auth'

const state = {
	// 登录用户token
	token: getToken(),
	//手机
	phone:getPhone(),
	// openid
	openid: getOpenid(),
	//用户id
	user_id: null,
	// 认证状态
	real_auth_status: 0,
	// 当前登录角色
	//当前登录角色
	currentRole:null,
	//角色
	roles:[],
	
	//个人介绍
	introduction:null,
	//昵称
	name:null,
	//头像
	avatar:null,
	//注册时间
	created_at:null,
	// 性别
	sex: 0,
	
	// 登录支持方式
	loginProvider: null,
	// 是否uni一键登录
	isUniverifyLogin: false,
	// 一键登录错误日志
	univerifyErrorMsg: null,
	
}

const mutations = {
	//用户 token
	SET_TOKEN(state,token)
	{
		setToken(token)
		state.token = getToken()
	},
	//用户手机号
	SET_PHONE(state,phone)
	{
		setPhone(phone)
		state.phone = getPhone()
	},
	//设置openid
	SET_OPENID(state, openid) 
	{
	  setOpenid(openid)
	  state.openid = getOpenid()
	},
	//设置userid
	SET_USERID(state, userid) 
	{
	  state.user_id = userid
	},
	//设置认证状态
	SET_REAL_AUTH_STATUS(state, statusCode)
	{
		state.real_auth_status = statusCode
	},
	//设置当前登录用户角色
	SET_CURRENT_ROLE(state,role)
	{
		state.currentRole = role
	},
	//设置用户拥有的角色
	SET_ROLES(state,rolesArray)
	{
		state.roles = rolesArray
	},
	//设置用户介绍
	SET_INTRODUCTION(state,introduction)
	{
		state.introduction = introduction
	},
	//设置用户昵称
	SET_NAME(state,name)
	{
		state.name = name
	},
	//设置用户头像
	SET_AVATAR(state,avatar)
	{
		state.avatar = avatar
	},
	//设置用户注册时间
	SET_CREATED_AT(state,created_at)
	{
		state.created_at = created_at
	},
	//设置用户性别
	SET_SEX(state,sex)
	{
		state.sex = sex
	}
	
}

const actions = {
	
	/**
	 * 开发调试使用用户id登录,(仅在调试时开放,需要调试请确保接口是可用的)
	 * @param {*} data
	 * @returns 
	 */
	loginByUserId({commit,state},data)
	{
		const {token,user_id,openid} = data
		commit('SET_TOKEN',token)
		commit('SET_OPENID',openid)
		commit('SET_USERID',user_id)
	},
	
	/**
	 * 登录存储token
	 */
	loginSaveToken({commit,state},token)
	{
		commit('SET_TOKEN',token)
	},
	
	/**
	 * 授权存储用户openid
	 */
	authSaveOpenid({commit,state},openid)
	{
		commit('SET_OPENID',openid)
	},
	/**
	 * 授权存储用户token
	 */
	authSaveToken({commit,state},token)
	{
		commit('SET_TOKEN',token)
	},
	
	//绑定存储手机号
	bindSavePhone({commit,state},phone)
	{
		commit('SET_PHONE',phone)
	},
	
	/**
	 * 保存用户信息
	 */
	saveUserInfo({commit,state},data)
	{
		const { phone,user_id,openid,real_auth_status,roles,name,avatar,sex,introduction,created_at} = data
		if(phone)
		{
			commit('SET_PHONE',phone)
		}
		
		if(openid)
		{
			commit('SET_OPENID',openid)
		}
		
		if(user_id)
		{
			commit('SET_USERID',user_id)
		}
		
		if(real_auth_status)
		{
			commit('SET_REAL_AUTH_STATUS',real_auth_status)
		}
		
		if(roles.length > 0 )
		{
			commit('SET_ROLES',roles)
			
			commit('SET_CURRENT_ROLE','user')
		}
		
		if(name)
		{
			commit('SET_NAME',name)
		}
		
		if(avatar)
		{
			commit('SET_AVATAR',avatar)
		}
		
		if(sex)
		{
			commit('SET_SEX',sex)
		}
		
		if(created_at)
		{
			commit('SET_CREATED_AT',created_at)
		}
		
		if(introduction)
		{
			commit('SET_INTRODUCTION',introduction)
		}
	},
	
	/**
	 * 退出
	 */
	logout({commit,state})
	{
		commit('SET_TOKEN',null)
		removeToken()
		commit('SET_PHONE',null)
		removePhone()
		commit('SET_OPENID',null)
		removeOpenid()
		
		commit('SET_USERID',null)
		commit('SET_REAL_AUTH_STATUS',0)
		commit('SET_CURRENT_ROLE',null)
		commit('SET_ROLES',[])
		commit('SET_INTRODUCTION',null)
		commit('SET_NAME',null)
		commit('SET_AVATAR',null)
		commit('SET_CREATED_AT',null)
		commit('SET_SEX',null)
	}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
