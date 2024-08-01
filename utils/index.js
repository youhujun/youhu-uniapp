/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-09-21 15:05:37
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-25 21:27:43
 */

// 防抖
export const debounce = (func, wait) =>
{
  var timeout

  return function()
  {
    var context = this
    var args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function()
    {
      func.apply(context, args)
    }, wait)
  }
}
// 节流
export const throttle = (fn, wait) =>
{
  let canRun = true // 通过闭包保存一个标记
  return function()
  {
    if (!canRun) return // 在函数开头判断标记是否为true，不为true则return
    canRun = false // 立即设置为false
    setTimeout(() =>
    { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments)
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true
    }, wait)
  }
}
/**
 * 提示弹框
 * @param {*} title 
 * @param {*} duration 
 * @param {*} position 
 */
export function notice(title='提示',duration=1500,position='center')
{
    uni.showToast({title:title,icon:'none',duration:duration,position:position})
}

/**
 * 提示弹框
 * @param {*} title 提示消息
 * @param {*} mask  是否蒙层
 */
export function loading(title='提示',mask=false)
{
    uni.showLoading({title:title,mask:mask})
}

/**
 * 关闭消息
 */
export function unloading()
{
    uni.hideLoading()
}

/**
 * 格式化日期
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat)
{
  if (arguments.length === 0 || !time)
  {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object')
  {
    date = time
  }
  else
  {
    if ((typeof time === 'string'))
    {
      if ((/^[0-9]+$/.test(time)))
      {
        // support "1548221490638"
        time = parseInt(time)
      }
      else
      {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10))
    {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) =>
  {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a')
    {
      return ['日', '一', '二', '三', '四', '五', '六'][value ]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}