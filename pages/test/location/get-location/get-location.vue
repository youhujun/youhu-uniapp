<template>
  <view class="yh-page yh-no-title-height">
	<view class="notice-title">
		第一步:执行测试用户登录
	</view>
	<button @tap="handleToLoginByTestUser()">测试用户登录</button>
	<view class="notice-title">
		第二步:前端获取位置H5
		<br />
		提示:需要先配置uniapp的地图key
	</view>
	<button type="default" @tap="handleToGetLocationTest()">前端H5获取定位</button>
	<view class="notice-title">
		第三步:接口获取具体位置信息
	</view>
	<button type="default" @tap="handleToRequestApiGetLocationInfo()">后端配合H5获取并记录位置信息</button>
  </view>
</template>

<script>
  import permision from "@/js_sdk/wa-permission/permission.js"
  import { getLocation } from '@/utils/location'
  import store from '@/store';
  import { mapGetters } from 'vuex';
  import { loginByUserId } from '@/api/test/login/login'
  import { getLocationRegionByH5 } from '@/api/location/location'
  
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
			//维度
			latitude:0,
			//经度
			longitude:0
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
		//获取位置测试
		async handleToGetLocationTest()
		{
			console.log('获取位置')
			uni.showLoading({
				title:'获取定位中'
			})
			const param = {type:'wgs84'}
			const result = await getLocation(param)
			console.log(result) 
			if(result && result.latitude && result.longitude)
			{
				this.latitude = result.latitude
				this.longitude = result.longitude
				
				uni.showModal({
					title: '提示',
					content: '获取定位成功!',
					success: function (res) {
						if (res.confirm) 
						{
							console.log('用户点击确定');
							uni.hideLoading()
						} else if (res.cancel) 
						{
							console.log('用户点击取消');
							uni.hideLoading()
						}
					}
				});
			}
		},
		//后端获取位置信息
		async handleToRequestApiGetLocationInfo()
		{
			const param = {}
			param['latitude'] = this.latitude
			param['longitude'] = this.longitude
			const regionResult = await getLocationRegionByH5(param)
			
			console.log(regionResult)
		}
    }
  }
</script>
<style lang="scss" scoped>

</style>
