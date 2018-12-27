/**
 * 学院表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const college = mysqlConn.define('college', {
    college_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    intro: sequelize.STRING(500),
    manager: sequelize.STRING(45)
}, {
    timestamps: false
})

export default college
