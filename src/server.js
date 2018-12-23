#!/usr/local/bin/babel-node

import server from './app'
const PORT = 3000
server.listen(PORT) // 监听端口
console.log(`listening on port ${PORT}`)
