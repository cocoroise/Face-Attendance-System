/**
 * 课程表
 */
import mysqlConn from '../config/db-init'
import sequelize from 'sequelize'

const classtable = mysqlConn.define('classtable', {
    classtable_id: {
        type: sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false
    },
    class_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    course_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    teacher_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    time_year: sequelize.INTEGER(11),
    course_num: sequelize.INTEGER(11),
    classroom_id: sequelize.INTEGER(11),
    time_weekend: sequelize.INTEGER(11),
    time_hour: sequelize.TIME(2),
    course_duration: sequelize.INTEGER(11),
}, {
    timestamps: false
})

export default classtable
