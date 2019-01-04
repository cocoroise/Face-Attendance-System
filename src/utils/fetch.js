// 封装发送请求的方法
import axios from 'axios'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

// 默认请求头
const defaultHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded' // 默认post提交方式
}
export default function fetch(url, params, method, data, _headers) {
    let header = Object.assign({}, defaultHeaders, _headers)
    let config = {
        method: method || 'get',
        url: url,
        params: params || {},
        data: data || {},
        header: header
    }
    axios(config)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log('fetch err->>>>>>', err)
            throw new ApiError(ApiErrorNames.FETCH_ERROR)
            // return Promise.reject(err.response)
        })
}
