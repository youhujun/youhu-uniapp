<template>
  <view>
		<!-- #ifndef H5 -->
		<view class="status_bar">
		    <!-- 这里是状态栏 -->
		</view>
		<!--  #endif -->
		<!-- #ifdef H5 -->
		<view class="status_bar">
		    <!-- 这里是状态栏 -->
		</view>
		<!--  #endif -->
		<view class="yh-page yh-height">
			页面内容
		</view>
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

    }
  }
</script>
<style lang="scss" scoped>
/*  #ifndef H5 */
.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #FFFFFF;
	}
/*  #endif */
/*  #ifdef H5 */
.status_bar {
		height:88rpx;
		width: 100%;
		background: #FFFFFF;
	}
/*  #endif */
</style>
