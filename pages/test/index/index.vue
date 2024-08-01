<template>
  <view>
	<view class="test-page">
		开发调试首页
	</view>
	<button type="default" @tap="handleToLoginByUserId()">登录(通过用户id)</button>
	<button type="default" @tap="handleToLogout()">退出</button>
	<view class="test-page">
		操作
	</view>
	<button type="default" @tap="handleToActionCheckAuth()">检测权限</button>
	<view class="test-page">
		用户信息
	</view>
	<view class="test-page">
		用户手机号:{{phone}}
	</view>
	<button type="default" @tap="handleToShowText()">查看测试</button>
  </view>
</template>
<script>
  import { checkApiLogin,checkToken,checkPhone,checkOpenid,checkAll } from '@/utils/chekLogin'
  import { isWechat } from '@/utils/wechat'
  import { loginByUserId } from '@/api/test/login/login'
  import { logout, getUserInfo, wecahtOfficialAuthToLogin,wecahtOfficialAuth} from '@/api/login/login'
  import { mapGetters } from 'vuex';
  export default 
  {
    //计算属性
    computed:
    {
		...mapGetters(['token','phone','openid','user_id','real_auth_staus','currentRole','roles'])
    },
    //监听
    watch:
    {

    },
	//组件
	components:
	{
	
	},
    data() 
    {
    	return{
	
        };
    },
    //页面加载
    async onLoad(options) 
    {
		checkApiLogin()
		//第一步:是否登录
		
		if(this.token)
		{
			/* console.log('登录')
			console.log('token'+this.token) */
			// #ifdef H5
			if(options)
			{
				if(options.hasOwnProperty('code') && options.hasOwnProperty('state'))
				{
					
					if(isWechat())
					{
						let _this = this
						
						//静默授权
						if(options.state == 10)
						{
							await this.wecahtOfficialAuth(options)
						}
						
						//主动授权
						if(options.state == 20)
						{
							await this.wecahtOfficialAuthToLogin(options)
						}
					}
				}
			
			}
			// #endif
			//第二步:获取用户信息
			await this.getUserInfo()
			
			//第三步:是否绑定了手机号
			checkPhone()
			//第四步:是否微信授权了(H5下)是否绑定了openid
			checkOpenid()
			
			//调用登录的接口
		}
		else
		{
			 console.log('未登录') 
			
			// #ifdef H5
			if(options)
			{
				 
				if(options.hasOwnProperty('code') && options.hasOwnProperty('state'))
				{
					//主动授权
					if(options.state == 20)
					{
						await this.wecahtOfficialAuthToLogin(options)
						
						//第二步:获取用户信息
						await this.getUserInfo()
						
						//第三步:是否绑定了手机号
						checkPhone()
						//第四步:是否微信授权了(H5下)是否绑定了openid
						checkOpenid()
					}
				}
				
				if(options.hasOwnProperty('invite_code') )
				{
					uni.setStorageSync('invite_code', options.invite_code);
				}
				
				if(options.hasOwnProperty('inviteCode'))
				{
					uni.setStorageSync('invite_code', options.inviteCode);
				}
			}
			
			// #endif
			
			//调用未登录的接口
		}
    },
    //页面显示
    onShow(options) 
    {
		
    },
    //页面初次渲染完成
    onReady()
    {

    },
    //页面隐藏
    onHide()
    {

    },
    //页面卸载
    onUnload()
    {

    },
    methods:{
		/**
		 * 通过用户id登录
		 */
		async handleToLoginByUserId()
		{
			/**
			 * 说明:为保证安全,平时应将接口关闭.仅在开发人员需要调试测试的时候打开
			 */
			const param = {}
			
			param['user_id'] = 1
			
			const _this = this
			loginByUserId(param).then(res=>
			{
				console.log(res)
				if(res && res.code === 0)
				{
					_this.$store.dispatch('user/loginByUserId',res.data);
					uni.showToast({
						title: '登录成功',
						duration: 5000
					});
				}
				
			})
		},
		//静默授权
		async wecahtOfficialAuth(options)
		{
			const result = await wecahtOfficialAuth(options)
			
			if(result && result.code === 0)
			{
				const {openid} = result.data
				
				this.$store.dispatch('user/authSaveOpenid',openid)
			}
			else
			{
				notice('授权失败')
			}
		},
		//主动授权
		async wecahtOfficialAuthToLogin(options)
		{
			const result = await wecahtOfficialAuthToLogin(options)
			
			if(result && result.code === 0)
			{
				console.log('主动授权结果')
				console.log(result)
				const {openid,token} = result.data
				
				this.$store.dispatch('user/authSaveOpenid',openid)
				this.$store.dispatch('user/authSaveToken',token)
			}
			else
			{
				notice('授权失败')
			}
		},
		//获取用户信息
		async getUserInfo()
		{
			//获取用户信息
			const result = await getUserInfo()
			
			if(result && result.code === 0)
			{
				this.$store.dispatch('user/saveUserInfo',result.data)
			}
			else
			{
				notice('获取信息失败')
			}
		},
		
		//退出
		handleToLogout()
		{
			console.log('退出')
			let _this = this
			logout().then(res=>
			{
				console.log(res)
				if(res && res.code === 0)
				{
					_this.$store.dispatch('user/logout')
				}
			}).catch(error=>
			{
				console.log(error)
			})
		},
		//获取用户信息
		handleToActionCheckAuth()
		{
			checkAll()
		},
		//查看测试页面
		handleToShowText()
		{
			uni.navigateTo({
				url:'/pages/test/test'
			})
		}
    }
  }
</script>
<style lang="scss" scoped>
.test-page{
	width: 750rpx;
	height:auto;
	text-align: center;
}
</style>
