const db = require('./sequelize')

module.exports = {
    *createSource(id) {
        const step = yield db.Step.findById(id)
        const source = yield db.Source.create({
            name: this.request.body.name,
            type: 'text/html',
            content: ''
        })
        yield step.addSource(source)
        this.body = source
    },
    *listSources(id) {
        const step = yield db.Step.findById(id)
        const sources = yield step.getSources()
        this.body = sources.map(
            d => d.get()
        )
    },
    *update(id) {
        const steps = yield db.Step.findById(id)
        yield steps.update(this.request.body)
        this.body = steps
    }
}
