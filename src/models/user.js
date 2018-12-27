/**
 * 用户表，包含所有用户的信息
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const user = mysqlConn.define('user', {
  user_id: {
    type: sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: sequelize.STRING(45),
    allowNull: false
  },
  type: {
    type: sequelize.INTEGER(11),
    allowNull: false
  }
}, {
  timestamps: false
})

export default user
