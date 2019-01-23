module.exports = async (ctx, next) => {
  const { request, response } = ctx
  const origin = request.get('origin') || ''
  const allowed =
    origin.includes('192.168') || origin.includes('localhost') || origin.includes('127.0.0.1')
  if (allowed) {
    response.set('Access-Control-Allow-Origin', origin)
  }
  response.set(
    'Access-Control-Allow-Headers',
    'token, Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With'
  )
  response.set('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS')
  response.set('Access-Control-Allow-Credentials', true)
  response.set('Content-Type', 'application/json;charset=utf-8')

  if (request.method === 'OPTIONS') {
    return ctx.success('ok')
  }
  await next()
}
