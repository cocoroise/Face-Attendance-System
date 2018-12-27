/**
 * 学生表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const student = mysqlConn.define('student', {
    stu_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    uid: {
        type: sequelize.INTEGER(11),
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
    major_id: sequelize.INTEGER(11),
    class_id: sequelize.INTEGER(11),
    college_id: sequelize.INTEGER(11),
    phone: sequelize.STRING(45),
    email: sequelize.STRING(45),
    address: sequelize.STRING(45),
    nation: sequelize.STRING(45),
}, {
    timestamps: false
})

export default student
