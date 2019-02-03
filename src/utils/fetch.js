// 封装发送请求的方法
import axios from 'axios'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

// 默认请求头
const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded', // 默认post提交方式
  'Access-Control-Allow-Origin': '*'
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
  return axios(config)
}
