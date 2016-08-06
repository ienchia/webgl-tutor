'use strict'

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING(64),
    }, {
        classMethods: {
            associate(models) {
                User.hasMany(models.LessonHistory)
            }
        }
    })
    return User
}
