const db = require('./sequelize')
const restUtil = require('./lib/rest-util.js')

function parseRequest(request) {
    return {
        order: request.body.order || 0,
        title: request.body.title || 'No Title',
        description: request.body.description,
    }
}

module.exports = {
    *create() {
        const chapter = parseRequest(this.request)
        this.body = yield db.Chapter.create(chapter)
        this.statusCode = 200
    },
    *createLesson(chapterId) {
        const chapter = yield db.Chapter.findById(chapterId)
        const lesson = {
            order: 0,
            title: 'No Title',
            description: null
        }
        this.body = yield db.Lesson.create(lesson)
        yield chapter.addLesson(this.body)
        this.statusCode = 200
    },
    *show(id) {
        const chapter = yield db.Chapter.findById(id)
        var result = chapter.get()
        result.lessons = yield chapter.getLessons()
        this.body = result
    },
    *update(id) {
        const chapter = yield db.Chapter.findById(id)
        chapter.update(parseRequest(this.request))
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
