<template>
	<view >
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
			<view class="header">
				<view v-show="isShowPageBack === true" class="return-back" @tap="handleToReturnBack()">
					<text class="iconfont return-back-word icon-fh"></text>
				</view>
			</view>
			<view class="title">登&nbsp;&nbsp;录</view>
			<view class="description">
				欢迎来到游鹄,
				<br />
				绘制四海八方与君共享!
			</view>
			<!-- 填写手机号 -->
			<yh-login-input class="login-input-phone-box">
				<template v-slot:icon>
					<text class="iconfont icon-phone"></text>
				</template>
				<template v-slot:content>
					<view class="content-box-phone">
						<input class="input-phone" v-model="loginForm.phone" type="text" placeholder="请输入手机号" placeholder-class="placeholder-text" />
					</view>
				</template>
			</yh-login-input>
			<!-- 填写手机号结束 -->
			<!-- 切换填写密码和验证码 -->
				<!-- 切换填写密码和验证码输入 -->
			<view class="both-box" :animation="animationData">
				<view class="both-item-box">
					<yh-login-input class="login-input-code-box">
						<template v-slot:icon>
							<text class="iconfont icon-general"></text>
						</template>
						<template v-slot:content>
							<view class="content-box-code">
								<input class=" input-code" v-model="loginForm.code" type="text" placeholder="请输入验证码" placeholder-class="placeholder-text" />
							</view>
						</template>
						<template v-slot:other>
							<view class="vertical" />
							<view v-if="!codeStatus" class="word" @tap="handleToGetCode()"><text class="input-word">获取验证码</text></view>
							<view v-if="codeStatus" class="word">
								<text class="input-word">{{ showTime }}&nbsp;S</text>
							</view>
						</template>
					</yh-login-input>
				</view>
				<view class="both-item-box">
					<yh-login-input class="login-input-code-box">
						<template v-slot:icon>
							<text class="iconfont icon-lock"></text>
						</template>
						<template v-slot:content>
							<view class="content-box-password">
								<input
									class="input-password"
									v-model="loginForm.password"
									:password="isShowPassword"
									type="text"
									placeholder="请输入密码"
									placeholder-class="placeholder-text"
								/>
							</view>
						</template>
						<template v-slot:other>
							<view v-if="isShowPassword" class="icon-right" @tap="handleToShow()"><text class="iconfont  icon-eye-invisible"></text></view>
							<view v-if="!isShowPassword" class="icon-right" @tap="handleToHidden()"><text class="iconfont  icon-eye"></text></view>
						</template>
					</yh-login-input>
				</view>
			</view>
				<!-- 切换填写密码和验证码输入结束 -->
			<view class="switch-box">
				<view v-if="loginType === 1" @tap="handleSwitchPassword()"><text class="login-button">密码登录</text></view>
				<view v-if="loginType === 2" @tap="handleSwitchCode()"><text class="login-button ">验证码登录</text></view>
				<view v-show="isInApp === true"><text class="login-button" @tap="handleToUniverifyLogin()">一键登录</text></view>
			</view>
			<!-- 切换填写密码和验证码结束 -->
			<!-- 提交按钮 -->
			<yh-commit-button class="commit-button">
				<template v-slot:word>
					<view @tap="handleToLogin()"><text class="commit-button-word">登录</text></view>
				</template>
			</yh-commit-button>
			<!-- 提交按钮结束 -->
			<!-- 是否同意 -->
			<yh-agree :fatherIsAgree.sync="loginForm.agree">
				<template v-slot:agree-title>
					<text class="agree-word">我已阅读并同意</text>
				</template>
			</yh-agree>
			<!-- 是否同意结束 -->
			<!-- 菜单tool -->
			<view class="tool-box">
				<view class="item-box" @tap="handleToRegister()">
					<view class="item-icon"><text class="iconfont svg-item-icon icon-a-tubiaomingchengregister"></text></view>
					<text class="item-word">立即注册</text>
				</view>
				<view class="item-box" @tap="handleWechatLogin()">
					<view class="item-icon"><text class="iconfont svg-item-icon icon-vx"></text></view>
					<text class="item-word">微信登录</text>
				</view>
				<view class="item-box" @tap="handleToResetPassword()">
					<view class="item-icon"><text class="iconfont svg-item-icon icon-gen"></text></view>
					<text class="item-word">忘记密码</text>
				</view>
				<view class="item-box" @tap="handleToWantHelp()">
					<view class="item-icon"><text class="iconfont svg-item-icon icon-a-tubiaomingchenghelp1"></text></view>
					<text class="item-word">帮助中心</text>
				</view>
			</view>
			<!-- 菜单tool 结束 -->
			<view class="footer"><view class="line" /></view>
		</view>
	</view>
</template>

<script>
import { preLogin, checkLogin } from '@/utils/chekLogin';
import { isWechat } from '@/utils/wechat'
import { isAgreePrivacy } from '@/utils/auth';
import { debounce, notice, loading, unloading } from '@/utils';
import { validPhone, validCode, validPassword } from '@/utils/validate';
import { sendVerifyCode,loginByPhone,loginByUser,wechatOfficialGetCodeByLogin } from '@/api/login/login';
import store from '@/store';
export default {
	//计算属性
	computed: {},
	//监听
	watch: {
		//监听验证码状态
		codeStatus(value) {
			//console.log(value);
			const _this = this;
			if (value) {
				_this.showTime = 60;
				this.timer = setInterval(() => {
					if (_this.showTime > 1) {
						--_this.showTime;
					} else {
						clearInterval(_this.timer);
						_this.codeStatus = false;
					}
					//TODO
				}, 1000);
			}
		}
	},
	data() {
		return {
			//是否是在app中
			isInApp:false,
			//动画处理
			animation: {},
			animationData: {},
			//是否显示页面回退按钮
			isShowPageBack:false,
			//登录方式 1 验证码登录 2密码登录
			//是否显示密码
			isShowPassword: true,
			//验证码获取状态
			codeStatus: false,
			//验证码定时器
			timer: null,
			//显示的时间
			showTime: null,
			//0 app一键登录 1手机号验证码 2手机号密码
			loginType: 1,
			//表单
			loginForm: {
				//手机号
				phone: null,
				//验证码
				code: null,
				//密码
				password: null,
				//是否同意
				agree: false
			}
		};
	},
	//页面加载
	onLoad(options) 
	{
		// #ifdef APP
		//判断是否在app中
		this.isInApp = true
		// #endif
		
		let pages = getCurrentPages();
		if(pages.length > 1)
		{
			this.isShowPageBack = true
		}
		
		// #ifdef H5
		if(options.hasOwnProperty('invite_code') )
		{
			uni.setStorageSync('invite_code', options.invite_code);
		}
		
		if(options.hasOwnProperty('inviteCode'))
		{
			uni.setStorageSync('invite_code', options.inviteCode);
		}
		// #endif
		
		
	},
	//页面显示
	onShow() {
		//动画切换效果
		const animation = uni.createAnimation({
			duration: 1000,
			timingFunction: 'linear',
			delay: 100
		});

		this.animation = animation;
	},
	//页面初次渲染完成
	onReady() {},
	//页面隐藏
	onHide() {},
	//页面卸载
	onUnload() {},
	methods: {
		//返回上一页
		handleToReturnBack()
		{
			if(this.isShowPageBack)
			{
				uni.navigateBack({
					delta: 1
				});
			}
		},
		//切换密码登录
		handleSwitchPassword() {
			this.loginType = 2;

			this.animation.translate(-750 + 'rpx').step();

			this.animationData = this.animation.export();

			this.loginType = 2;
		},
		//切换验证码登录
		handleSwitchCode() {
			this.loginType = 1;

			this.animation.translate(0).step();

			this.animationData = this.animation.export();

			this.loginType = 1;
		},
		//一键登录
		handleToUniverifyLogin() {
			preLogin();
			checkLogin();
		},
		//获取验证码
		handleToGetCode: debounce(function() {
			//console.log(this.loginForm.phone) //打印手机号
			//检测手机号
			const validResult = validPhone(this.loginForm.phone);
			if (validResult) {
				this.codeStatus = true;

				const result = sendVerifyCode(this.loginForm);
			} else {
				notice('请填写正确手机号');
			}
		}, 1000),
		//显示密码
		handleToShow() {
			this.isShowPassword = false;
		},
		//隐藏密码
		handleToHidden() {
			this.isShowPassword = true;
		},
		//登录
		handleToLogin: debounce(function() {
			//notice('提示信息')
			let validResult = true;
			//console.log(this.loginForm)
			const validPhoneResult = validPhone(this.loginForm.phone);
			const validCodeResult = validCode(this.loginForm.code);
			const validPasswordResult = validPassword(this.loginForm.password);

			if (!validPhoneResult) {
				validResult = false;
				notice('请填写正确手机号');
				return;
			}

			if (this.loginType === 1) {
				if (!validCodeResult) {
					validResult = false;
					notice('请填写正确验证码');
					return;
				}
			}

			if (this.loginType === 2) {
				if (!validPasswordResult) {
					validResult = false;
					notice('请填写正确密码');
					return;
				}
			}

			if (!this.loginForm.agree) {
				validResult = false;
				let _this = this;
				uni.showModal({
					title: '登录提示',
					content: '请先阅读并同意游鹄服务条款和隐私政策',
					success: function(res) {
						if (res.confirm) {
							//console.log('用户点击确定');

							_this.loginForm.agree = true;
						} else if (res.cancel) {
							//console.log('用户点击取消');
							_this.loginForm.agree = false;
						}
					}
				});

				return;
			}

			if (validResult) 
			{
				//验证码登录
				if (this.loginType === 1) 
				{
					let _this = this
					loginByPhone(this.loginForm).then(res=>
					{
						if(res && res.code === 0)
						{
							const { token } =  res.data
							_this.$store.dispatch('user/loginSaveToken',token)
							
							uni.navigateTo({
								url:'/pages/test/index/index'
							})
						}
					})
					
				}
				//账号密码登录
				if (this.loginType === 2) 
				{
					let _this = this
					
					loginByUser(this.loginForm).then(res=>
					{
						if(res && res.code === 0)
						{
							const { token } =  res.data
							_this.$store.dispatch('user/loginSaveToken',token)
							
							uni.navigateTo({
								url:'/pages/test/index/index'
							})
						}
					})
				}
			}
		}, 1000),
		
		//跳转注册
		handleToRegister() 
		{
			if(this.inviteCode)
			{
				uni.navigateTo({
					url: '/pages/YouHu/V1/login/register/register?invite_code='+this.inviteCode
				});
			}
			else
			{
				uni.navigateTo({
					url: '/pages/YouHu/V1/login/register/register'
				});
			}
			
		},
		//微信登录
		handleWechatLogin() 
		{
			
			// #ifdef H5
			if(isWechat())
			{
				wechatOfficialGetCodeByLogin().then(res=>{
					if(res && res.code === 0)
					{
						const { url } = res.data
						window.location.href = url
					}
				})
			}
			else
			{
				notice('请在微信环境下登录')
			}
			// #endif
		},
		//忘记密码
		handleToResetPassword() {
			uni.navigateTo({
				url: '/pages/YouHu/V1/login/reset-password/reset-password'
			});
		},
		//帮助中心
		handleToWantHelp() {
			 uni.navigateTo({
				url: '/pages/YouHu/V1/login/login-help/login-help'
			}); 
		}
	}
};
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
/* 页面头部样式 */
.header{
	width:750rpx;
	height:88rpx;
	display: flex;
	flex-direction: row;
	align-items:center;
	/* background-color: blue; */
	// 回退按钮
	.return-back{
		width: 32rpx;
		height:32rpx;
		margin-left: 32rpx;
		.return-back-word{
			font-size: 32px ;
		}
	}
	
}
/* 标题 */
.title{
	margin-top: 44rpx;
	margin-left:70rpx;
	width:auto;
	height:76rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 600;
	font-size: 60rpx;
	color: #000000;
	line-height: 76rpx;
	text-align: left;
	font-style: normal;
	text-transform: none;
}

/* 描述 */
.description{
	margin-top: 30rpx;
	margin-left: 70rpx;
	width: 258rpx;
	height: 72rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: rgba(0,0,0,0.5);
	line-height: 36rpx;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
/*输入手机号 */
.login-input-phone-box{
	margin-top: 70rpx;
	margin-left: 70rpx;
	/*图标 */
	.icon-phone{
		display: block;
		width: 48rpx;
		height:48rpx;
		margin-left: 48rpx;
		margin-top: 26rpx;
		font-size: 24px;
		color:#868889;
		
	}
	/*手机号内容盒子 */
	.content-box-phone{
		width: 496rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 16rpx;
		/*输入手机号 */
		.input-phone{
			width: auto;
			height: 100rpx;
		}
		/*输入手机号提示 */
		.placeholder-text{
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #868889;
			line-height: 40rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
	}
}
/*动画盒子 */
.both-box {
	margin-top:48rpx;
	width: 1500rpx;
	height:100rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: hidden;
	/* background-color: blue; */
	/*单个动画盒子 */
	.both-item-box {
		width: 750rpx;
		height:100rpx;
		/*内容盒子 */
		.login-input-code-box{
			margin-left: 70rpx;
			/*图标 */
			.icon-general{
				display: block;
				width: 48rpx;
				height:48rpx;
				margin-left: 48rpx;
				margin-top: 26rpx;
				font-size: 24px;
				color:#868889;
			}
			/*输入内容盒子 */
			.content-box-code{
				width: 268rpx;
				height: 100rpx;
				line-height: 100rpx;
				margin-left: 16rpx;
				/* background-color: pink; */
				/*输入内容 */
				.input-code{
					width: auto;
					height: 100rpx;
				}
				/* 输入提示 */
				.placeholder-text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #868889;
					line-height: 40rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
			}
			/* 输入分割线 */
			.vertical {
				margin-top: 30rpx;
				width: 5rpx;
				height: 40rpx;
				background: #EBEBEB; 
				/* background: blue; */
			}
			/* 验证码文字盒子 */
			.word {
				width: 228rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				/* 验证码文字 */
				.input-word {
					display: block;
					font-size: 28rpx;
					font-family: Source Han Sans CN-Regular, Source Han Sans CN;
					font-weight: 400;
					color: #0D8CE9;
				}
			}
			
			/*图标 */
			.icon-lock{
				display: block;
				width: 48rpx;
				height:48rpx;
				margin-left: 48rpx;
				margin-top: 26rpx;
				font-size: 24px;
				color:#868889;
			}
			/* 输入密码盒子 */
			.content-box-password{
				width: 402rpx;
				height: 100rpx;
				line-height: 100rpx;
				margin-left: 16rpx;
				/* background-color: pink; */
				/* 输入密码 */
				.input-password{
					width: auto;
					height: 100rpx;
				}
			}
			/* 密码图标盒子 */
			.icon-right{
				width:96rpx;
				height:100rpx;
				line-height: 100rpx;
				/* background-color: pink; */
				/* 密码图标1 */
				.icon-eye-invisible{
					display: block;
					width: 48rpx;
					height:48rpx;
					font-size: 24px;
					color:#0D8CE9;
				}
				/* 密码图标2 */
				.icon-eye{
					display: block;
					width: 48rpx;
					height:48rpx;
					font-size: 24px;
					color:#0D8CE9;
				}
			}
		}
	}
}

/* 切换登录盒子  */
.switch-box {
	display: flex;
	flex-direction: row;
	width: 550rpx;
	height: 40rpx;
	line-height: 40rpx;
	margin-top: 40rpx;
	margin-left: 100rpx;
	justify-content: space-between;
	/* 切换登录文字按钮 */
	.login-button {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #0D8CE9;
		font-style: normal;
	} 
	
}

/* 提交按钮 */
.commit-button {
		margin-top: 140rpx;
		margin-left: 70rpx;
	/* 提交文字 */
	.commit-button-word{
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		font-style: normal;
		text-transform: none;
	}
}
/* 同意文字 */
.agree-word {
	font-size: 24rpx;
	font-family: PingFang SC-常规体, PingFang SC;
	font-weight: normal;
	color: #343965;
}

/* 首页工具盒子 */
.tool-box {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	margin-top: 140rpx;
	width: 750rpx;
	height: 102rpx;
	/* 首页单个工具盒子 */
	.item-box {
		width: 96rpx;
		height: 102rpx;
		margin-left: 74rpx;
		/* 工具图标盒子 */
		.item-icon {
			width: 64rpx;
			height: 64rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			/* 工具图标 */
			.svg-item-icon {
				font-size: 32px;
				color: #868889;
			}
		}
		/* 工具文字 */
		.item-word {
			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color: #868889;
		}
		
	}
}
/* 底部盒子 */
.footer {
	width: 750rpx;
	height: 10rpx;
	margin-top: 200rpx;
	/* 底部提示线 */
	.line {
		width: 268rpx;
		height: 10rpx;
		background: #000000;
		border-radius: 200rpx 200rpx 200rpx 200rpx;
		
		margin:0 auto;
	}
}

</style>
