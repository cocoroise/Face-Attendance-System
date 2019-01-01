/**
 * 管理员，学生和教师的controller
 */

import user from '../models/user'
import student from '../models/student'
import teacher from '../models/teacher'
const Dao = require('../middlewares/common-dao')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class CustomController {
    /**
     * 管理员用接口
     */
    // get
    async getAllUsers(ctx) {
        const res = await Dao.findAll(user)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getUserById(ctx) {
        let {
            id
        } = ctx.query
        await Dao.findAll(user, {
                id: id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get user by id error')
            })
        return true
    }
    // post
    async findOrCreateUserById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(user, {
            query
        }).spread((user, res) => {
            if (res) {
                // 获取user的信息返回给ctx
                ctx.body = user.get({
                    plain: true
                })
                return true
            } else throw new Error('create user error')
        })
    }
    // post
    async updateUser(ctx) {
        let query = ctx.request.body
        let {
            id
        } = query
        await Dao.update(user, query, {
            user_id: id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update user error')
        })
    }
    // get
    async deleteUser(ctx) {
        let query = ctx.query
        await Dao.destroy(user, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
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
                name: name
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get teacher error')
            })
        return true
    }
    // post
    async findOrCreateTeacher(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(teacher, {
            query
        }).spread((teacher, res) => {
            if (res) {
                // 获取user的信息返回给ctx
                ctx.body = teacher.get({
                    plain: true
                })
                return true
            } else throw new Error('create teacher error')
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
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update teacher error')
        })
    }
    // get
    async deleteTeacher(ctx) {
        let query = ctx.query
        await Dao.destroy(teacher, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
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
                name: name
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get student by name error')
            })
        return true
    }
    // post
    async findOrCreateStudentById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(student, {
            query
        }).spread((student, res) => {
            if (res) {
                ctx.body = student.get({
                    plain: true
                })
                return true
            } else throw new Error('create student error')
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
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update studnet error')
        })
    }
    // get
    async deleteStudent(ctx) {
        let query = ctx.query
        await Dao.destroy(student, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete student error')
            })
    }
}

export default CustomController
