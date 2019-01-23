/* eslint-disable indent */
/**
 * 统一处理处理数据库的方法
 */
class CommonDao {
  // include嵌套
  findOne(model, condition, attributes = [], include) {
    let query = {
      where: condition,
      raw: true
    }
    if (attributes && attributes.length > 0) {
      query['attributes'] = attributes
    }
    if (include && Object.keys(include).length !== 0) {
      query['include'] = include
    }
    return model.findOne(query)
  }

  findAll(model, condition, attributes = [], include, offset = 0, limit = 0, order = '') {
    let query = {
      where: condition,
      offset: offset,
      raw: true
    }
    if (limit) {
      query['limit'] = limit
    }
    if (order) {
      query['order'] = order
    }
    if (attributes && attributes.length > 0) {
      query['attributes'] = attributes
    }
    if (include && Object.keys(include).length !== 0) {
      query['include'] = include
    }
    return model.findAll(query)
  }

  count(model, condition) {
    let query = {
      where: condition
      // raw: true
    }
    return model.count(query)
  }

  findAndCount(model, condition, attributes = [], offset = 0, limit = 0, order = '') {
    let query = {
      where: condition,
      offset: offset,
      raw: true
    }
    if (limit) {
      query['limit'] = limit
    }
    if (order) {
      query['order'] = order
    }
    if (attributes && attributes.length > 0) {
      query['attributes'] = attributes
    }
    return model.findAndCount(query)
  }

  findOrCreate(model, condition, defaults) {
    let query = {
      where: condition,
      defaults: defaults
    }
    return model.findOrCreate(query)
  }

  async create(model, defaults) {
    let res = await model.create(defaults)
    return res.dataValues
  }

  update(model, values, condition) {
    let query = {
      where: condition
    }
    return model.update(values, query)
  }

  destroy(model, condition) {
    let query = {
      where: condition
    }
    return model.destroy(query)
  }
}
export default new CommonDao()
// module.exports = {
//   findOne: findOne,
//   findAll: findAll,
//   count: count,
//   findAndCount: findAndCount,
//   findOrCreate: findOrCreate,
//   create: create,
//   update: update,
//   destroy: destroy
// }
