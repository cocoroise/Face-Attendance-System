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

// 格式化从数据库取来的信息
const formatData = function formatTeacherLineData(data) {
  let result = {}
  let axis = []
  data.map((v, index) => {
    // 加入一个class数组
    if (!result[v.class_name]) {
      result[`${v.class_name}`] = {
        name: v.class_name,
        type: 'scatter',
        stack: v.class_name,
        data: []
      }
    }
    let d = result[`${v.class_name}`]
    d.data.push('-') // 先用-占位 后替换
    if (!axis.includes(v.date)) {
      axis.push(v.date)
    }
    let i = axis.indexOf(v.date)
    d.data.splice(i, 1, v.attendance_percentage)
  })
  result.axis = axis
  return result
}
class AttendanceController {
  // get 查询班级考勤信息 输入班级id
  async getAttendance(ctx) {
    let {
      query: { attendance_id }
    } = ctx
    let query_one = ''
    if (attendance_id) {
      query_one = `where attendance_id=${attendance_id}`
    }
    let sql_query = `
        SELECT * FROM attendance.attendance_view
        ${query_one}
        `
    const res = await seqInstance
      .query(sql_query, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
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
  // patch -->update
  async updateAttendance(ctx) {
    let param = ctx.request.body
    const { duration, attendance_id } = param
    const res = await Dao.update(attendance, { duration }, { attendance_id })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('update attendance----->', err)
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
  // 获取antv/f2折线图的教师考勤数据
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
  // 获取echart折线图的教师考勤数据 传teacher_id和course_id
  async lineChartOfTeacher(ctx) {
    const { teacher_id, course_id } = ctx.query
    const query_str = `SELECT date,attendance_percentage,class_id,class_name FROM attendance.attendance_view
    where teacher_id=${teacher_id}
    and course_id=${course_id}
    order by date
    `
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = formatData(res)
      })
      .catch(err => {
        console.log('lineChartOfTeacher---->', err)
        throw new ApiError('lineChartOfTeacher get an error')
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
  // 获取学生考勤情况
  async getStuAttendanceStatus(ctx) {
    const { stu_id, attendance_id, date } = ctx.query
    await Dao.findAll(stu_attendance, { stu_id, attendance_id, date })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('err------->', err)
        throw new ApiError('getStuAttendanceStatus get an error')
      })
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

  // 返回学生折线图的数据 一周以内的 考勤时间 分上午和下午
  async getLineChartOfStudent(ctx) {
    // [220, 182, 191, 234, 290, 330, 310]
    // 返回一周以内考勤时间的数组
    const { stu_id } = ctx.query
    // 这里的日期数据是写死的 实际应该该为当前日期
    let query_str = `
    SELECT * FROM attendance.stu_attendance
    where stu_id = ${stu_id}
    and DATE_SUB('2019-2-22', INTERVAL 7 DAY) <= date
    order by date,time
    `
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        // 处理数据格式
        let am = []
        let pm = []
        let axis = []
        res.map((v, index) => {
          // am
          if (index % 2 === 0) {
            am.push(v.time)
            axis.push(v.date)
          } else {
            // pm
            pm.push(v.time)
          }
        })
        ctx.body = { am, pm, axis }
      })
      .catch(err => {
        console.log('getLineChartOfStudent------->', err)
        throw new ApiError('getLineChartOfStudent id error')
      })
    return true
  }

  // 返回学生考勤日历的数据 这个月的
  async getCalendarOfStudent(ctx) {
    //  ["2018-01-01", "1"]
    //  ["2018-01-02", "2|0"]
    //  ["2018-01-03", "1|1"]
    // 没有就是 0|0  有就是1|0 迟到就是2
    const { stu_id } = ctx.query
    let query_str = `
    SELECT * FROM attendance.stu_attendance
    where stu_id = ${stu_id}
    and DATE_FORMAT( date, '%Y%m' ) = DATE_FORMAT( '2019-2-24' , '%Y%m' )
    order by date,time
    `
    await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        let result = []
        const len = res.length
        res.map((v, index) => {
          if (index < len - 1) {
            if (v.date === res[index + 1].date) {
              let nextData = res[index + 1]
              let data = `${v.status}|${nextData.status}`
              result.push([v.date, data])
            } else {
              if (index === 0 || v.date !== res[index - 1].date) {
                const timeData = +v.time.slice(0, 2)
                let data = ''
                if (timeData > 12) {
                  // pm
                  data = `0|${v.status}`
                } else {
                  // am
                  data = `${v.status}|0`
                }
                result.push([v.date, data])
              }
            }
          }
        })
        ctx.body = result
      })
      .catch(err => {
        console.log('getCalendarOfStudent------->', err)
        throw new ApiError('getCalendarOfStudent id error')
      })
    return true
  }
}
export default new AttendanceController()
