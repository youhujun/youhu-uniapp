
/**
 * 
 * @param {表单对象} formObj 
 * @param {选择图片除回调函数的参数} param 
 * @returns 
 */
export function chooseImage(param)
{
	return new Promise((resolve,reject)=>
	{
		const callBack = 
		{
			success: function (result) 
			{	
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

	 	const choosImage = {...param,...callBack}

	 	//console.log(choosImage)

		uni.chooseImage(choosImage)
	})
	 
}

/**
 * 
 * @param {预览图片传递参数} param 
 * @returns 
 */
export function previewImage(param)
{

	return new Promise((resolve,reject)=>
	 {
		const callBack = 
		{
			success: function (res) 
			{
				console.log(res)
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

	 	const previewImage = {...param,...callBack}

	 	console.log(previewImage)

		uni.previewImage(previewImage)
	})

}

