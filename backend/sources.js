const db = require('./sequelize')

module.exports = {
    *create() {
        const source = this.request.body
        const result = yield db.Source.create(source)
        if (result) {
            this.statusCode = 201
            this.body = result
        }
        else {
            this.throw(404)
        }
    }
    *list() {
        const sources = yield db.Source.findAll()
        this.body = sources.map(
            d => d.get()
        )
    }
}
