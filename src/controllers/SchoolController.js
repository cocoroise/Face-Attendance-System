/**
 * 学校的三个model的接口->
 * college学院表
 * course科目表
 * major专业表
 */
import college from '../models/college'
import course from '../models/course'
import major from '../models/major'
import Dao from '../middlewares/common-dao'
import seqInstance from '../config/db-init'
import ClassController from './ClassController'
import Sequelize from 'sequelize'

import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
class SchoolController {
  constructor() {
    this.getAllCollege = this.getAllCollege.bind(this)
    this.getMajor = this.getMajor.bind(this)
    this.getSchool = this.getSchool.bind(this)
  }
  /**
   * 下拉级联查询
   */
  async getSchool(ctx) {
    let allCollege = await this.getAllCollege(ctx).catch(err => {
      console.log('a类型getSchool error', err)
    })
    let allMajor = await this.getMajor(ctx).catch(err => {
      console.log('b类型getSchool error', err)
    })
    // 写入学院数组
    let result = allCollege.map(v => {
      if (v.college_id && v.name) {
        return { value: v.college_id, label: v.name, children: [] }
      }
    })
    // 写入专业数组
    result = result.map(v => {
      allMajor.map(m => {
        if (v.value && m.college_id && v.value === m.college_id) {
          v.children.push({ value: m.major_id, label: m.name, children: [] })
        }
      })
      return v
    })

    ctx.body = await this.whriteClass(result)
  }
  // 写入班级数组
  async whriteClass(result) {
    let rrr = []
    let promise_res = result.map(async v => {
      if (v.children.length !== 0) {
        for (let i of v.children) {
          let classResult = []
          await ClassController.getClassById({ major_id: i.value }).then(res => {
            classResult = res
            classResult = classResult.map(c => {
              return { value: c.class_id, label: c.name, children: [] }
            })
          })
          let tempMajor = i
          tempMajor.children = classResult
          v.children = tempMajor
          rrr.push(v)
        }
      }
    })
    // 重点：async map返回的是一个promise 数组!!!
    await Promise.all(promise_res)
    return rrr
  }
  /**
   * college
   */
  // get
  async getAllCollege(ctx) {
    let result = []
    await Dao.findAll(college)
      .then(res => {
        ctx.body = res
        result = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST, err)
      })
    return result
  }
  // get
  async getCollegeById(ctx) {
    let { college_id } = ctx.query
    await Dao.findAll(college, {
      college_id: college_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
      })
    return true
  }
  // post
  async addCollegeById(ctx) {
    let query = ctx.request.body
    await Dao.create(college, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR, err)
      })
  }
  // post
  async updateCollege(ctx) {
    let query = ctx.request.body
    let { college_id } = query
    await Dao.update(college, query, {
      college_id: college_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
      })
  }
  // get
  async deleteCollege(ctx) {
    let query = ctx.query
    await Dao.destroy(college, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
      })
  }
  /**
   * course
   */
  // get
  async getAllCourse(ctx) {
    const res = await Dao.findAll(course).then(res => {
      ctx.body = {
        res
      }
    })
    return res
  }
  // get
  async getCourseById(ctx) {
    let { course_id } = ctx.query
    await Dao.findAll(course, {
      course_id: course_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
      })
    return true
  }
  // post
  async addCourse(ctx) {
    let query = ctx.request.body
    await Dao.findOrCreate(course, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR)
      })
  }
  // post
  async updateCourse(ctx) {
    let query = ctx.request.body
    let { course_id } = query
    await Dao.update(course, query, {
      course_id: course_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
      })
  }
  // get
  async deleteCourse(ctx) {
    let query = ctx.query
    await Dao.destroy(course, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
      })
  }
  /**
   * major
   */
  // get
  async getMajor(ctx) {
    let result = []
    await Dao.findAll(major)
      .then(res => {
        ctx.body = res
        result = res
      })
      .catch(err => {
        throw new Error('getMajor errrrr->', err)
      })
    return result
  }
  // get
  async getMajorById(ctx) {
    let { major_id } = ctx.query
    await Dao.findAll(major, {
      major_id: major_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
      })
    return true
  }
  // post
  async addMajor(ctx) {
    let query = ctx.request.body
    await Dao.create(major, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR)
      })
  }
  // patch
  async updateMajor(ctx) {
    let query = ctx.request.body
    let { major_id } = query
    await Dao.update(major, query, {
      major_id: major_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
      })
  }
  // get
  async deleteMajor(ctx) {
    let query = ctx.query
    await Dao.destroy(major, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
      })
  }
}
export default new SchoolController()
