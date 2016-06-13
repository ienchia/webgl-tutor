const db = require('./sequelize')
const fileUtil = require('./lib/file-util')

module.exports = {
    *create(chapterId, lessonId, stepId) {
        const content = this.request.body.content
        const filename = this.request.body.name
        const type = getType(this.request.body.name)

        const file = yield fileUtil.resolveFile(
            `chapters/${chapterId}/lessons/${lessonId}/steps/${stepId}`,
            filename,
            content
        )
        if (file) {
            const step = yield db.Step.findById(stepId)
            const source = yield db.Source.create({
                name: filename,
                type: type,
                content: content,
                location: file.location
            })
            yield step.addSource(source)
            this.body = source
        }
        else {
            this.throw(404)
        }
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

        const file = yield fileUtil.updateFile(
            location,
            content
        )
        if (file) {
            const target = yield db.Source.findById(sourceId)
            const source = yield target.update({
                id,
                name: filename,
                type,
                content,
                location: file.location
            })
            this.body = source
        }
        else {
            this.throw(404)
        }
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
