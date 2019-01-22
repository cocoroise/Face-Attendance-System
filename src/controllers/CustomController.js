/**
 * 管理员，学生和教师的接口
 * 暂时只有CRUD的接口
 * 有需要再加
 */

import user from '../models/user'
import student from '../models/student'
import teacher from '../models/teacher'
import Dao from '../middlewares/common-dao'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
        let {
            user_id
        } = ctx.query
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
        let {
            user_id
        } = query
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
    // get
    async getAllTeachers(ctx) {
        const res = await Dao.findAll(teacher).then(res => {
            ctx.body = {
                res
            }
        }).catch(() => {
            throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
        })
        return res
    }
    // get
    async getTeacherByName(ctx) {
        let {
            name
        } = ctx.query
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
        await Dao.create(teacher, query).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new ApiError(ApiErrorNames.ADD_CUSTOM_ERROR)
        })
    }

    // patch
    async updateTeacher(ctx) {
        let query = ctx.request.body
        let {
            phone
        } = query
        await Dao.update(teacher, query, {
            phone: phone
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
        const res = await Dao.findAll(student).then(res => {
            ctx.body = {
                res
            }
        }).catch(() => {
            throw new ApiError(ApiErrorNames.CUSTOM_NOT_EXIST)
        })
        return res
    }
    // get
    async getStudentByName(ctx) {
        let {
            name
        } = ctx.query
        await Dao.findAll(student, {
            name: {
                [Op.like]: `%${name}%`
            }
        })
            .then(res => {
                ctx.body = res
            })
            .catch((err) => {
                throw new Error('get student by name error' + err)
            })
        return true
    }
    // get
    async getStudentById(ctx) {
        let {
            id
        } = ctx.query
        await Dao.findAll(student, {
            stu_id: id
        })
            .then(res => {
                ctx.body = res
            })
            .catch((err) => {
                throw new Error('get student by id error' + err)
            })
        return true
    }
    // post
    async addStudent(ctx) {
        let query = ctx.request.body
        await Dao.create(student, query).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new ApiError(ApiErrorNames.ADD_CUSTOM_ERROR)
        })
    }
    // patch
    async updateStudent(ctx) {
        let query = ctx.request.body
        let {
            phone
        } = query
        await Dao.update(student, query, {
            phone: phone
        })
            .then(res => {
                ctx.body = res
            })
            .catch(() => {
                throw new ApiError(ApiErrorNames.UPDATE_CUSTOM_ERROR)
            })
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
