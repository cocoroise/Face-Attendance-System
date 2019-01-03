/**
 * 课程表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const course = mysqlConn.define('course', {
    course_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    credits: sequelize.DECIMAL(2),
}, {
        timestamps: false,
        freezeTableName: true,
})

export default course
