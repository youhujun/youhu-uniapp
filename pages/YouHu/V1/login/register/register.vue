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
			<view class="header">
				<view v-show="isShowPageBack === true" class="return-back" @tap="handleToReturnBack()">
					<text class="iconfont return-back-word icon-fh"></text>
				</view>
			</view>
			<view class="title">注&nbsp;&nbsp;册</view>
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
						<input class="input-phone" v-model="registerForm.phone" type="text" placeholder="请输入手机号" placeholder-class="placeholder-text" />
					</view>
				</template>
			</yh-login-input>
			<!-- 填写手机号结束 -->
			<!-- 输入验证码 -->
			<yh-login-input class="login-input-code-box">
				<template v-slot:icon>
					<text class="iconfont icon-general"></text>
				</template>
				<template v-slot:content>
					<view class="content-box-code">
						<input class=" input-code" v-model="registerForm.registerCode" type="text" placeholder="请输入验证码" placeholder-class="placeholder-text" />
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
			<!-- 输入验证码结束 -->
			<!-- 输入密码 -->
			<yh-login-input class="login-input-code-box">
				<template v-slot:icon>
					<text class="iconfont icon-lock"></text>
				</template>
				<template v-slot:content>
					<view class="content-box-password">
						<input
							class="input-password"
							v-model="registerForm.password"
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
			<!-- 输入密码结束 -->
			<!-- 输入邀请码 -->
			<yh-login-input class="login-input-code-box">
				<template v-slot:icon>
					<text class="iconfont icon-user"></text>
				</template>
				<template v-slot:content>
					<view class="content-box-phone">
						<input class="input-phone" v-model="registerForm.inviteCode" type="text" placeholder="请输入邀请码(非必填)" placeholder-class="placeholder-text" />
					</view>
				</template>
			</yh-login-input>
			<!-- 输入邀请码结束 -->
			<!-- 提交按钮 -->
			<yh-commit-button class="commit-button">
				<template v-slot:word>
					<view @tap="handleToRegister()"><text class="commit-button-word">下一步</text></view>
				</template>
			</yh-commit-button>
			<!-- 提交按钮结束 -->
			<!-- 是否同意 -->
			<yh-agree :fatherIsAgree.sync="registerForm.agree">
				<template v-slot:agree-title>
					<text class="agree-word">我已阅读并同意</text>
				</template>
			</yh-agree>
			<!-- 是否同意结束 -->
			<!-- 菜单tool 结束 -->
			<view class="footer"><view class="line" /></view>
		</view>
  </view>
</template>

<script>
  import { debounce, notice, loading, unloading } from '@/utils';
  import { userRegister,sendUserRegisterCode } from '@/api/login/register'
  import { validPhone, validCode, validPassword } from '@/utils/validate';
  export default 
  {
    //计算属性
    computed:
    {

    },
    //监听
    watch:
    {
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
	//组件
	components:
	{
	
	},
    data() 
    {
    	return{
			//是否显示页面回退按钮
			isShowPageBack:false,
			//是否显示密码
			isShowPassword: true,
			//验证码获取状态
			codeStatus: false,
			//验证码定时器
			timer: null,
			//显示的时间
			showTime: null,
			//表单
			registerForm: {
				//手机号
				phone: null,
				//验证码
				registerCode: null,
				//密码
				password: null,
				//邀请码
				inviteCode:null,
				//是否同意
				agree: false
			}
        };
    },
    //页面加载
    onLoad(options) 
    {
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
		//获取验证码
		handleToGetCode: debounce(function() {
			//console.log(this.registerForm.phone) //打印手机号
			//检测手机号
			const validResult = validPhone(this.registerForm.phone);
			if (validResult) {
				this.codeStatus = true;
		
				sendUserRegisterCode(this.registerForm)
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
		
		//注册用户
		handleToRegister()
		{
			let validResult = true;
			//console.log(this.loginForm)
			const validPhoneResult = validPhone(this.registerForm.phone);
			const validCodeResult = validCode(this.registerForm.registerCode);
			const validPasswordResult = validPassword(this.registerForm.password);
			
			if (!validPhoneResult) {
				validResult = false;
				notice('请填写正确手机号');
				return;
			}
			
			if (!validCodeResult) {
				validResult = false;
				notice('请填写正确验证码');
				return;
			}
			
			if (!validPasswordResult) {
				validResult = false;
				notice('请填写正确密码');
				return;
			}
			
			if (!this.registerForm.agree) {
				validResult = false;
				let _this = this;
				uni.showModal({
					title: '注册提示',
					content: '请先阅读并同意游鹄服务条款和隐私政策',
					success: function(res) {
						if (res.confirm) {
							//console.log('用户点击确定');
							_this.registerForm.agree = true;
						} else if (res.cancel) {
							//console.log('用户点击取消');
							_this.registerForm.agree.agree = false;
						}
					}
				});
			
				return;
			}
			
			//先从缓存中查看是否有邀请码
			const invite_code = uni.getStorageSync('invite_code')
			
			//缓存中有,就从缓存中把邀请码拿出 
			if(invite_code)
			{
				//复制表单到新对象
				const param = { ...this.registerForm}
				
				param['inviteCode'] = invite_code
				
				userRegister(param).then(res=>
				{
					if(res && res.code === 0)
					{
						//清理邀请码缓存
						uni.removeStorageSync('invite_code')
						
						uni.navigateTo({
							url:'/pages/YouHu/V1/login/login/login'
						})
					}
				})
				
			}
			else
			{
				userRegister(this.registerForm).then(res=>
				{
					if(res && res.code === 0)
					{
						uni.navigateTo({
							url:'/pages/YouHu/V1/login/login/login'
						})
					}
				}).catch(error=>{
					console.log(error)
				})
			}
		}
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

/*内容盒子 */
.login-input-code-box{
	margin-top: 48rpx;
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
	/* 图标 */
	.icon-user{
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

/* 底部盒子 */
.footer {
	width: 750rpx;
	height: 10rpx;
	margin-top: 202rpx;
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
