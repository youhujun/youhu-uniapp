
# youhu-uniapp

基于uniapp 结合youhujun/laravel-fast-api 用来开发手机端  uniapp查看 [uniapp](./document/README.md) 

github版[youhu-uniapp:github](https://github.com/youhujun/youhu-uniapp.git)

国内版本[youhu-uniapp:gitee](git@gitee.com:youhujun/youhu-uniapp.git)

# 1开始

- 先参照uniapp文档,配置开发中的相关配置

- config\setting.js 修改配置

- config\picUrls.js 配置云资源

- common\common.css 公共样式

# 2接口实现:

接口由 laravel-fast-api 实现查看 

github版[laravel-fast-api:github](https://github.com/youhujun/laravel-fast-api.git)

<br/>

国内版本[laravel-fast-api:gitee](git@gitee.com:youhujun/laravel-fast-api.git)

<br/>


# 3功能说明:

因为不同的项目有不同的需求,目前仅提供基础功能模块,后续会视情况增加其他功能模块.目前功能模块实现由个人(游鹄君/youhujun)开发完成,有其他业务功能模块需求,请自行研究开发.
<br/>

- 登录注册 (手机号验证码登录,手机号密码登录,手机号验证码注册,重置密码,绑定手机认证)

提示:在首页,登录页以及注册页.都做了邀请码处理.处理逻辑是当用户生成自己的二维码,二维码对应的链接可以设置成以上任意一个页面.只要被邀请用户通过分享的二维码邀请链接进入,最后完成注册.无论用户是否在注册的时候填写了邀请码,在他注册的时候都会加上分享者的邀请码.只是注册用户本身可能感知不到.

# 4开发说明:

- 预览 [手机网址](https://dh5.youhujun.com)

提示:因为有许多业务开发,涉及到第三方秘钥.因此建议结合youhujun/laravel-fast-api 和 youhu-element-admin 自行安装部署调试

<p align="center">
  <img width="900" src="https://qiniu.youhujun.com/youhu-phone/phone_login.png">
  <img width="900" src="https://qiniu.youhujun.com/youhu-phone/phone_register.png">
</p>

- 在pages\test目录下存放了众多功能实现示例,这些示例是结合 utils 封住的一些工具来实现 如下:

可以下载项目,结合代码调试.相信在实际开发中,可以提供很好的助力

<p align="center">
  <img width="900" src="https://qiniu.youhujun.com/youhu-phone/phone_test.png">
</p>


## 声明:

这份开源使用声明适用于使用和分发的开源软件。请仔细阅读以下条款，如果您不同意这些条款，请不要使用或分发该软件。
- 1.本软件是免费开源软件，授权给任何个人和组织使用、复制、修改、合并、发布、分发和销售。

- 2.您可以自由使用本软件用于个人和商业用途，无需支付任何费用。

- 3.您可以通过任何渠道获取和分发本软件的全部或部分代码。

- 4.您可以对本软件进行修改和衍生，但必须在代码中注明原作者和版权信息。

- 5.如果您修改了本软件或者基于本软件进行开发，您需要在您的修改或开发的产品中包含一份本软件的开源使用声明，并在适当的位置注明原作者和版权信息。

- 6.您在使用本软件时，应承担使用风险，并自行负责软件的适用性和安全性。

- 7.原作者不对本软件的任何使用方式负任何责任，包括但不限于直接或间接的损失或损害。

- 8.本软件不附带任何担保或保证，无论明示或暗示，包括但不限于适销性、特定用途适用性和非侵权性。

- 9.本软件可能包含第三方的开源组件或库，这些组件或库受其各自的许可证限制。在使用本软件时，您也需要遵守这些许可证限制。

- 10.您不得使用本软件进行非法活动、侵犯他人权益或违反相应法律法规，如发现相关违规行为，原作者有权终止您使用本软件的权利。

- 11.原作者保留随时修改本开源使用声明的权利，修改后的声明将在原作者的官方网站或代码仓库上公布

  感谢您使用本软件!如果您对软件有任何问题或建议，请与原作者联系。

## License

[MIT](https://github.com/youhujun/youhu-uniapp/blob/master/LICENSE)

Copyright (c) 2024 游鹄君(YouHuJun)