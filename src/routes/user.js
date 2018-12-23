import userController from '../controllers/UserController'
export default async router => {
  router
    .get('/api/userInfo', userController.getUser)
    .get('/api/userInfoById', userController.getUserById)
    .get('/api/userList', userController.getUsers)
    .post('/api/addUser', userController.addUser)
    .post('/api/updateUser', userController.updateUser)
    .get('/api/deleteUser', userController.deleteUser)
}
