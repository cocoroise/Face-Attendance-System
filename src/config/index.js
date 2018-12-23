/**
 * 连接数据库的配置文件
 */
import path from 'path'

const serverRoot = path.dirname(__dirname)
const root = path.resolve(serverRoot, '../')
const staticDir = path.join(root, 'static')
let config = {
  name: 'hospital',
  debug: false,
  host: 'localhost',
  env: 'dev',
  user: 'root',
  pass: '123456',
  dir: {
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}

module.exports = config
