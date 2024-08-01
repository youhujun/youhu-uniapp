
/**
 * @param {获取位置} param
 */
export function getLocation(param)
{
	return new Promise((resolve,reject)=>
	 {
		const callBack = 
		{
			success: function (result) 
			{
				//console.log(res)
				resolve(result)
			},
			fail(error)
			{
				console.log(error)
				reject(error)
			},
			complete(result)
			{
				//console.log(result)
			}
	 	}
	
	 	const location = {...param,...callBack}
	
	 	//console.log(location)
	
		uni.getLocation(location)
	})
}