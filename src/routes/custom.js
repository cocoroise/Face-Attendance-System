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
    .get('/api/teacher', customController.getAllTeachers)
    .get('/api/getTeacherByName', customController.getTeacherByName)
    .post('/api/teacher', customController.addTeacher)
    .patch('/api/teacher', customController.updateTeacher)
    .delete('/api/teacher', customController.deleteTeacher)
    // 学生
    .get('/api/student', customController.getAllStudents)
    .get('/api/getStudentByName', customController.getStudentByName)
    .post('/api/student', customController.addStudent)
    .patch('/api/student', customController.updateStudent)
    .delete('/api/student', customController.deleteStudent)
}
