/**
 * 教师表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const teacher = mysqlConn.define('teacher', {
    teacher_id: {
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
    college_id: sequelize.INTEGER(11),
    phone: sequelize.STRING(45),
    state: sequelize.STRING(20),
    graduation: sequelize.STRING(45),
    hometown: sequelize.STRING(45),
    entertime: sequelize.DATE,
    nation: sequelize.STRING(45),
}, {
    timestamps: false
})

export default teacher
