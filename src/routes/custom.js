import customController from '../controllers/CustomController'
export default async router => {
  router
    // 用户
    .get('/api/allUser', customController.getAllUsers)
    .get('/api/user', customController.getUserById)
    .post('/api/user', customController.addUser)
    .patch('/api/user', customController.updateUser)
    .delete('/api/user', customController.deleteUser)
    // 教师
    .get('/api/allTeacher', customController.getAllTeachers)
    .get('/api/getTeacher', customController.getTeacherByName)
    .post('/api/addTeacher', customController.addTeacher)
    .patch('/api/updateTeacher', customController.updateTeacher)
    .delete('/api/deleteTeacher', customController.deleteTeacher)
    // 学生
    .get('/api/allStudent', customController.getAllStudents)
    .get('/api/getStudentByName', customController.getStudentByName)
    .get('/api/getStudentById', customController.getStudentById)
    .post('/api/student', customController.addStudent)
    .patch('/api/student', customController.updateStudent)
    .delete('/api/student', customController.deleteStudent)
}
