'use strict'

const Step = require('./step.js')

module.exports = function (sequelize, DataTypes) {
    var Lesson = sequelize.define('Lesson', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        classMethods: {
            associate(models) {
                Lesson.hasMany(models.Step)
                Lesson.hasMany(models.CpdHeader)
            }
        }
    })
    return Lesson
}
