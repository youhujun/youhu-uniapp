<template>
  <view class="input">
  	<slot name="icon"></slot>
  	<slot name="content"></slot>
  	<slot name="other"></slot>
  </view>
</template>
<script>
  export default
  {
    // 组件名称
    name: 'yh-login-input',
    // 组件
    components:
    {
    },
	//属性
    props:
    {
    },
    // 数据
    data()
    {
        return {

        }
    },
    // 计算属性
    computed:
    {

    },
    // 监听
    watch:
    {

    },
    // 实例创建之前
    beforeCreate()
    {

    },
    // 创建
    created()
    {

    },
    // 挂载之前
    beforeMount()
    {

    },
    // 挂载 
    mounted()
    {

    },
    // 更新之前
    beforeUpdate()
    {

    },
    // 跟新后
    updated()
    {

    },
    // 销毁之前
    beforeDestroy()
    {

    },
    // 销毁后
    destroyed()
    {

    },
    // 方法
    methods:
    {

    }
  }
</script>
<style lang='scss' scoped>
	.input{
		width: 610rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background: #F4F5F9;
		border-radius: 114rpx 114rpx 114rpx 114rpx;
		border: 2rpx solid #EBEBEB;
	}
	
</style>
