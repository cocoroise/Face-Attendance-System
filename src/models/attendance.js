/**
 * 班级考勤表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const attendance = mysqlConn.define(
  'attendance',
  {
    attendance_id: {
      type: sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: sequelize.DATE(45),
      allowNull: false
    },
    time: {
      type: sequelize.TIME(2),
      allowNull: false
    },
    attendance_percentage: sequelize.DECIMAL(2),
    classtable_id: sequelize.INTEGER(11),
    alter_classroom_id: sequelize.INTEGER(11),
    duration: sequelize.INTEGER(6)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

export default attendance
