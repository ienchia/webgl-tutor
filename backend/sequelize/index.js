'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'

const sequelize = new Sequelize(
    process.env.DATABASE_NAME || 'database',
    process.env.DATABASE_USER || 'root',
    process.env.DATABASE_PASS || '',
    {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        port: process.env.DATABASE_PORT || 3306,
        dialect: 'mariadb',
        storage: 'db.sqlite'
    }
)

const db = {}

fs
.readdirSync(__dirname + '/models')
.filter(
    file =>
    (file.indexOf('.') !== 0)
    && (file !== 'index.js')
)
.forEach(
    file => {
        const model = sequelize.import(
            path.join(__dirname + '/models', file)
        )

        db[model.name] = model
    }
)

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

sequelize.sync()

process.env.NODE_ENV == 'development'
&& process.env.TABLES
&& process.env.TABLES.split(',').forEach(function (tableName) {
    db[tableName].sync({ force: true })
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
