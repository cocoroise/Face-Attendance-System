/* eslint-disable indent */
/**
 * 统一处理处理数据库的方法
 */
function findOne(model, condition, attributes = []) {
  let query = {
    where: condition,
    raw: true
  }
  if (attributes && attributes.length > 0) {
      query['attributes'] = attributes
    }
  return model.findOne(query)
}

function findAll(model, condition, attributes = [], offset = 0, limit = 0, order = '') {
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
  return model.findAll(query)
}

function count(model, condition) {
  let query = {
      where: condition
        // raw: true
    }
  return model.count(query)
}

function findAndCount(model, condition, attributes = [], offset = 0, limit = 0, order = '') {
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

function findOrCreate(model, condition, defaults) {
  let query = {
      where: condition,
      defaults: defaults
    }
  return model.findOrCreate(query)
}

async function create(model, defaults) {
  let res = await model.create(defaults)
  return res.dataValues
}

function update(model, values, condition) {
  let query = {
      where: condition
    }
  return model.update(values, query)
}

function destroy(model, condition) {
  let query = {
      where: condition
    }
  return model.destroy(query)
}

module.exports = {
  findOne: findOne,
  findAll: findAll,
  count: count,
  findAndCount: findAndCount,
  findOrCreate: findOrCreate,
  create: create,
  update: update,
  destroy: destroy
}
