<template>
  <view class="yh-page yh-no-title-height">
	注意:服务端主动发送消息,前端接收消息的测试需要后端结合测试接口调用PhoneSocketFacade::curl($data);
	<view class="">
		第一步:执行测试用户登录
	</view>
	<button @tap="handleToLoginByTestUser()">测试用户登录</button>
	<view class="">
		第二步:执行测试websocket
	</view>
	<button @tap="handleToWevsocketTest()">测试websocket</button>
  </view>
</template>

<script>
	import { loginByUserId } from '@/api/test/login/login'
	import { socketWoking,getSocketTask,socketClose} from '@/socket'
	import store from '@/store';
	import { mapGetters } from 'vuex';
  export default 
  {
    //计算属性
    computed:
    {
		...mapGetters(['user_id','token'])
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
								console.log(_this.user_id);
								console.log(_this.token);
								
							} else if (res.cancel) 
							{
								console.log('用户点击取消');
							}
						}
					});
					
				}
				
			})
		},
		//执行socket登录
		handleToWevsocketTest()
		{
			console.log(this.user_id)
			console.log(this.token)
			socketWoking();
			
			let socketTask = getSocketTask()
			
			let _this = this
			
			socketTask.onOpen(function(data)
			{
				console.log('connect open');
			
				let param = {};
				param['user_id'] = _this.user_id;
				param['token'] = _this.token;
				param['type'] = 10;
				
				param = JSON.stringify(param) 
				socketTask.send({data:param,function (res)
				{
					console.log(res)
				}}); 
				
				//监听事件
				socketTask.onMessage(function(object)
				{
					// console.log(object.data)
					console.log(JSON.parse(object.data))
				});
			});
		},
    }
  }
</script>
<style lang="scss" scoped>

</style>
