'use strict'

module.exports = function (sequelize, DataTypes) {
    const CpdHeader = sequelize.define('CpdHeader', {
        probability: DataTypes.FLOAT
    }, {
        classMethods: {
            associate(models) {
                CpdHeader.hasMany(models.CpdDetail)
            }
        }
    })

    return CpdHeader
}
