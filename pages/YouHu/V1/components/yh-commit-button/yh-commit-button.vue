<template>
	<view class="commit-button" >
		<slot name="word"></slot>
	</view>
</template>

<script>
	export default {
		name:"yh-commit-button",
		data() {
			return {
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.commit-button{
	width: 610rpx;
	height: 100rpx;
	background: #0D8CE9;;
	box-shadow: 0rpx 14rpx 48rpx 0rpx rgba(0,111,253,0.3);
	border-radius: 114rpx 114rpx 114rpx 114rpx;
	text-align: center;
	line-height: 100rpx;
}
.commit-button-word{
	font-family: PingFang SC, PingFang SC;
	font-weight: 500;
	font-size: 28rpx;
	color: #FFFFFF;
	line-height: 40rpx;
	font-style: normal;
	text-transform: none;
}
</style>