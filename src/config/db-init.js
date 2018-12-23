const Sequelize = require('sequelize')
const config = require('./index.js')
const seq = new Sequelize(config.name, config.user, config.pass, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = seq
