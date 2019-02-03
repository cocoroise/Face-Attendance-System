#!/usr/local/bin/babel-node

import server from './app'
// const https = require('https')
const PORT = 3000
server.listen(PORT) // 监听端口
// https.createServer(server.callback()).listen(3000)
console.log(`----------listening on port ${PORT}-----------`)
