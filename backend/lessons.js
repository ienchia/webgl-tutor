const db = require('./sequelize')

module.exports = {
    *list() {
        this.body = {
            username: this.session.username,
            lessons: [1, 2, 3, 4, 5].map(d => `lessons #${d}`)
        }
    }
}
