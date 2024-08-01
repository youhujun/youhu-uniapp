
/**
 * 检测是否在微信中
 */
export function isWechat() 
{
  return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === 'micromessenger'
}

