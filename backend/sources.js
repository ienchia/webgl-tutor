const db = require('./sequelize')
const fileUtil = require('./lib/file-util')

module.exports = {
    *create(chapterId, lessonId, stepId) {
        const content = this.request.body.content
        const filename = this.request.body.name
        const type = getType(this.request.body.name)

        const step = yield db.Step.findById(stepId)
        const source = yield db.Source.create({
            name: filename,
            type: type,
            content: content,
            location: `chapters/${chapterId}/lessons/${lessonId}/steps/${stepId}`
        })
        yield step.addSource(source)
        this.body = source
    },
    *delete(id) {
        const source = yield db.Source.findById(id)
        this.body = source.destroy()
    },
    *list() {
        const sources = yield db.Source.findAll()
        this.body = sources.map(
            d => d.get()
        )
    },
    *update(sourceId) {
        const id = this.request.body.id
        const content = this.request.body.content
        const filename = this.request.body.name
        const location = this.request.body.location
        const type = getType(this.request.body.name)

        const target = yield db.Source.findById(sourceId)
        const source = yield target.update({
            id,
            name: filename,
            type,
            content,
            location: location
        })
        this.body = source
    }
}

function getType(filename) {
    if(/\.html$/.test(filename)) {
        return 'text/html'
    }
    if(/\.js$/.test(filename)) {
        return 'text/javascript'
    }
}
