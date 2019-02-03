// 百度人脸识别的接口
// 图片默认传传base64，不能大于2M
// 传access_token
// 默认传参 application/x-www-form-urlencoded
// 用POST方法放在body里面
// 不包含图片头 -> data:image/jpg;base64,
// 文档地址->https://ai.baidu.com/docs#/Face-Set-V3/5867daad
import axios from './fetch'

// 百度云给的认证配置
const APP_CONFIG = {
  APPID: 15338978,
  APIKEY: 'TMT3YdY1YIHXRgPzsPdtrbEg',
  SECRECT_KEY: '0I0l2roG5bR3Uz5nCbTe9vZORog4SUvS'
}
const FACE_URL = {
  MATCH: 'https://aip.baidubce.com/rest/2.0/face/v3/match',
  VERIFY: 'https://aip.baidubce.com/rest/2.0/face/v3/search',
  ADD_FACE: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add',
  UPDATE_FACE: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/update',
  DELETE_FACE: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/delete',
  GET_FACE: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/get',
  GET_FACE_LIST: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/face/getlist', // 获取用户人脸列表
  GET_USERS: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/getusers', // 获取组内所有用户
  GET_GROUP: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/getlist', // 获取组列表
  ADD_GROUP: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/add',
  DELETE_GROUP: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/delete',
  VOICE_DETECT: 'http://vop.baidu.com/server_api',
  GESTURE_DETECT: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/gesture'
}

// 获取access_token
async function getAccessToken() {
  const config = {
    grant_type: 'client_credentials',
    client_id: APP_CONFIG.APIKEY,
    client_secret: APP_CONFIG.SECRECT_KEY
  }
  let token = await axios('https://aip.baidubce.com/oauth/2.0/token', config, 'post')
    .then(res => {
      return res.data.access_token
    })
    .catch(err => {
      return Promise.reject('获取access_token出错' + err)
    })
  return token
}

// 封装一个包含access_token的fetch方法
async function fetch(url, params, method, data, _headers) {
  let access_token = await getAccessToken()
  let param = Object.assign(
    {
      access_token: access_token
    },
    params
  )
  return axios(url, param, method, data, _headers)
}
// 人脸库->增加人脸
async function addFace(uid, group_id, pic, user_info) {
  let data = {
    user_id: uid,
    group_id: group_id,
    image: encodeURI(pic),
    image_type: 'BASE64',
    user_info: user_info || 'user info'
  }
  return fetch(FACE_URL.ADD_FACE, {}, 'post', data).then(res => {
    if (res.data.result !== {}) {
      return res.data.result.face_token
    } else {
      return res.data.error_msg
    }
  })
}
// 对比人脸组的人脸
async function VerifyFace(uid, pic, group_id) {
  pic = encodeURI(pic)
  let data = {
    uid: uid,
    image: pic,
    group_id_list: group_id,
    image_type: 'BASE64'
  }
  return fetch(FACE_URL.VERIFY, {}, 'post', data).then(res => {
    console.log('verify face---->', res.data.result)
    return res.data.result
  })
}

// 人脸库->更新人脸
async function updateFace(uid, group_id, pic, user_info) {
  let data = {
    user_id: uid,
    group_id: group_id,
    image: encodeURI(pic),
    user_info: user_info || 'user info'
  }
  return fetch(FACE_URL.UPDATE_FACE, {}, 'post', data).then(res => {
    if (res.log_id) {
      return res.log_id
    }
  })
}
// 人脸库->删除人脸
async function deleteFace(uid) {
  return fetch(FACE_URL.DELETE_FACE, {}, 'post', {
    uid: uid
  }).then(res => {
    if (res.log_id) return res.log_id
  })
}
// 人脸库->获取一个人脸资料
async function getFace(uid) {
  return fetch(FACE_URL.GET_FACE, {}, 'post', {
    uid: uid
  }).then(res => {
    if (res.log_id) return res.result
  })
}
// 获取一个组全部人脸的资料
async function getFaceList(group_id) {
  return fetch(FACE_URL.GET_GROUP, {}, 'post', {
    group_id: group_id
  }).then(res => {
    if (res.log_id) return res.result
  })
}
// 人脸库->获取全部组的名称
async function getGroup() {
  return fetch(FACE_URL.GET_GROUP, {}, 'post').then(res => {
    if (res.log_id) return res.result
  })
}
// 人脸库->获取一个组的用户资料
async function getUserList(group_id) {
  return fetch(FACE_URL.GET_USERS, {}, 'post', {
    group_id: group_id
  }).then(res => {
    if (res.log_id) return res.result
  })
}
// 人脸库->增加一个组
async function addGroup(group_id) {
  return fetch(FACE_URL.ADD_GROUP, {}, 'post', {
    group_id: group_id
  }).then(res => {
    if (res.log_id) return res.log_id
  })
}
// 人脸库->删除一个组
async function deleteGroup(group_id) {
  return fetch(FACE_URL.DELETE_GROUP, {}, 'post', {
    group_id: group_id
  }).then(res => {
    if (res.log_id) return res.log_id
  })
}
// 人脸对比 发送两张图片进行对比
async function MatchFace(pic1, pic2) {
  let images = encodeURI(pic1) + encodeURI(pic2)
  return fetch(FACE_URL.MATCH, {}, 'post', images).then(res => {
    if (res.result.score >= 80) return true
    else return false
  })
}

export {
  MatchFace,
  VerifyFace,
  addFace,
  updateFace,
  deleteFace,
  getFace,
  getFaceList,
  getGroup,
  getUserList,
  addGroup,
  deleteGroup
}
