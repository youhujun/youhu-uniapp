<template>
  <view>
	<text>微信登录:用于测试用户登录成功以后,获取静默授权</text>
	<text>第一步:执行登录,该步骤所需账号密码自行处理</text>
	<button @tap="handleToLogin()">执行登录</button>
	<text>第二步:登录成功以后执行静默授权</text>
	<button @tap="handleToSilentAuthWechatOfficial()">微信登录(静默授权)</button>
  </view>
</template>

<script>
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
    onLoad() 
    {

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
		//微信公众号静默授权
		handleToSilentAuthWechatOfficial()
		{
			
		}
    }
  }
</script>
<style lang="scss" scoped>

</style>
