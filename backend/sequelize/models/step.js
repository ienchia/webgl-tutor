'use strict'

module.exports = function (sequelize, DataTypes) {
    var Step = sequelize.define('Step', {
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
                Step.hasMany(models.Source)
            }
        }
    })
    return Step
}
