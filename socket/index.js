
import { VUE_APP_HOST,VUE_APP_SOCKET_PORT } from '@/config/setting'


let socketTask = null
/**
 * socket 监听开始
 */
export function socketWoking()
{
	/* Socket.channel(VUE_APP_PREFIX + 'test').listen('.Test', (e) =>
	    {
	      // console.log('success')
	      console.log(e)
		  responseData = 10
	    }) */
	socketTask = uni.connectSocket({
		//url: 'ws://api.youhujun.com:8080', //仅为示例，并非真实接口地址。
		url: 'ws://'+ VUE_APP_HOST +':'+ VUE_APP_SOCKET_PORT,
		success:()=>{
			console.log('connect');
		},
		complete: ()=> {}
	});
	
	/**
	 * @param {Object} object
	 */
	socketTask.onClose(function(object)
	{
		console.log('connect close');
		console.log(object)
	})
	
	/**
	 * @param {Object} error
	 */
	socketTask.onError(function(error)
	{
		console.log('connect error');
		console.log(error)
	})
	
}

/**
 * 关闭连接
 */
export function socketClose()
{
	socketTask.close({code,reason,function (res)
	{
		console.log(code)
		console.log(reason)
		console.log(res)
	}});
}

/**
 * 返回链接对象
 */
export function getSocketTask()
{
	return socketTask
}

/* 
使用示例 
socketWoking();
		
let socketTask = getSocketTask()

socketTask.onOpen(function(data)
{
	console.log('connect open');

	let param = {};
	param['user_id'] = 11;
	param['type'] = 10;
	
	param = JSON.stringify(param) 
	
	//发送数据
	socketTask.send({data:param,function (res)
	{
		console.log(res)
	}});
	
	//监听事件
	socketTask.onMessage(function(object)
	{
		// console.log(object.data)
		console.log(JSON.parse(object.data))
	});
}); */