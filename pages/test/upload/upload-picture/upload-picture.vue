<template>
  <view class="yh-page yh-no-title-height">
	<view class="notice-title">
		第一步:执行测试用户登录
	</view>
	<button @tap="handleToLoginByTestUser()">测试用户登录</button>
	<view class="notice-title">
		测试单图上传
	</view>
	<button type="default" @tap="handleUploadSinglePicture()">单图上传</button>
	<image style="width: 200px; height: 200px; background-color: #eeeeee; margin-left:auto;margin-right: auto;margin-top: 10rpx;"  :src="singleImageUrl" @error="imageError"/>
	<view class="notice-title">
		测试多图上传
	</view>
	<button type="default" @tap="handleUploadMultiplePicture()">多图上传</button>
	<image style="width: 200px; height: 200px; background-color: #eeeeee; margin-left:auto;margin-right: auto;margin-top: 10rpx;"  :src="imagesArray[0]" @error="imageError"/>
	<image style="width: 200px; height: 200px; background-color: #eeeeee; margin-left:auto;margin-right: auto;margin-top: 10rpx;"  :src="imagesArray[1]" @error="imageError"/>
	<image style="width: 200px; height: 200px; background-color: #eeeeee; margin-left:auto;margin-right: auto;margin-top: 10rpx;"  :src="imagesArray[2]" @error="imageError"/>
  </view>
</template>

<script>
	  
  import { chooseImage,previewImage } from '@/utils/images'
  import { singleUploadPicture , multipleUploadPicture} from '@/api/file/picture'
  import { loginByUserId } from '@/api/test/login/login'
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
			//单图url
			singleImageUrl:'',
			//多图image的url
			imagesArray:[],
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
		//图片错误
		imageError: function(e) {
		    console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
		//单图上传
		async handleUploadSinglePicture()
		{
			console.log('开始上传');
			
			let param = {count:1}
			const result = await chooseImage(param)
			this.singleImageUrl = result.tempFilePaths[0]
			console.log(result)
			const uploadResult = await singleUploadPicture( result.tempFilePaths[0])
			console.log(uploadResult)
			
			if(uploadResult && uploadResult.code === 0)
			{
				uni.showModal({
					title: '提示',
					content: '单图上传成功',
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
			const {pictureId} =  uploadResult
			console.log(pictureId) 
		},
		//多图上传
		async handleUploadMultiplePicture()
		{
			let param = {count:3}
			const result = await chooseImage(param)
			this.imagesArray = result.tempFilePaths
			const {pictureIdArray,pictureArray} = await multipleUploadPicture(result.tempFilePaths)
			console.log(pictureIdArray)
			console.log(pictureArray) 	
			
			if(pictureIdArray.length > 0)
			{
				uni.showModal({
					title: '提示',
					content: '多图上传成功',
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
		}
    }
  }
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
