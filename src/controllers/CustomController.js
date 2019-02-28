/**
 * 管理员，学生和教师的接口
 * 暂时只有CRUD的接口
 * 有需要再加
 */

import user from '../models/user'
import student from '../models/student'
import teacher from '../models/teacher'
import Dao from '../middlewares/common-dao'
import seqInstance from '../config/db-init'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

import { readImg } from '../utils/tools'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

class CustomController {
  /**
   * 管理员用接口
   */
  // get
  async getAllUsers(ctx) {
    try {
      const res = await Dao.findAll(user)
      ctx.body = {
        res
      }
    } catch (err) {
      throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
    }
    return true
  }
  // get
  async getUserById(ctx) {
    let { user_id } = ctx.query
    await Dao.findAll(user, {
      user_id: user_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
      })
  }
  // post
  async addUser(ctx) {
    let query = ctx.request.body
    await Dao.create(user, query)
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.ADD_CUSTOM_ERROR)
      })
    return true
  }
  // patch
  async updateUser(ctx) {
    let query = ctx.request.body
    let { user_id } = query
    await Dao.update(user, query, {
      user_id: user_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_CUSTOM_ERROR)
      })
    return true
  }
  // delete
  async deleteUser(ctx) {
    let query = ctx.query
    await Dao.destroy(user, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CUSTOM_ERROR)
      })
  }

  /**
   * 教师用接口
   */
  // get 输入id 没有就是搜索全部
  async getAllTeachers(ctx) {
    let {
      query: { teacher_id }
    } = ctx
    let query_one = ''
    if (teacher_id) {
      query_one = `where teacher_id=${teacher_id}`
    }
    let sql_query = `
        SELECT * FROM attendance.teacher_view
        ${query_one}
        `
    const res = await seqInstance
      .query(sql_query, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
      })
    return res
  }
  // get
  async getTeacherByName(ctx) {
    let { name } = ctx.query
    await Dao.findAll(teacher, {
      // 模糊搜索
      name: {
        [Op.like]: `%${name}%`
      }
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new Error('get teacher error')
      })
    return true
  }
  // post
  async addTeacher(ctx) {
    let query = ctx.request.body
    await Dao.create(teacher, query)
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.ADD_CUSTOM_ERROR)
      })
  }

  // patch
  async updateTeacher(ctx) {
    let query = ctx.request.body
    const { teacher_id } = query
    await Dao.update(teacher, query, {
      teacher_id: teacher_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_CUSTOM_ERROR)
      })
  }
  // delete
  async deleteTeacher(ctx) {
    let query = ctx.query
    await Dao.destroy(teacher, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CUSTOM_ERROR)
      })
  }
  /**
   * 学生用接口
   */
  // get
  async getAllStudents(ctx) {
    let {
      query: { id }
    } = ctx
    let query_one = ''
    if (id) {
      query_one = `and s.stu_id=${id}`
    }
    // 纯sql嵌套查询
    let query_str = `select s.*,m.major_name,c.college_name,u.password,class.class_name
    from student as s ,major_view as m,college_view as c,user_view as u,class_view as class
    where s.uid=u.user_id 
    and s.major_id=m.major_id
    and s.class_id=class.class_id
    and s.college_id=c.college_id
      ${query_one}
      `
    const res = await seqInstance
      .query(query_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
      })
    return res
  }
  // get 模糊搜索NAME
  async getStudentByName(ctx) {
    let { name } = ctx.query
    await Dao.findAll(student, {
      name: {
        [Op.like]: `%${name}%`
      }
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new Error('get student by name error' + err)
      })
    return true
  }
  // post
  async addStudent(ctx) {
    let query = ctx.request.body
    // 插入学生之前要先插入用户表
    await Dao.create(user, { password: query.password, type: 2 })
      .then(res => {
        Object.assign(query, { uid: res.user_id })
      })
      .catch(err => {
        console.log('error------>', err)
      })
    // 用拿到的user表的user_id插入一条学生记录
    await Dao.create(student, query)
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('err------->', err)
        throw new ApiError(ApiErrorNames.ADD_CUSTOM_ERROR)
      })
  }
  // patch
  async updateStudent(ctx) {
    let query = ctx.request.body
    let { stu_id } = query
    await Dao.update(student, query, {
      stu_id: stu_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.UPDATE_CUSTOM_ERROR)
      })
  }
  // get 获取头像 传stu_id
  async getUserAvator(ctx) {
    const { stu_id } = ctx.request.body
    const fileName = `${stu_id}-avator.png`
    const res = await readImg(fileName).catch(e => {
      throw new ApiError(ApiErrorNames.IMG_DOT_EXIST)
    })
    if (res) {
      ctx.type = 'application/octet-stream'
      ctx.body = res
    }
  }
  // get
  async uploadAvator(ctx) {
    ctx.body = '修改成功'
    return true
  }

  // delete
  async deleteStudent(ctx) {
    let query = ctx.query
    await Dao.destroy(student, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CUSTOM_ERROR)
      })
  }
}

export default new CustomController()
