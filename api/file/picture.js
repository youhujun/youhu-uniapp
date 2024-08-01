/*
 * @Descripttion: 
 * @version: 
 * @Author: YouHuJun
 * @Date: 2023-05-29 15:51:28
 * @LastEditors: YouHuJun
 * @LastEditTime: 2023-05-29 16:45:12
 */

import request from '@/utils/upload'
import store from '@/store';

/**
 * 上传单图 
 * 示例:
 *  const uploadResult = await singleUploadPicture( result.tempFilePaths[0])
	const {pictureId} =  uploadResult
	console.log(pictureId)
 * @param {Object} filePath
 */
export function singleUploadPicture(filePath)
{
  return request({
    url: '/singleUploadPicture',
	header:{"X-Token":store.getters.token},
	filePath:filePath,
	name: 'picture'
  })
}

/**
 * 上传多图
 * 示例:
 * const {pictureIdArray,pictureArray} = await multipleUploadPicture(result.tempFilePaths)
 * @param {Object} filePaths
 */
export async function multipleUploadPicture(filePaths)
{
   let pictureIdArray = []
   let pictureArray = []
	
   for (let key in filePaths)
   {
   	const uploadResult = await singleUploadPicture(filePaths[key])
   	const {pictureId,data} =  uploadResult
   	pictureIdArray[parseInt(key)] = parseInt(pictureId)
	pictureArray[parseInt(key)] = data
   }
   
   return {'pictureIdArray':pictureIdArray,'pictureArray':pictureArray}
}