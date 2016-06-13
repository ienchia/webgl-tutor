'use strict'

module.exports = function (sequelize, DataTypes) {
    var Source = sequelize.define('Source', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: DataTypes.TEXT,
        location: DataTypes.TEXT,
        name: DataTypes.STRING,
        type: DataTypes.STRING
    })
    return Source
}
