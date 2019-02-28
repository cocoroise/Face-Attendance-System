const fs = require('fs')

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

// 读取文件
function readImg(filePath) {
  let data = []
  const fileStr = `src/public/${filePath}`
  return new Promise((resolve, reject) => {
    fs.exists(fileStr, exist => {
      if (exist) {
        const readerStream = fs.createReadStream(`src/public/${filePath}`)
        readerStream.on('data', chunk => {
          data.push(chunk)
        })
        readerStream.on('end', () => {
          const finalData = Buffer.concat(data)
          resolve(finalData)
        })
      } else {
        reject('file not exist')
      }
    })
  })
}

export { uniqueArr, uniqueObjArr, readImg }
