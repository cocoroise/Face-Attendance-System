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
function getAccessToken() {
    const config = {
        grant_type: 'client_credentials',
        client_id: APP_CONFIG.APIKEY,
        client_secret: APP_CONFIG.SECRECT_KEY
    }
    fetch('https://aip.baidubce.com/oauth/2.0/token',
        'post',
        config).then(res => {
        return res.access_token
    }).catch(err => {
        return Promise.reject('获取access_token出错' + err)
    })
}

let access_token = getAccessToken()

// 封装一个包含access_token的fetch方法
function fetch(url, params, method, data, _headers) {
    let param = Object.assign({}, {
        access_token: access_token
    }, params)
    axios(url, param, method, data, _headers)
}
// 人脸对比 发送两张图片进行对比
function MatchFace(pic1, pic2) {
    let images = encodeURI(pic1) + encodeURI(pic2)
    fetch(FACE_URL.MATCH, {}, 'post', images).then(res => {
        if (res.result.score >= 80) return true
        else return false
    }).catch(err => {
        console.log('match face error ->>>>>' + err)
    })
}
// 对比人脸库的人脸
function VerifyFace(uid, pic, group_id) {
    pic = encodeURI(pic)
    let data = {
        uid: uid,
        image: pic,
        group_id: group_id
    }
    fetch(FACE_URL.VERIFY, {}, 'post', data).then(res => {
        if (res.result[0] >= 80) return true
        else return false
    }).catch(err => {
        console.log('verify face error->>>>>' + err)
    })
}
// 人脸库->增加人脸
function addFace(uid, group_id, pic, user_info) {
    let data = {
        uid: uid,
        group_id: group_id,
        image: encodeURI(pic),
        user_info: user_info || 'user info'
    }
    fetch(FACE_URL.ADD_FACE, {}, 'post', data).then(res => {
        if (res.log_id) {
            return res.log_id
        }
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->更新人脸
function updateFace(uid, group_id, pic, user_info) {
    let data = {
        uid: uid,
        group_id: group_id,
        image: encodeURI(pic),
        user_info: user_info || 'user info'
    }
    fetch(FACE_URL.UPDATE_FACE, {}, 'post', data).then(res => {
        if (res.log_id) {
            return res.log_id
        }
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->删除人脸
function deleteFace(uid) {
    fetch(FACE_URL.DELETE_FACE, {}, 'post', {
        uid: uid
    }).then(res => {
        if (res.log_id) return res.log_id
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->获取一个人脸资料
function getFace(uid) {
    fetch(FACE_URL.GET_FACE, {}, 'post', {
        uid: uid
    }).then(res => {
        if (res.log_id) return res.result
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 获取一个组全部人脸的资料
function getFaceList(group_id) {
    fetch(FACE_URL.GET_GROUP, {}, 'post', {
        group_id: group_id
    }).then(res => {
        if (res.log_id) return res.result
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->获取全部组的名称
function getGroup() {
    fetch(FACE_URL.GET_GROUP, {}, 'post').then(res => {
        if (res.log_id) return res.result
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->获取一个组的用户资料
function getUserList(group_id) {
    fetch(FACE_URL.GET_USERS, {}, 'post', {
        group_id: group_id
    }).then(res => {
        if (res.log_id) return res.result
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->增加一个组
function addGroup(group_id) {
    fetch(FACE_URL.ADD_GROUP, {}, 'post', {
        group_id: group_id
    }).then(res => {
        if (res.log_id) return res.log_id
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
    })
}
// 人脸库->删除一个组
function deleteGroup(group_id) {
    fetch(FACE_URL.DELETE_GROUP, {}, 'post', {
        group_id: group_id
    }).then(res => {
        if (res.log_id) return res.log_id
    }).catch(err => {
        console.log('error happen -> ' + err.error_msg)
        return Promise.reject('error msg -> ' + err.error_msg)
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
