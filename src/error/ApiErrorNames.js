// API错误名称
var ApiErrorNames = {
  UNKNOW_ERROR: 'unknowError',
  // custom
  CUSTOM_NOT_EXIST: 'CustomNotExist',
  ADD_CUSTOM_ERROR: 'addCustomError',
  UPDATE_CUSTOM_ERROR: 'updateCustomError',
  DELETE_CUSTOM_ERROR: 'deleteCustomError',
  // class
  CLASS_NOT_EXIST: 'ClassNotExist',
  ADD_CLASS_ERROR: 'addClassError',
  UPDATE_CLASS_ERROR: 'updateClassError',
  DELETE_CLASS_ERROR: 'deleteClassError',
  // school
  SCHOOL_NOT_EXIST: 'SchoolNotExist',
  ADD_SCHOOL_ERROR: 'addSchoolError',
  UPDATE_SCHOOL_ERROR: 'updateSchoolError',
  DELETE_SCHOOL_ERROR: 'deleteSchoolError',
  // attendance
  FETCH_ATTENDANCE_ERROR: 'fetchAttendanceError',
  UPDATE_ATTENDANCE_ERROR: 'updateAttendanceError',
  // fetch
  FETCH_ERROR: 'fetctError'
}

// API错误名称对应的错误信息
const errorMap = new Map()

errorMap.set(ApiErrorNames.UNKNOW_ERROR, {
  code: -1,
  message: '未知错误'
})
// CUSTOM
errorMap.set(ApiErrorNames.CUSTOM_NOT_EXIST, {
  code: 101,
  message: '用户不存在'
})
errorMap.set(ApiErrorNames.ADD_CUSTOM_ERROR, {
  code: 102,
  message: '添加用户失败'
})
errorMap.set(ApiErrorNames.UPDATE_CUSTOM_ERROR, {
  code: 103,
  message: '更新用户失败'
})
errorMap.set(ApiErrorNames.DELETE_CUSTOM_ERROR, {
  code: 104,
  message: '删除用户失败'
})
// CLASS
errorMap.set(ApiErrorNames.CLASS_NOT_EXIST, {
  code: 105,
  message: 'class不存在'
})
errorMap.set(ApiErrorNames.ADD_CLASS_ERROR, {
  code: 106,
  message: '添加class失败'
})
errorMap.set(ApiErrorNames.UPDATE_CLASS_ERROR, {
  code: 107,
  message: '更新class失败'
})
errorMap.set(ApiErrorNames.DELETE_CLASS_ERROR, {
  code: 108,
  message: '删除class失败'
})
// SCHOOL
errorMap.set(ApiErrorNames.SCHOOL_NOT_EXIST, {
  code: 109,
  message: 'school不存在'
})
errorMap.set(ApiErrorNames.ADD_SCHOOL_ERROR, {
  code: 110,
  message: '添加school失败'
})
errorMap.set(ApiErrorNames.UPDATE_SCHOOL_ERROR, {
  code: 111,
  message: '更新school失败'
})
errorMap.set(ApiErrorNames.DELETE_SCHOOL_ERROR, {
  code: 112,
  message: '删除SCHOOL失败'
})
errorMap.set(ApiErrorNames.FETCH_ATTENDANCE_ERROR, {
  code: 113,
  message: '获取考勤信息失败'
})
errorMap.set(ApiErrorNames.ADD_ATTENDANCE_ERROR, {
  code: 114,
  message: '写入考勤信息失败'
})
// FETCH
errorMap.set(ApiErrorNames.FETCH_ERROR, {
  code: 113,
  message: 'axios有问题，请检查'
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
