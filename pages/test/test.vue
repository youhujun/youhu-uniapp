<template>
	<view class="yh-page yh-no-title-height">
		<view class="notice-title">
			微信登录测试
		</view>
		<button type="default" @tap="handleToWechatTestAuth()">微信H5登录(仅限微信公众号下)</button>
		<view class="notice-title">
			微信支付测试
		</view>
		<button type="default" @tap="handleToWechatTestPay()">微信支付测试(仅限微信公众号下)</button>
		<view class="notice-title">
			测试退出
		</view>
		<button type="default" @tap="handleToLogoutTest()">退出测试</button>
		<view class="notice-title">
			测试websocket
		</view>
		<button type="default" @tap="handleToWebsocketTest()">测试websocket</button>
		<view class="notice-title">
			测试图片上传
		</view>
		<button type="default" @tap="handleToUplaodPcitureTest()">测试图片上传</button>
		<view class="notice-title">
			定位测试
		</view>
		<button type="default" @tap="handleToGetLocationTest()">定位测试</button>
	</view>
</template>

<script>
import { test } from '@/api/test';
import { isWechat }  from '@/utils/wechat'
export default {
	data() {
		return {
			//是否在微信环境下
			isWechat:false
		};
	},
	//页面加载
	onLoad() {
		this.test()
		this.isWechat = isWechat()
	},
	//页面显示
	onShow() {
		// this.test();
	},
	//页面初次渲染完成

	onReady() {
	},
	//页面隐藏
	onHide() {},
	//页面卸载
	onUnload() {},
	methods: {
		//测试接口
		async test() {
			console.log('here')
			const result = await test();

			console.log(result);
		},
		//跳转到微信测试页面
		handleToWechatTestAuth()
		{
			
			console.log(this.isWechat)
			
			if(this.isWechat)
			{
				uni.navigateTo({
					url:'/pages/test/login/wechat-official-login/wechat-official-login'
				})
			}
			else
			{
				//测试仅在iPhone5下生效
				// uni.showToast({
				// 	title: '标题',
				// 	duration: 2000
				// });
				
				uni.showModal({
					title: '提示',
					content: '这不是在微信环境下',
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
		},
		//测试微信支付
		handleToWechatTestPay()
		{
			console.log(this.isWechat)
			
			if(this.isWechat)
			{
				uni.navigateTo({
					url:'/pages/test/pay/wechat-js-pay/wechat-js-pay'
				})
			}
			else
			{
				//测试仅在iPhone5下生效
				// uni.showToast({
				// 	title: '标题',
				// 	duration: 2000
				// });
				
				uni.showModal({
					title: '提示',
					content: '这不是在微信环境下',
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
		},
		//测试退出
		handleToLogoutTest()
		{
			uni.navigateTo({
				url:'/pages/test/login/logout/logout'
			})
		},
		//测试websocket
		handleToWebsocketTest()
		{
			uni.navigateTo({
				url:'/pages/test/websocket/websocket/websocket'
			})
		},
		//测试图片上传
		handleToUplaodPcitureTest()
		{
			uni.navigateTo({
				url:'/pages/test/upload/upload-picture/upload-picture'
			})
		},
		//定位测试
		handleToGetLocationTest()
		{
			uni.navigateTo({
				url:'/pages/test/location/get-location/get-location'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.notice-title{
	width: 750rpx;
	height:50rpx;
	line-height: 50rpx;
	text-align: center;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	/* background-color: red; */
}
</style>
