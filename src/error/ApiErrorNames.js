// API错误名称
var ApiErrorNames = {
  UNKNOW_ERROR: 'unknowError',
  // user
  USER_NOT_EXIST: 'userNotExist',
  ADD_USER_ERROR: 'addUserError',
  UPDATE_USER_ERROR: 'updateUserError',
  DELETE_USER_ERROR: 'deleteUserError',
  // hos
  HOS_NOT_EXIST: 'hosNotExist',
  ADD_HOS_ERROR: 'addHosError',
  UPDATE_HOS_ERROR: 'updateHosError',
  DELETE_HOS_ERROR: 'deleteHosError'
}

// API错误名称对应的错误信息
const errorMap = new Map()

errorMap.set(ApiErrorNames.UNKNOW_ERROR, {
  code: -1,
  message: '未知错误'
})
errorMap.set(ApiErrorNames.USER_NOT_EXIST, {
  code: 101,
  message: '用户不存在'
})
errorMap.set(ApiErrorNames.ADD_USER_ERROR, {
  code: 102,
  message: '添加用户失败'
})
errorMap.set(ApiErrorNames.UPDATE_USER_ERROR, {
  code: 103,
  message: '更新用户失败'
})
errorMap.set(ApiErrorNames.DELETE_USER_ERROR, {
  code: 104,
  message: '删除用户失败'
})
errorMap.set(ApiErrorNames.HOS_NOT_EXIST, {
  code: 105,
  message: '住院用户不存在'
})
errorMap.set(ApiErrorNames.ADD_HOS_ERROR, {
  code: 106,
  message: '添加住院用户失败'
})
errorMap.set(ApiErrorNames.UPDATE_HOS_ERROR, {
  code: 107,
  message: '更新住院用户失败'
})
errorMap.set(ApiErrorNames.DELETE_HOS_ERROR, {
  code: 108,
  message: '删除住院用户失败'
})

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = errorName => {
  var errorInfo

  if (errorName) {
    errorInfo = errorMap.get(errorName)
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR
    errorInfo = errorMap.get(errorName)
  }

  return errorInfo
}

export default ApiErrorNames
