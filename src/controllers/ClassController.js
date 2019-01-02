/**
 * 关于班级和课室的三个model的接口
 * class班级表
 * classtable课室表
 * classtable上课表
 */
import _class from '../models/class'
import classroom from '../models/classroom'
import classtable from '../models/classtable'
import Dao from '../middlewares/common-dao'

class ClassController {
    /**
     * class用接口
     * class是关键字 这里加下划线
     */

    // get
    async getAllClass(ctx) {
        const res = await Dao.findAll(_class)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getClassById(ctx) {
        let {
            class_id
        } = ctx.query
        await Dao.findAll(_class, {
                class_id: class_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get class by id error')
            })
        return true
    }
    // post
    async findOrCreateClassById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(_class, {
            query
        }).spread((user, res) => {
            if (res) {
                ctx.body = user.get({
                    plain: true
                })
                return true
            } else throw new Error('create class error')
        })
    }
    // post
    async updateClass(ctx) {
        let query = ctx.request.body
        let {
            class_id
        } = query
        await Dao.update(_class, query, {
            class_id: class_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update class error')
        })
    }
    // get
    async deleteClass(ctx) {
        let query = ctx.query
        await Dao.destroy(_class, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete class error')
            })
    }
    /**
     * classroom用接口
     */

    // get
    async getAllClassroom(ctx) {
        const res = await Dao.findAll(classroom)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getClassroomById(ctx) {
        let {
            classroom_id
        } = ctx.query
        await Dao.findAll(classroom, {
                classroom_id: classroom_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get classroom by id error')
            })
        return true
    }
    // post
    async findOrCreateClassroomById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(classroom, {
            query
        }).spread((model, res) => {
            if (res) {
                ctx.body = model.get({
                    plain: true
                })
                return true
            } else throw new Error('create classroom error')
        })
    }
    // post
    async updateClassroom(ctx) {
        let query = ctx.request.body
        let {
            classroom_id
        } = query
        await Dao.update(classroom, query, {
            classroom_id: classroom_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update classroom error')
        })
    }
    // get
    async deleteClassroom(ctx) {
        let query = ctx.query
        await Dao.destroy(classroom, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete classroom error')
            })
    }
    /**
     * classtable用接口
     */
    // get
    async getAllClasstable(ctx) {
        const res = await Dao.findAll(classtable)
        ctx.body = {
            res
        }
        return res
    }
    // get
    async getClasstableById(ctx) {
        let {
            classtable_id
        } = ctx.query
        await Dao.findAll(classtable, {
                classtable_id: classtable_id
            })
            .then(res => {
                ctx.body = res
            }).catch(() => {
                throw new Error('get classtable by id error')
            })
        return true
    }
    // post
    async findOrCreateClasstableById(ctx) {
        let query = ctx.request.body
        await Dao.findOrCreate(classtable, {
            query
        }).spread((model, res) => {
            if (res) {
                ctx.body = model.get({
                    plain: true
                })
                return true
            } else throw new Error('create classtable error')
        })
    }
    // post
    async updateClasstable(ctx) {
        let query = ctx.request.body
        let {
            classtable_id
        } = query
        await Dao.update(classtable, query, {
            classtable_id: classtable_id
        }).then(res => {
            ctx.body = res
        }).catch(() => {
            throw new Error('update classtable error')
        })
    }
    // get
    async deleteClasstable(ctx) {
        let query = ctx.query
        await Dao.destroy(classtable, query)
            .then((res) => {
                ctx.body = true
                return res
            }).catch(() => {
                throw new Error('delete classtable error')
            })
    }
}
export default new ClassController()
