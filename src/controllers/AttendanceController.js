/**
 * 关于考勤表的两个model的操作
 * attendance班级考勤表
 * student_attendance学生考勤表
 */

import attendance from '../models/attendance'
import stu_attendance from '../models/stu_attendance'
import Dao from '../middlewares/common-dao'
import seqInstance from '../config/db-init'
import Sequelize from 'sequelize'

import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
class AttendanceController {
  // get 查询班级考勤信息 输入班级id
  async getAttendance(ctx) {
    let {
      query: { id }
    } = ctx.query
    let query_one = ''
    if (id) {
      query_one = `and class.class_id=${id}`
    }
    let sql_query = `
        SELECT * FROM attendance.attendance_view
        ${query_one}
        `
    const res = await seqInstance
      .query(sql_query)
      .then(res => {
        ctx.body = {
          res
        }
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.FETCH_ATTENDANCE_ERROR)
      })
    return res
  }
  // post
  async addAttendance(ctx) {
    let param = ctx.request.body
    const res = await Dao.create(attendance, param)
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('add attendance----->', err)
        throw new ApiError(ApiErrorNames.ADD_ATTENDANCE_ERROR)
      })
    return res
  }
  // 获取老师教的课程和
  async getAttendanceOfTeacher(ctx) {
    const { teacher_id } = ctx.query
    let course_query = ''
    if (ctx.query.course_id) {
      let { course_id } = ctx.query
      course_query = `and course_id=${course_id}`
    }
    let query_str = `SELECT * FROM attendance.classtable_view where teacher_id=${teacher_id} ${course_query}`
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('getAttendanceOfTeacher---->', err)
        throw new ApiError(ApiErrorNames.ADD_ATTENDANCE_ERROR)
      })
  }
  // 获取折线图的教师考勤数据
  async lineChartDataOfTeacher(ctx) {
    const { teacher_id, course_id, class_id } = ctx.query
    const query_str = `SELECT date,attendance_percentage FROM attendance.attendance_view
    where teacher_id=${teacher_id}
    and class_id=${class_id}
    and course_id=${course_id}
    `
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        let result = [
          {
            aspectChinese: '教师考勤',
            aspect: '考勤数据',
            name: '考勤率',
            stats: res
          }
        ]
        ctx.body = result
      })
      .catch(err => {
        console.log('lineChartDataOfTeacher---->', err)
        throw new ApiError('lineChartDataOfTeacher get an error')
      })
  }
  // 获取全部考勤的学生信息
  async getStuAttendanceList(ctx) {
    const { attendance_id } = ctx.query
    let query_str = `
    SELECT a.*,s.time,IFNULL(s.status,0) as status,s.date FROM
    attendance.student as a left join stu_attendance as s 
    on a.stu_id = s.stu_id  where class_id=
    (select class_id from attendance_view 
      where attendance_view.attendance_id=${attendance_id});
    `

    let percent = await Dao.findOne(attendance, { attendance_id }).then(res => {
      return Number(res.attendance_percentage).toFixed(2)
    })
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = { list: res, percent }
      })
      .catch(err => {
        console.log('getStuAttendanceList---->', err)
        throw new ApiError('getStuAttendanceList get an error')
      })
    return true
  }
  // post 添加学生考勤记录
  async addStuAttendance(ctx) {
    let param = ctx.request.body
    const res = await Dao.create(attendance, param)
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('add attendance----->', err)
        throw new ApiError(ApiErrorNames.ADD_ATTENDANCE_ERROR)
      })
    return res
  }
  // 学生登陆时获取当天考勤信息 前后20分钟的考勤信息
  async getStuAttendance(ctx) {
    const { time, date, stu_id } = ctx.request.query
    let query_str = `
    select * from attendance_view as a 
      where a.classtable_id in (
        select classtable_id from classtable
        where classtable.class_id = (select class_id from student where student.stu_id=${stu_id})
      )
      and date='${date}'
      and abs(TIME_FORMAT('${time}', "%H%i") - TIME_FORMAT(time, "%H%i")) < 20
    `
    const attendance_id = await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('err------->', err)
        throw new ApiError('getStuAttendance id error')
      })
    return attendance_id
  }
}
export default new AttendanceController()
