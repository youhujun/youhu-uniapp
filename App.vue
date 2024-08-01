<script>
import { preLogin } from './utils/chekLogin';
import {version} from './package.json'
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import { socketWoking,getSocketTask,socketClose} from './socket'
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['user_id'])
	},
	watch: {
		user_id: 
		{
		  handler(value) 
		  {
			  console.log(value);
			  if(value) 
			  {
				 this.runSockectLogin()
			  }
		  },
		  immediate: true
		}
	},
	onLaunch: function() {
		// #ifdef H5
		//console.log(version)
		// #endif
		// 线上示例使用
		//console.log('App Launch');
		// #ifdef APP-PLUS
		// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=4542
		//检查更新
		//this.checkUpdate();
		//this.getProvider()
		//预登陆
		//preLogin();
		// #endif
	},
	onShow: function() {
		//console.log('App Show')
	},
	onHide: function() {
		//console.log('App Hide')
	},
	globalData: {
		test: ''
	},
	methods: {
		//执行socket登录
		runSockectLogin()
		{
			socketWoking();
			let socketTask = getSocketTask()
			let that = this
			socketTask.onOpen(function(data)
			{
				console.log('connect open');
			
				let param = {};
				param['user_id'] = that.user_id;
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
		//检查更新
		checkUpdate() 
		{
			// #ifdef APP-PLUS
			if (plus.runtime.appid !== 'HBuilder') 
			{
				// 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
				checkUpdate()
			}
			// #endif
		},
		//在App平台，可用的服务商，是打包环境中配置的服务商，与手机端是否安装了该服务商的App没有关系。云打包在manifest中配置相关模块和SDK信息，离线打包在原生工程中配置。某个服务商配置被打包进去，运行时就能得到相应的服务供应商。
		//获取服务供应商
		getProvider()
        {
			// #ifdef APP-PLUS
			/* uni.getProvider({
				service: 'oauth',
				success: (result) =>
				{
					this.providerList = result.provider.map((value) =>
					{
						let providerName = '';

						switch (value)
						{
							case 'weixin':
								providerName = '微信登录'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = '百度登录'
								break;
							case 'jd':
							providerName = '京东登录'
							break;
							case 'toutiao':
								providerName = '头条登录'
								break;
							case 'apple':
								providerName = '苹果登录'
								break;
							case 'univerify':
								providerName = '一键登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});

				},
				fail: (error) =>
				{
					console.log('获取登录通道失败', error);
				}
			}); */
			// #endif
        }, 
	}
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
/* 引入youhu项目的iconfont */
/* 本地引入暂不使用 */
/* @import '@/static/youhu/v1/iconfont/iconfont.css'; */
/* 开发阶段使用在线版本 */
@import './static/youhu/v1/iconfont.css'; 
@import './common/common.css';

/* H5 兼容 pc 所需 */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
	body {
		overflow-y: scroll;
	}
}

/* 顶栏通栏样式 */
/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

uni-page-body {
	background-color: #f4f5f9 !important;
	min-height: 100% !important;
	height: auto !important;
}

.uni-top-window uni-tabbar .uni-tabbar {
	background-color: #fff !important;
}

.uni-app--showleftwindow .hideOnPc {
	display: none !important;
}

/* #endif */

/* 以下样式用于 hello uni-app 演示所需 */
page {
	background-color: #f4f5f9;
	height: 100%;
	font-size: 28rpx;
	/* line-height: 1.8; */
}

.fix-pc-padding {
	padding: 0 50px;
}

.uni-header-logo {
	padding: 30rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10rpx;
}

.uni-header-image {
	width: 100px;
	height: 100px;
}

.uni-hello-text {
	color: #7a7e83;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300rpx;
	background: #fff;
	padding: 50rpx;
	margin-top: 10px;
	font-size: 38rpx;
	color: #808080;
}

/* #endif*/
</style>
