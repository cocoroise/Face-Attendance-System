import attendanceController from '../controllers/AttendanceController'
export default async router => {
    router
        // 班级考勤记录
        .get('/api/attendance', attendanceController.getAttendance)
        .post('/api/attendance', attendanceController.addAttendance)
        .get('/api/attendanceOfteacher', attendanceController.getAttendanceOfTeacher)
}
