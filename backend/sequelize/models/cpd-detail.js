'use strict'

module.exports = function (sequelize, DataTypes) {
    const CpdDetail = sequelize.define('CpdDetail', {
        state: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate(models) {
                CpdDetail.belongsTo(models.Lesson)
            }
        }
    })

    return CpdDetail
}
