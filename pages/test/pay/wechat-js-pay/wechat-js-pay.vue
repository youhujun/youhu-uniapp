<template>
  <view>
		<view class="">
			第一步:执行测试用户登录
		</view>
		<button @tap="handleToLoginByTestUser()">测试用户登录</button>
		<view class="">
			第二步:发起支付测试
		</view>
		<button @tap="handleToTestPayOrder()">支付测试</button>
  </view>
</template>

<script>
  import { loginByUserId } from '@/api/test/login/login'
  import { testPayOrder } from '@/api/test/pay/pay'
  import store from '@/store';
  import { mapGetters } from 'vuex';
  import { isWechat } from '@/utils/wechat'
  function onBridgeReady(data)
  {
  	  WeixinJSBridge.invoke('getBrandWCPayRequest', 
  	  {
  		  "appId": data.appId,  //"wx2421b1c4370ecxxx",   //公众号ID，由商户传入    
  		  "timeStamp":data.timeStamp,//"1395712654",   //时间戳，自1970年以来的秒数    
  		  "nonceStr": data.nonceStr, //"e61463f8efa94090b1f366cccfbbb444",      //随机串    
  		  "package":"prepay_id="+data.prepay_id, //"prepay_id=wx21201855730335ac86f8c43d1889123400",
  		  "signType": "RSA",     //微信签名方式：    
  		  "paySign": data.paySign//"oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==" //微信签名
  	  },
  	  function(res) {
  		  
  		  if (res.err_msg == "get_brand_wcpay_request:ok") 
  		  {
  			  // 使用以上方式判断前端返回,微信团队郑重提示：
  			  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
  		  }
  	  });
   }
   if (typeof WeixinJSBridge == "undefined") 
   {
  	  if (document.addEventListener) 
  	  {
  		  
  		  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  	  } 
  	  else if (document.attachEvent) 
  	  {
  		  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
  		  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  	  }
   } 
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
			
			param['user_id'] = 14
			
			const _this = this
			loginByUserId(param).then(res=>
			{
				console.log(res)
				if(res && res.code === 0)
				{
					_this.$store.dispatch('user/loginByUserId',res.data);
					
				}
				
			})
		},
		
		//发起支付测试
		handleToTestPayOrder()
		{
			console.log(this.user_id)
			
			if(this.user_id)
			{
				let param = {order_id:1,pay_type:10}
				testPayOrder(param).then(res =>{
					console.log(res)
					if(res && res.code ===0)
					{
						onBridgeReady(res.data)
					}
				})
				
			}
		}
    }
  }
</script>
<style lang="scss" scoped>

</style>
