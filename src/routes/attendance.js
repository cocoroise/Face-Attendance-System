import attendanceController from '../controllers/AttendanceController'
export default async router => {
    router
        // 班级考勤记录
        .get('/api/attendance', attendanceController.getAttendance)
        .post('/api/attendance', attendanceController.addAttendance)
        .patch('/api/attendance', attendanceController.updateAttendance)
        .post('/api/addStuAttendance', attendanceController.addStuAttendance)
        .get('/api/attendanceOfteacher', attendanceController.getAttendanceOfTeacher)
        .get('/api/lineChartDataOfTeacher', attendanceController.lineChartDataOfTeacher)
        .get('/api/lineChartOfTeacher', attendanceController.lineChartOfTeacher)
        .get('/api/getStuAttendanceList', attendanceController.getStuAttendanceList)
        .get('/api/getStuAttendance', attendanceController.getStuAttendance)
        .get('/api/getStuAttendanceStatus', attendanceController.getStuAttendanceStatus)
        .get('/api/getLineChartOfStudent', attendanceController.getLineChartOfStudent)
        .get('/api/getCalendarOfStudent', attendanceController.getCalendarOfStudent)
}
