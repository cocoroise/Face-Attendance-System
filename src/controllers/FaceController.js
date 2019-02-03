/**
 * 封装百度人脸识别的接口
 */

import { addFace, VerifyFace, updateFace, deleteFace } from '../utils/faceApi'
import ApiError from '../error/ApiError'

const formatBase64 = img => {
  return img.split(',')[1]
}
class FaceAttendance {
  // 注册人脸
  async addFace(ctx) {
    let { img, user_id, group_id } = ctx.request.body
    let image = img.split(',')[1]
    let res = await addFace(user_id, group_id, image).catch(err => {
      throw new ApiError('添加人脸失败，错误为', err)
    })
    ctx.body = res
  }
  // 对比人脸
  async VerifyFace(ctx) {
    let { img, uid, group_id } = ctx.request.body
    let res = await VerifyFace(uid, formatBase64(img), group_id).catch(err => {
      throw new ApiError('对比人脸失败，错误为', err)
    })
    ctx.body = res
  }
  // 更新人脸
  async updateFace(ctx) {
    let { img, user_id, group_id } = ctx.request.body
    let res = await updateFace(user_id, group_id, formatBase64(img)).catch(err => {
      throw new ApiError('对比人脸失败，错误为', err)
    })
    ctx.body = res
  }
  // 删除人脸
  async deleteFace(ctx) {
    let { user_id } = ctx.request.body
    let res = await deleteFace(user_id).catch(err => {
      throw new ApiError('对比人脸失败，错误为', err)
    })
    ctx.body = res
  }
}
export default new FaceAttendance()
