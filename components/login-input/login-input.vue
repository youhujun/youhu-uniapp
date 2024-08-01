<template>
	<view class="input">
		<slot name="icon"></slot>
		<slot name="content"></slot>
		<slot name="other"></slot>
	</view>
</template>
<script>
	export default {
		name:"login-input",
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
.input{
	width: 610rpx;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	background: #F8F8F8;
	opacity: 1;
	border: 2rpx solid #F2F2F2;
	border-radius: 952rpx 952rpx 952rpx 952rpx;
}

</style>