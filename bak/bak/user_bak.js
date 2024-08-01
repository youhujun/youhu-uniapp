/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-09-21 15:46:56
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-24 18:59:04
 */
import { univerifyLogin, loginByPhone,loginByUser,getUserInfo } from '@/api/user'
import { getToken, setToken,removeToken } from '@/utils/auth'
import { logoPath } from '@/static/logo.png'

 // #ifdef APP-PLUS
const univerifyManager = uni.getUniverifyManager()
// #endif

const state = {
  // 登录用户token
  token:  getToken(),
  //个人介绍
  introduction:'',
  //昵称
  name:'',
  //头像
  avatar:'',
  //手机
  phone:'',
  //注册时间
  created_at:'',
  // 性别
  sex: '',
  // 认证状态
  is_real_auth: 0,
  //角色
  roles:[],
  // 登录支持方式
  loginProvider: '',
  // openid
  openid: null,
  // 是否uni一键登录
  isUniverifyLogin: false,
  // 一键登录错误日志
  univerifyErrorMsg: '',
  user_id: null
}

const mutations = {
  //登录
  SET_LOGIN(state, data) {
    const {token,provider} = data
    state.token = token
    state.loginProvider = provider
  },
  //退出
  SET_LOGOUT(state) {
    state.token = ''
    state.openid = null
    state.isUniverifyLogin = false
    state.univerifyErrorMsg = ''
    state.loginProvider = ''
  },
  //设置openid
  SET_OPENID(state, openid) {
    state.openid = openid
  },
  //设置userid
  SET_USERID(state, userid) {
    state.user_id = userid
  },
  // 提交一键登录
  SET_UNIVERIFYLOGIN(state, payload) {
    typeof payload !== 'boolean' ? payload = !!payload : ''
    state.isUniverifyLogin = payload
  },
  //一键登录错误信息
  SET_UNIVERIFYERRORMSG(state, payload = '') {
    state.univerifyErrorMsg = payload
  },
  //用户信息
  SET_USERINFO(state,data)
  {
	 const { introduction,name,avatar,roles,phone,created_at,sex,is_real_auth} = data

	 state.introduction = introduction
	 state.name = name
	 state.avatar = avatar
	 state.roles = roles
	 state.phone = phone
	 state.created_at = created_at
	 state.sex = sex
	 state.is_real_auth = is_real_auth
  }
}

const actions = {

  /**
   * app方式预登陆
   * @param {*} param0 
   */
  preLogin({ commit, state }) {
     // #ifdef APP-PLUS
    univerifyManager.preLogin({
	  provider: 'univerify',
	  success: (res) => {
		  // 成功
		  commit('SET_UNIVERIFYERRORMSG', res.errMsg)
		  console.log('preLogin success: ', res)
	  },
	  fail: (res) => {
		  commit('SET_UNIVERIFYLOGIN', false)
		  commit('SET_UNIVERIFYERRORMSG', res.errMsg)
		  // 失败
		  console.log('preLogin fail res: ', res)
		  uni.reLaunch({url: "/pages/login/login"});
	  }
    })
    // #endif
  },
  /**
   * app方式一键登录
   * @param {} param0 
   * @param {*} data 
   * @returns 
   */
  univerifyLogin({ commit,state }) 
  {

       return new Promise((resolve, reject) => 
       {
            // #ifdef APP-PLUS
            univerifyManager.login({
                provider: 'univerify',
                univerifyStyle: {  
                    "fullScreen": true, // 是否全屏显示，默认值： false
                    "backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff
                    "backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
                    "icon": {  
                        "path": logoPath //"/@/static/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
                    },  
                    //"closeIcon": {"path": "static/xxx.png" // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持},
                    "phoneNum": {  
                        "color": "#202020"  // 手机号文字颜色 默认值：#202020  
                    },  
                    "slogan": {  
                        "color": "#BBBBBB"  //  slogan 字体颜色 默认值：#BBBBBB  
                    },  
                    "authButton": {  
                        "normalColor": "#599C0B", // 授权按钮正常状态背景颜色 默认值：#3479f5  
                        "highlightColor": "#599C0B",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
                        "disabledColor": "#599C0B",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
                        "textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
                        "title": "一键注册登录", // 授权按钮文案 默认值：“本机号码一键登录”  
                        "borderRadius": "24px"	// 授权按钮圆角 默认值："24px" （按钮高度的一半）
                    },  
                    "otherLoginButton": {  
                        "visible": true, // 是否显示其他登录按钮，默认值：true  
                        "normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
                        "highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
                        "textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
                        "title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
                        "borderColor": "",  //边框颜色 默认值：透明（仅iOS支持）  
                        "borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
                    },  
                    "privacyTerms": {  
                        "defaultCheckBoxState":true, // 条款勾选框初始状态 默认值： true
                        "uncheckedImage":"", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
                        "checkedImage":"", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
                        "checkBoxSize":12, // 可选 条款勾选框大小，仅android支持
                        "textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
                        "termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
                        "prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
                        "suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
                        "privacyItems": [  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
                            {  
                                "url": "https://", // 点击跳转的协议详情页面  
                                "title": "用户服务协议" // 协议名称  
                            } ,
                            {
                                "url": "https://", // 点击跳转的协议详情页面  
                                "title": "隐私政策" // 协议名称  
                            }  
                        ]  
                    },
                    "buttons": {  // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
                        "iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
                        "list": [
                            {
                                "provider": "apple",
                                "iconPath": "@/static/apple.png" // 图标路径仅支持本地图片
                            }, 
                            {
                                "provider": "weixin",
                                "iconPath": "@/static/wechat.png" // 图标路径仅支持本地图片
                            }
                        ]
                    }
                },
                async success(res){ // 登录成功
                    //console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
                    const param = res.authResult
                    
                    param['provider'] = 'univerify'
                    console.log(param)
                    commit('SET_OPENID',param.openid)
                    commit('SET_UNIVERIFYLOGIN',true)

                    const result = await univerifyLogin(param)

                    console.log(result)

                    if(result) 
                    {
                        if(result.code === 0) 
                        {
                            //console.log(result.data.token)
                            const data = {}
                            data['provider'] = 'univerify'
                            data['token'] = result.data.token
                            commit('SET_LOGIN',data)
                            setToken(result.data.token)
							uni.closeAuthView();
                            uni.switchTab({url: "/pages/tabBar/index/index"});
                           
                            
                        }
                        else 
                        {
							uni.closeAuthView();
                            uni.reLaunch({url: "/pages/login/login"});
                        }
                    }
                },
                fail(res)
                {  // 登录失败
                    console.log(res.errCode)
                    console.log(res.errMsg)
					uni.closeAuthView();
                    uni.reLaunch({url: "/pages/login/login"});
                } 
            })
            // #endif
       })
  },

  /**
   * 手机号验证码登录
   * @param {*} param0 
   * @param {*} loginData 
   * @returns 
   */
  loginByPhone({commit,state},loginData)
  {
        return new Promise((resolve, reject) => 
        {
            loginByPhone(loginData).then(result=>{
                //console.log(res)
                if(result && result.code === 0)
                {
                    const data = {}
                    data['provider'] = ''
                    data['token'] = result.data.token
                    commit('SET_LOGIN',data)
                    setToken(result.data.token)
                    uni.switchTab({url: "/pages/tabBar/index/index"});
                    resolve(data.msg)
                }
                else
                {
                    reject(data.msg)
                }
            }).catch(error=>{
                 reject(error)
            })
        })
  },

  /**
   * 手机号密码登录
   * @param {*} param
   * @param {*} loginData 
   * @returns 
   */
  loginByUser({commit,state,dispatch},loginData)
  {
        return new Promise((resolve, reject) => 
        {
            loginByUser(loginData).then(async result=>{
                //console.log(result)
                if(result && result.code === 0)
                {
                    const data = {}
                    data['provider'] = ''
                    data['token'] = result.data.token
                    commit('SET_LOGIN',data)
                    setToken(result.data.token)
                    uni.switchTab({url: "/pages/tabBar/index/index"});
                    resolve(data.msg)
                }
                else
                {
                    reject(data.msg)
                }
            }).catch(error=>{
                 reject(error)
            })
        })
  },

  //用户信息
  getUserInfo({commit,state,dispatch})
  {
	   return new Promise((resolve, reject) =>
	   {
			getUserInfo().then(result =>
			{
				if(result && result.code === 0)
                {
                    commit('SET_USERINFO',result.data)
                    commit('SET_OPENID',result.data.openid)
                    commit('SET_USERID',result.data.user_id)
					uni.setStorageSync('openid', result.data.openid);
					uni.setStorageSync('user_id', result.data.user_id);
                    resolve(result.data)
                }
                else
                {
                    reject(result.msg)
                }

			}).catch(error=>{
				reject(error)
			})
	   })
  },
  /**
   * 用户退出
   * @param {*} param0 
   * @returns 
   */
  logout({ commit, state, dispatch })
  {
    return new Promise((resolve, reject) =>
    {
        commit('SET_LOGOUT', [])
        removeToken()
		uni.removeStorageSync('openid')
		uni.removeStorageSync('user_id')
		uni.removeStorageSync('address');
		uni.removeStorageSync('addressInfo');
		uni.removeStorageSync('city');
		uni.removeStorageSync('district');
		uni.removeStorageSync('isLocation');
		uni.removeStorageSync('longitude');
		uni.removeStorageSync('latitude');
        resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
