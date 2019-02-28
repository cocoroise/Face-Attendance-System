import customController from '../controllers/CustomController'
const multer = require('koa-multer')
const storage = multer.diskStorage({
  // 文件保存路径
  destination: function(req, file, cb) {
    cb(null, 'src/public/')
  },
  // 修改文件名称
  filename: function(req, file, cb) {
    let originName = file.originalname
    let fileType = file.mimetype.split('/')[1]
    cb(null, `${originName}.${fileType}`)
  }
})
// 拦截form-data类的文件
const upload = multer({ storage: storage })

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
    .post('/api/getUserAvator', customController.getUserAvator)
    .post('/api/uploadAvator', upload.single('file'), customController.uploadAvator)
}
