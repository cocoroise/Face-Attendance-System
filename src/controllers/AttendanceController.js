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
        ctx.body = {
          res
        }
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
}
export default new AttendanceController()
