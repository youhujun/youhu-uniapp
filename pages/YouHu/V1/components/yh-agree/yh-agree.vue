<template>
  <view class="agree">
  	<view class="agree-radio">
  		<radio @tap="handleToRadio()" :checked="isAgree"  color="#0D8CE9" style="transform:scale(0.7);position:absolute;top:-8rpx;left:-10rpx;"/>
  	</view>
  	<view class="agree-word-box">
  		<view><slot name="agree-title"></slot></view>
  		<text  class="agree-word-blue">游鹄服务条款</text>
  		<text class="agree-word">和</text>
  		<text class=" agree-word-blue">隐私政策</text>
  	</view>
  </view>
</template>
<script>
export default
{
  // 组件名称
  name: 'yh-agree',
  // 组件
  components:
  {
  },
  props:
  {
	  //父级是否选中同意
	  fatherIsAgree:{
		  type:Boolean,
		  default:false
	  }
  },
  // 数据
  data() {
    return {
       isAgree:false
    }
  },
  // 计算属性
  computed:
  {

  },
  // 监听
  watch:
  {
      fatherIsAgree(value){
         this.isAgree = value
      }
  },
  // 实例创建之前
  beforeCreate() {
  },
  // 创建
  created() {
  },
  // 挂载之前
  beforeMount() {
  },
  // 挂载 --常用
  mounted() {
	  this.isAgree = this.fatherIsAgree
  },
  // 更新之前
  beforeUpdate() {
  },
  // 跟新后
  updated() {
  },
  // 销毁之前
  beforeDestroy() {
  },
  // 销毁后
  destroyed() {
  },
  // 方法
  methods:
  {
	  //点击选中||取消选中
	  handleToRadio() {

		  this.isAgree = !this.isAgree
		  this.$emit('update:fatherIsAgree',this.isAgree)
	  }
  }
}
</script>
<style lang='scss' scoped>
.agree{
	width: 750rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	.agree-radio{
		width:32rpx;
		height:32rpx;
		margin-top: 82rpx;
		margin-left: 114rpx;
		margin-right: 10rpx;
		position:relative;
	}
	.agree-word-box{
		display: flex;
		flex-direction: row;
		height:36rpx;
		line-height: 36rpx;
		margin-top: 80rpx;
		.agree-word{
			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color: #343965;
		}
		.agree-word-green{
			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color:#599C0B;
		}
		.agree-word-blue{
			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color:#0D8CE9;
		}
	}
}
</style>