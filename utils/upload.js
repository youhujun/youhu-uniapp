/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2023-05-29 16:05:51
 * @LastEditors: YouHuJun
 * @LastEditTime: 2023-05-29 16:51:16
 */


const setting  = require('../config/setting.js')

//console.log(setting)

import store from '@/store'; // 引入store

const service =  (params) =>
{
    return new Promise((resolve,reject)=>
    {
        const callBack = {

            success:  (result) => 
            {
                //console.log('请求成功:');
                //console.log(result);
                let {statusCode,data} = result

                if(statusCode === 200)
                {
					
					data = JSON.parse(data)
					
					//console.log(data)
					
					if(data.code === 0)
					{
						resolve(data)
					}
					else if(data.code === -10010)
					{
						//退出
						//console.log('退出')
						store.dispatch('user/logout')
					}
					else if(data.code !== -10010 && data.code < 0)
					{
						uni.showToast({
							icon: 'error',
							title: data.msg
						});
					}
					else
					{
						reject(result)
					}
                }
                else
                {
                    reject(result)
                } 
            },
            fail:(error) =>{
                //console.log('请求失败:');
                console.log(error);
                reject(error)
            },
            complete:(result)=>{
                //console.log('请求完成:');
                //console.log(result);
				//uni.hideLoading();
            }
        }
		
        const common = {...params,...callBack}

		if(common.hasOwnProperty('url'))
		{
			common.url = setting.VUE_APP_BASE_API + common.url
		}

        uni.uploadFile(common)
    })
}

export default service