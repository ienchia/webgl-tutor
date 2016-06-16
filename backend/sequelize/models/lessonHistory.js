'use strict'

module.exports = function (sequelize, DataTypes){
    const LessonHistory = sequelize.define('LessonHistory', {
    }, {
        classMethods: {
            associate(models) {
                LessonHistory.hasOne(models.Lesson)
            }
        }
    })
    return LessonHistory
}
