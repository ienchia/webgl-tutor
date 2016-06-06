'use strict'

const Lessons = require('./lesson.js')

module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define('Chapter', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order: DataTypes.INTEGER,
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate(models) {
                Chapter.hasMany(models.Lesson)
            }
        }
    })

    return Chapter
}
