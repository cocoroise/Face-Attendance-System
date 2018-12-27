/**
 * 学生个人考勤表
 * 于此相对的是班级考勤表
 * 这张表是记录学生每次考勤的记录
 * 而班级考勤表是记录一个班每次考勤的记录
 */

import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const stu_attendance = mysqlConn.define('stu_attendance', {
    stu_attendance_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    attendance_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    time: {
        type: sequelize.TIME(2),
        allowNull: false
    },
    weekend: sequelize.INTEGER(11),
    status: sequelize.STRING(10),
    face: sequelize.STRING(10)
}, {
    timestamps: false
})

export default stu_attendance
