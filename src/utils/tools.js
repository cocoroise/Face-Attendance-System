// 数组去重
function uniqueArr(arr) {
  let newArr = []
  for (var i = 0, len = arr.length; i < len; i++) {
    for (var j = 0; j < newArr.length; j++) {
      var bol
      if (
        (bol = ~(function() {
          if (arr[i] === newArr[j]) return -2
          return -1
        })())
      ) {
        break
      }
    }
    if (bol) continue
    newArr.push(arr[i])
  }
  return newArr
}

// 对象数组去重
function uniqueObjArr(arr) {
  const unique = {}
  arr.forEach(item => {
    unique[JSON.stringify(item)] = item // 键名不会重复
  })
  arr = Object.keys(unique).map(u => {
    return JSON.parse(u)
  })
  return arr
}
export { uniqueArr, uniqueObjArr }
