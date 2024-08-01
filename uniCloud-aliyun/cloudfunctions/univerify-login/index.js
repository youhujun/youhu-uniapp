// 云函数验证签名，此示例中以接受GET请求为例作演示
const crypto = require('crypto')
exports.main = async function (event){
	
  const secret = 'youhujun' // 自己的密钥不要直接使用示例值，且注意不要泄露
  const hmac = crypto.createHmac('sha256', secret);
  
  let params = event.queryStringParameters
  
  const sign = params.sign
  
  
  delete params.sign
  const signStr = Object.keys(params).sort().map(key => {
    return `${key}=${params[key]}`
  }).join('&')
  
  hmac.update(signStr);
  
   if(sign!==hmac.digest('hex')){
    throw new Error('非法访问')
  } 
  
  const {
    access_token,
    openid
  } = params
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
    appid: '__UNI__81BC350', // DCloud appid
  	apiKey: 'f94c849d354a57586246b8c0b4a3b521', // 在开发者中心开通服务并获取apiKey
  	apiSecret: '5110cf320ad6498f1cca6b3268fb55fe', // 在开发者中心开通服务并获取apiSecret
  	access_token: access_token,
  	openid: openid
  })
  // 返回手机号给自己服务器
  return res
}
