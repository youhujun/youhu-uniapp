/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-09-21 13:48:43
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-21 14:01:20
 */

const state = {
    //是否登录
    hasLogin: false,
    //是否uni一键登录
    isUniverifyLogin: false,
    //登录支持方式
    loginProvider: "",
    //openid
    openid: null,
    //一键登录错误日志
    univerifyErrorMsg: ''
}

const mutations = {
		SET_LOGIN(state, provider) 
        {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		SET_LOGOUT(state) 
        {
			state.hasLogin = false
			state.openid = null
		},
		SET_OPENID(state, openid) 
        {
			state.openid = openid
		},
        //提交一键登录
		SET_UNIVERIFYLOGIN(state, payload) 
        {
			typeof payload !== 'boolean' ? payload = !!payload : '';
			state.isUniverifyLogin = payload;
		},
		SET_UNIVERIFYERRORMSG(state,payload = ''){
			state.univerifyErrorMsg = payload
		}
}

const actions ={
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) 
        {
			return await new Promise((resolve, reject) => 
            {
				if (state.openid) 
                {
					resolve(state.openid)
				} 
                else 
                {
					uni.login({
						success: (data) => 
                        {
							commit('login')
							setTimeout(function() 
                            { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => 
                        {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		},
		getPhoneNumber: function({
			commit
		}, univerifyInfo) 
        {
			return new Promise((resolve, reject) => 
            {
				uni.request({
					url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
					method: 'POST',
					data: univerifyInfo,
					success: (res) => {
						const data = res.data
						if (data.success) {
							resolve(data.phoneNumber)
						} else {
							reject(res)
						}

					},
					fail: (err) => {
						reject(res)
					}
				})
			})
		}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

