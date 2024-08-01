/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-06-08 10:50:51
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-22 13:56:18
 */
let VUE_APP_URL = 'https://domain'
let VUE_APP_HOST = 'domain'
let VUE_APP_BASE_API  = 'https://domain/api/v1/phone'
let VUE_APP_PREFIX = 'yh_'
let VUE_APP_SOCKET_PORT = '9001'

 if(process.env.NODE_ENV === 'development' && process.env.DEV !== 'undefined')
{
	if(process.env.DEV === 'ONLINE')
	{
		VUE_APP_URL= "http://domain",
		VUE_APP_HOST="domain",
		VUE_APP_BASE_API ="http://domain/api/v1/phone",
		VUE_APP_PREFIX="yh_"
	}
	
	if(process.env.DEV === 'YOUHU')
	{
		VUE_APP_URL= "http://domain",
		VUE_APP_HOST="domain",
		VUE_APP_BASE_API ="http://domain/api/v1/phone",
		VUE_APP_PREFIX="yh_"
	}
	
	if(process.env.DEV === 'LOCAL')
	{
		VUE_APP_URL= "http://domain",
		VUE_APP_HOST="domain",
		VUE_APP_BASE_API ="http://domain/api/v1/phone",
		VUE_APP_PREFIX="yh_"
	}
} 

 module.exports = {
	VUE_APP_URL:VUE_APP_URL,
	VUE_APP_BASE_API:VUE_APP_BASE_API ,
	VUE_APP_HOST:VUE_APP_HOST,
	VUE_APP_PREFIX:VUE_APP_PREFIX,
	VUE_APP_SOCKET_PORT:VUE_APP_SOCKET_PORT
} 

