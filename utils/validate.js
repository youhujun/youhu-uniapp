/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-10-21 15:05:15
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @description: 验证账号
 * @param {string}
 * @return {Boolean}
 */
export function validAccount(account)
{
  let res = true
  // 不能有点和空白 验证账号 4-30位
  const oneNameReg = /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{4,30}$/

  // 空白
  const twoNameReg = /(^\_)|(\__)|(\_+$)/

  // 纯数字
  const threeNameReg = /^\d+\d+\d$/

  const resOne = oneNameReg.test(account)
  const resTwo = twoNameReg.test(account)
  const resThree = threeNameReg.test(account)

  if (!resOne)
  {
    res = false
  }

  if (resTwo || resThree)
  {
    res = false
  }

  return res
}

/**
 * @description: 验证手机号
 * @param {string}
 * @return {Boolean}
 */
export function validPhone(phone)
{
  const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  return reg.test(phone)
}

/**
 * @description: 验证手机验证码
 * @param {string} code 验证码
 * @return {Boolean}
 */
export function validCode(code)
{
  const reg = /^\d{4}$/
  code = String(code)
  return reg.test(code)
}


/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email)
{
  const reg = /([a-zA-Z0-9_]+)@(([a-zA-Z0-9]+)\.){1,2}[a-z]{2,3}/
  return reg.test(email)
}

/**
 * @description:验证密码
 * @param {*} password
 * @return {*}
 */
export function validPassword(password)
{
  // 6-15位 必须有字母和数字 可以有特殊字符串
  const reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,15}$/

  return reg.test(password)
}

/**
 * @description:验证密码
 * @param {*} password
 * @return {*}
 */
export function validIdNumber(id_number)
{
  // 6-15位 必须有字母和数字 可以有特殊字符串
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

  return reg.test(id_number)
}
/**
 * @description:验证密码
 * @param {*} password
 * @return {*}
 */
export function validAddressInfo(address_info)
{
  // 6-15位 必须有字母和数字 可以有特殊字符串
  const reg = /^[\u4e00-\u9fa5\w]{1,50}$/
  return reg.test(address_info)
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path)
{
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str)
{
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url)
{
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str)
{
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str)
{
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str)
{
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str)
{
  if (typeof str === 'string' || str instanceof String)
  {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg)
{
  if (typeof Array.isArray === 'undefined')
  {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
