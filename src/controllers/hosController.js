import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import Hos from '../models/hos'
const Dao = require('../middlewares/common-dao')

class HosController {
    // get
    async getHosList(ctx) {
        const list = await Dao.findAll(Hos)
        ctx.body = {
            list
        }
        return true
    }
    // get
    async getHos(ctx) {
        let param = ctx.query
        await Dao.findOne(Hos, {
                name: param
            })
            .then((res) => {
                ctx.body = res
            }).catch(() => {
                throw new ApiError(ApiErrorNames.HOS_NOT_EXIST)
            })
        return true
    }
    // post
    async addHos(ctx) {
        let user_query = ctx.request.body
        await Dao.findOrCreate(Hos, user_query)
            .then(() => {
                ctx.body = '112233'
            }).catch((err) => {
                console.log(err)
                throw new ApiError(ApiErrorNames.ADD_HOS_ERROR)
            })
        return true
    }
    // post
    async updateHos(ctx) {
        let user_query = ctx.request.body
        await Dao.update(Hos, user_query)
            .then(() => {
                ctx.body = true
            }).catch(() => {
                throw new ApiError(ApiErrorNames.UPDATE_HOS_ERROR)
            })
        return true
    }
    // get
    async deleteHos(ctx) {
        let user_query = ctx.query
        await Dao.destroy(Hos, {
                phone: user_query
            })
            .then(() => {
                ctx.body = true
            }).catch(() => {
                throw new ApiError(ApiErrorNames.DELETE_HOS_ERROR)
            })
    }
}
module.exports = new HosController()
