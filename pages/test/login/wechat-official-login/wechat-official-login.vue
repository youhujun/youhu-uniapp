<template>
  <view>
		测试微信公众号登录
		<text>微信登录:用于测试微信公众号通过微信登录注册</text>
		<button @tap="handleToLoginByWechatOfficial()">微信登录(用户信息)</button>
		<text>微信登录:用于测试用户登录成功以后,获取静默授权</text>
		<text>第一步:执行登录,该步骤所需账号密码自行处理</text>
		<button @tap="handleToLogin()">执行登录</button>
		<text>第二步:登录成功以后执行静默授权</text>
		<button @tap="handleToSilentAuthWechatOfficial()">微信登录(静默授权)</button>
		
  </view>
</template>

<script>
  import { 
	  wechatOfficialGetCodeByLogin,
	  wecahtOfficialAuthToLogin,
	  wechatOfficialGetCode,
	  wecahtOfficialAuth } from '@/api/login/login.js'
  export default 
  {
    //计算属性
    computed:
    {

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
    onLoad(options) 
    {
		console.log(options)
		
		if(options && options.code && options.state)
		{
			const {code,state} = options
			
			// 20注册登录
			if(state === 20)
			{
				wecahtOfficialAuthToLogin(options).then(res=>{
					console.log(res)
				})
			}
			
			// 10登录授权 
			if(state === 10)
			{
				
			}
			
		}
    },
    //页面显示
    onShow() 
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
		//微信公众号登录
		handleToLoginByWechatOfficial()
		{
			wechatOfficialGetCodeByLogin().then(res=>{
				console.log(res)
				if(res && res.code === 0)
				{
					const {data} = res
					const {url} = data
					window.location.href = url
				}
			})
		},
		//微信公众号静默授权
		handleToSilentAuthWechatOfficial()
		{
			wechatOfficialGetCodeByLogin().then(res=>{
				console.log(res)
				if(res && res.code === 0)
				{
					const {data} = res
					const {url} = data
					window.location.href = url
				}
			})
		}
		
    }
  }
</script>
<style lang="scss" scoped>

</style>
