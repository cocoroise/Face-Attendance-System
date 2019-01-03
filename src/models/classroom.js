/**
 * 课室表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const classroom = mysqlConn.define('classroom', {
    classroom_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    }
}, {
        timestamps: false,
        freezeTableName: true,
})

export default classroom
