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
    },
    *createLesson(chapterId) {
        const chapter = yield db.Chapter.findById(chapterId)
        const lesson = yield db.Lesson.create({
            order: 0,
            title: 'No Title',
            description: null
        })
        yield chapter.addLesson(lesson)
        this.body = lesson.get()
    },
    *delete(id) {
        const chapter = yield db.Chapter.findById(id)
        yield chapter.destroy()
        this.status = 200
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
