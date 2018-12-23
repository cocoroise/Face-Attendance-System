/**
 * 住院表
 * 和病历表独立
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const hos = mysqlConn.define('hos', {
  id: {
    type: sequelize.STRING(45),
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: sequelize.STRING(45),
    allowNull: false
  },
  age: {
    type: sequelize.INTEGER(11),
    allowNull: false
  },
  gender: {
    type: sequelize.STRING(15),
    allowNull: false
  },
  phone: sequelize.STRING(45),
  work: sequelize.STRING(45),
  hometown: sequelize.STRING(45),
  firstResult: sequelize.STRING(500),
  native: sequelize.STRING(45),
  mainSick: sequelize.STRING(2000),
  pastSick: sequelize.STRING(2000),
  docName: sequelize.STRING(45)
}, {
  timestamps: false
}
    )

export default hos
