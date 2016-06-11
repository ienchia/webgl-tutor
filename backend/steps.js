const db = require('./sequelize')

module.exports = {
    *update(id) {
        const steps = yield db.Step.findById(id)
        yield steps.update(this.request.body)
        this.body = steps
    }
}
