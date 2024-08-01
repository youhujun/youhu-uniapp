/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2022-06-08 10:37:41
 * @LastEditors: YouHuJun
 * @LastEditTime: 2023-05-29 16:41:53
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
                const {statusCode,data} = result

                if(statusCode === 200)
                {
					if(data.code === 0)
					{
						resolve(data)
					}
					else if(data.code === 60030)
					{
						//退出
						//console.log('退出')
						store.dispatch('user/logout')
					}
					else if(data.code !== 60030 )
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

		uni.request(common)
        
    })
}

//拦截器
uni.addInterceptor('request', 
{
  invoke(args) 
  {
	//console.log(args)
	//处理token,给请求添加header,然后给header添加X-Token
	//console.log(store.getters.token)
	//先判断是否是uniCloud
	if(args.hasOwnProperty('uniCloud'))
	{
		//console.log('自定义api请求')
		if(store.getters.token)
		{
			const header = {}
			header['X-Token'] = store.getters.token
			args['header'] = header
		}
		//console.log(args)
		// request 触发前拼接 url 
		/* uni.showLoading({
		    title: '加载中...'
		}); */
		
		if(!(args.url.includes('https')||args.url.includes('http')))
		{
			/* if(process.env.NODE_ENV === 'development')
			{
				// #ifdef MP-WEIXIN || APP-PLUS
				args.url = setting.baseUrl+args.url
				// #endif
				// #ifndef MP-WEIXIN || APP-PLUS
				args.url = setting.devUrl+args.url
				// #endif
			}
			else
			{
			    args.url = setting.baseUrl+args.url
			} 
			*/
			args.url = setting.VUE_APP_BASE_API + args.url 
			
		}
		//统一将方式转换为大写
		args.method = args.method.toUpperCase()
		//console.log(args)
	}

  },
  success(result) 
  {
    //console.log('拦截成功');
    //console.log(result);
  }, 
  fail(error) 
  {
    //console.log('失败回调拦截')
    //console.log(error);
     /* uni.showToast({
            icon: 'none',
            title: '请求失败'
          }); */
  }, 
  complete(result) 
  {
    //console.log('完成回调拦截')
    //console.log(result);
    //uni.hideLoading();
  }
})

export default service