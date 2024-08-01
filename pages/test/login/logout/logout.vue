<template>
  <view class="yh-page yh-no-title-height">
		<view class="">
			第一步:执行测试用户登录
		</view>
		<button @tap="handleToLoginByTestUser()">测试用户登录</button>
		<view class="">
			第二步:执行测试用户退出
		</view>
		<button @tap="handleToLogoutByTestUser()">测试登录用户退出</button>
  </view>
</template>

<script>
  import { loginByUserId } from '@/api/test/login/login'
  import { logout } from '@/api/login/login'
  import store from '@/store';
  import { mapGetters } from 'vuex';
  export default 
  {
    //计算属性
    computed:
    {
		...mapGetters(['user_id'])
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
		//测试用户登录
		handleToLoginByTestUser()
		{
			const param = {}
			
			param['user_id'] = 1
			
			const _this = this
			loginByUserId(param).then(res=>
			{
				console.log(res)
				if(res && res.code === 0)
				{
					_this.$store.dispatch('user/loginByUserId',res.data);
					
					uni.showModal({
						title: '提示',
						content: '用户登录成功',
						success: function (res) {
							if (res.confirm) 
							{
								console.log('用户点击确定');
							} else if (res.cancel) 
							{
								console.log('用户点击取消');
							}
						}
					});
					
				}
				
			})
		},
		//测试用户退出
		async handleToLogoutByTestUser()
		{
			const result = await logout()
			
			//console.log(result)
			
			if(result && result.code === 0)
			{
				uni.showModal({
					title: '提示',
					content: '用户退出成功',
					success: function (res) {
						if (res.confirm) 
						{
							console.log('用户点击确定');
						} else if (res.cancel) 
						{
							console.log('用户点击取消');
						}
					}
				});
			
				this.$store.dispatch('user/logout')
			}
		}
    }
  }
</script>
<style lang="scss" scoped>

</style>
