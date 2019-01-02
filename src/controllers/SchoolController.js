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

export default class SchoolController {
    /**
     * college
     */
    // get
    async getAllCollege(ctx) {
        const res = await Dao.findAll(college)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getCollegeById(ctx) {
        let {
            college_id
        } = ctx.query
        await Dao.findAll(college, {
                college_id: college_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get college by id error')
            })
        return true
    }
    // post
    async findOrCreateCollegeById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(college, {
            query
        }).spread((model, res) => {
            if (res) {
                ctx.body = model.get({
                    plain: true
                })
                return true
            } else throw new Error('create college error')
        })
    }
    // post
    async updateCollege(ctx) {
        let query = ctx.request.body
        let {
            college_id
        } = query
        await Dao.update(college, query, {
            college_id: college_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update college error')
        })
    }
    // get
    async deleteCollege(ctx) {
        let query = ctx.query
        await Dao.destroy(college, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete college error')
            })
    }
    /**
     * course
     */
    // get
    async getAllCourse(ctx) {
        const res = await Dao.findAll(course)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getCourseById(ctx) {
        let {
            course_id
        } = ctx.query
        await Dao.findAll(course, {
                course_id: course_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get course by id error')
            })
        return true
    }
    // post
    async findOrCreateCourseById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(course, {
            query
        }).spread((model, res) => {
            if (res) {
                ctx.body = model.get({
                    plain: true
                })
                return true
            } else throw new Error('create course error')
        })
    }
    // post
    async updateCourse(ctx) {
        let query = ctx.request.body
        let {
            course_id
        } = query
        await Dao.update(course, query, {
            course_id: course_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update course error')
        })
    }
    // get
    async deleteCourse(ctx) {
        let query = ctx.query
        await Dao.destroy(course, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete course error')
            })
    }
    /**
     * major
     */
    // get
    async getAllMajor(ctx) {
        const res = await Dao.findAll(major)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getMajorById(ctx) {
        let {
            major_id
        } = ctx.query
        await Dao.findAll(major, {
                major_id: major_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get major by id error')
            })
        return true
    }
    // post
    async findOrCreateMajorById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(major, {
            query
        }).spread((model, res) => {
            if (res) {
                ctx.body = model.get({
                    plain: true
                })
                return true
            } else throw new Error('create major error')
        })
    }
    // post
    async updateMajor(ctx) {
        let query = ctx.request.body
        let {
            major_id
        } = query
        await Dao.update(major, query, {
            major_id: major_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update major error')
        })
    }
    // get
    async deleteMajor(ctx) {
        let query = ctx.query
        await Dao.destroy(major, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete major error')
            })
    }
}
