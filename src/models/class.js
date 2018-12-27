/**
 * 班级表
 * 变量名跟关键字冲突了
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const _class = mysqlConn.define('class', {
    class_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(45),
        allowNull: false
    },
    number: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    headteacher_id: sequelize.INTEGER(11),
    college_id: sequelize.INTEGER(11),
}, {
    timestamps: false
})

export default _class
