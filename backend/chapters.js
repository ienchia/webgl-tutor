const db = require('./sequelize')
const restUtil = require('./lib/rest-util.js')

function parse(request) {
    return {
        order: request.body.order,
        title: request.body.title || 'No Title',
        description: request.body.description,
    }
}

module.exports = {
    *create() {
        const chapter = parse(this.request)
        this.body = yield db.Chapter.create(chapter)
        this.statusCode = 200
    },
    *show(id) {
        const chapter = yield db.Chapter.findById(id)
        this.body = chapter.get()
    },
    *update(id) {
        const chapter = yield db.Chapter.findById(id)
        chapter.update(parse(this.request))
        this.body = chapter.get()
    },
    *list() {
        const chapters = yield db.Chapter.all()
        this.body = chapters.map(
            d => d.get()
        )
    },
    *listLessons(chapterId) {
        const chapter = yield db.Chapter.findById(chapterId)
        const lessons = yield chapter.getLessons()
        this.body = lessons.map(
            d => d.get()
        )
    },
    *options() {
        restUtil.createOptionsResponse.call(this, ['GET', 'OPTIONS', 'POST', 'PUT'])
    }
}
