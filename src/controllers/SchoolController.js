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

import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
export default class SchoolController {
    /**
     * college
     */
    // get
    async getAllCollege(ctx) {
        await Dao.findAll(college)
            .then(res => {
                ctx.body = res
            }).catch(err => {
                throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
            })
        return true
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
                throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
            })
        return true
    }
    // post
    async addCollegeById(ctx) {
        let query = ctx.request.body
        await Dao.create(college, {
            query
        }).then(res => {
            ctx.body = res
        }).catch(err => {
            throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR)
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
            throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
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
                throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
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
                throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
            })
        return true
    }
    // post
    async addCourse(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(course, {
            query
        }).then(res => {
            ctx.body = res
        }).catch(err => {
            throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR)
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
            throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
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
                throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
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
                throw new ApiError(ApiErrorNames.SCHOOL_NOT_EXIST)
            })
        return true
    }
    // post
    async addMajor(ctx) {
        let query = ctx.request.body
        await Dao.create(major, {
            query
        }).then(res => {
            ctx.body = res
        }).catch(err => {
            throw new ApiError(ApiErrorNames.ADD_SCHOOL_ERROR)
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
            throw new ApiError(ApiErrorNames.UPDATE_SCHOOL_ERROR)
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
                throw new ApiError(ApiErrorNames.DELETE_SCHOOL_ERROR)
            })
    }
}
