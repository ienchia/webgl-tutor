'use strict'

module.exports = function (sequelize, DataTypes) {
    var Source = sequelize.define('Source', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        filename: DataTypes.STRING,
        content: DataTypes.TEXT
    })
    return Source
}
