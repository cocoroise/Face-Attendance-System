import routesLoader from '../utils/routesLoader'
const header = require('../middlewares/header')

export default router => {
  router.use('*', header)
  routesLoader(`${__dirname}`).then(routersList => {
    console.log('---------initRouter----------')
    routersList.forEach(initRouter => {
      initRouter.default(router)
    })
  })
}
