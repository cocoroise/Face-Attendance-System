import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import convert from 'koa-convert'
import koaStatic from 'koa-static'
import cors from 'koa-cors'
import path from 'path'
import router from './router'

import config from './config'
import respondFormatter from './middlewares/respondFormatter'

const app = new Koa()
app.keys = ['hospital-cookie-auth']
app.context.config = config

app
  .use(
    cors({
      maxAge: 7 * 24 * 60 * 60,
      credentials: true,
      methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
      headers:
        'Content-Type,Origin,X-Requested-With, Accept, Authorization,Access-Control-Allow-Origin'
    })
)
  .use(logger())
  // .use(bodyParser())
  .use(
    bodyParser({
      jsonLimit: '9mb', // 控制body的parse转换大小 default 1mb
      formLimit: '4096kb' //  控制你post的大小  default 56kb
    })
  )
  .use(convert(session(app)))
  .use(koaStatic(path.join(__dirname, '/public')))
  .use(respondFormatter('^/')) // 格式化输出所有以/开头的
  .use(router.routes())
  .use(router.allowedMethods()) // 可以使用get post方法

export default app
