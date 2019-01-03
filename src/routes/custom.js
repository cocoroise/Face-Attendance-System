import customController from '../controllers/CustomController'
export default async router => {
  router
    // 用户
    .get('/api/allUser', customController.getAllUsers)
    .get('/api/getUser', customController.getUserById)
    .post('/api/addUser', customController.addUser)
    .post('/api/updateUser', customController.updateUser)
    .get('/api/deleteUser', customController.deleteUser)
    // 教师
    .get('/api/allTeacher', customController.getAllTeachers)
    .get('/api/getTeacher', customController.getTeacherByName)
    .post('/api/addTeacher', customController.addTeacher)
    .post('/api/updateTeacher', customController.updateTeacher)
    .get('/api/deleteTeacher', customController.deleteTeacher)
    // 学生
    .get('/api/allStudent', customController.getAllStudents)
    .get('/api/getStudent', customController.getStudentByName)
    .post('/api/addStudent', customController.addStudent)
    .post('/api/updateStudent', customController.updateStudent)
    .get('/api/deleteStudent', customController.deleteStudent)
}
