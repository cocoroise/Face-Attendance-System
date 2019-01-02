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
            console.log('err->', err)
        }
        return true
    }
    // get
    async getUserById(ctx) {
        let {
            id
        } = ctx.query
        await Dao.findAll(user, {
                user_id: id
            })
            .then(res => {
                ctx.body = res
                console.log('getUserById->', res)
            })
            .catch(() => {
                throw new Error('get user by id error')
            })
        return true
    }
    // post
    async findOrCreateUserById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(user, query)
            .then(res => {
                ctx.body = res
            })
            .catch(() => {
                throw new Error('find or create user error')
            })
        return true
    }
    // post
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
                throw new Error('update user error')
            })
        return true
    }
    // get
    async deleteUser(ctx) {
        let query = ctx.query
        await Dao.destroy(user, query)
            .then(res => {
                ctx.body = true
                return res
            })
            .catch(() => {
                throw new Error('delete user error')
            })
    }

    /**
     * 教师用接口
     */
    // get
    async getAllTeachers(ctx) {
        const res = await Dao.findAll(teacher)
        ctx.body = {
            res
        }
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
    async findOrCreateTeacher(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(teacher, query).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('create teacher error')
        })
    }

    // post
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
                throw new Error('update teacher error')
            })
    }
    // get
    async deleteTeacher(ctx) {
        let query = ctx.query
        await Dao.destroy(teacher, query)
            .then(res => {
                ctx.body = true
                return res
            })
            .catch(() => {
                throw new Error('delete teacher error')
            })
    }
    /**
     * 学生用接口
     */
    // get
    async getAllStudents(ctx) {
        const res = await Dao.findAll(student)
        ctx.body = {
            res
        }
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
            .catch(() => {
                throw new Error('get student by name error')
            })
        return true
    }
    // post
    async findOrCreateStudentById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(student, {
            query
        }).then(res => {
            ctx.body = res
        }).catch(err => {
            console.log('findOrCreateStudent->>>', err)
            throw new Error('find or create student error')
        })
    }
    // post
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
                throw new Error('update studnet error')
            })
    }
    // get
    async deleteStudent(ctx) {
        let query = ctx.query
        await Dao.destroy(student, query)
            .then(res => {
                ctx.body = true
                return res
            })
            .catch(() => {
                throw new Error('delete student error')
            })
    }
}

export default new CustomController()
