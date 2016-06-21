'use strict'

module.exports = function (sequelize, DataTypes){
    const LessonHistory = sequelize.define('LessonHistory', {
    }, {
        classMethods: {
            associate(models) {
                LessonHistory.belongsTo(models.Lesson)
            }
        }
    })
    return LessonHistory
}
