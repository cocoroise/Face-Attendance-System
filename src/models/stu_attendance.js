/**
 * 学生个人考勤表
 * 于此相对的是班级考勤表
 * 这张表是记录学生每次考勤的记录
 * 而班级考勤表是记录一个班每次考勤的记录
 */

import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const stu_attendance = mysqlConn.define(
  'stu_attendance',
  {
    stu_id: {
      type: sequelize.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    attendance_id: {
      type: sequelize.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    time: {
      type: sequelize.TIME(2),
      allowNull: false
    },
    date: sequelize.STRING(60),
    status: sequelize.INTEGER(10),
    face: sequelize.INTEGER(10)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

export default stu_attendance
