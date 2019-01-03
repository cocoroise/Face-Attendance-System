/**
 * 专业表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const major = mysqlConn.define('major', {
    major_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    category: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    college_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    intro: sequelize.STRING(200),
}, {
        timestamps: false,
        freezeTableName: true,
})

export default major
