import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import User from '../models/user'
const Dao = require('../middlewares/common-dao')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class UserController {
  // get
  async getUsers(ctx) {
    const list = await Dao.findAll(User)
    ctx.body = {
      list
    }
    return true
  }
  // get 用name查找
  async getUser(ctx) {
    let {
      name
    } = ctx.query
    await Dao.findAll(User, {
        name: {
          // 模糊搜索 使用$like不行可能是因为和别的冲突了
          [Op.like]: `%${name}%`
        }
      })
      .then(res => {
        ctx.body = res
      }).catch(() => {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
      })
    return true
  }
  // get 用id获取
  async getUserById(ctx) {
    let {
      id
    } = ctx.query
    await Dao.findAll(User, {
        id: id
      })
      .then(res => {
        ctx.body = res
      }).catch((err) => {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
      })
    return true
  }
  // post
  async addUser(ctx) {
    // 获取请求里的参数
    let user_query = ctx.request.body
    await Dao.findOrCreate(User, user_query)
      .then(() => {
      }).catch((err) => {
        throw new ApiError(ApiErrorNames.ADD_USER_ERROR)
      })
    return true
  }
  // post 输入id更新其他数据 ctx.body是后端返回的data值
  async updateUser(ctx) {
    let user_query = ctx.request.body
    let {
      id
    } = user_query
    for (let i = 0; i < 5; i++){
      console.log('aaaaaaaaaaaaaa职业：'+ user_query.work)
    }
    await Dao.update(User, user_query, {
        id: id
      })
      .then(() => {
        ctx.body = '6666'
      }).catch((err) => {
        console.log(err)
        throw new ApiError(ApiErrorNames.UPDATE_USER_ERROR)
      })
    return true
  }
  // get 传用户的手机号
  async deleteUser(ctx) {
    let {
      id: user_query
    } = ctx.query
    await Dao.destroy(User, {
        id: user_query
      })
      .then(() => {
        ctx.body = true
      }).catch(() => {
        throw new ApiError()
      })
  }
}

export default new UserController()
