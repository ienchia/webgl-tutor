const db = require('./sequelize')

function parseRequest(request) {
    return {
        description: request.body.description,
        order: request.body.order || 0,
        title: request.body.title || 'No Title'
    }
}

module.exports = {
    *createStep(id) {
        const lesson = yield db.Lesson.findById(id)
        const step = {
            title: 'No Title',
            order: 0
        }
        this.body = yield db.Step.create(step)
        yield lesson.addStep(this.body)
        this.statusCode = 200
    },
    *list() {
        const lessons = yield db.Lesson.findAll()
        this.body = lessons.map(
            d => d.get()
        )
    },
    *listSteps(id) {
        const lesson = yield db.Lesson.findById(id)
        const steps = yield lesson.getSteps()
        this.body = steps.map(
            d => d.get()
        )
    },
    *show(id) {
        const lesson = yield db.Lesson.findById(id)
        this.body = lesson.get()
    },
    *update(id) {
        const newLesson = parseRequest(this.request)
        const oldLesson = yield db.Lesson.findById(id)
        console.log(this.body)
        oldLesson.update(newLesson)
        this.body = oldLesson.get()
        this.statusCode = 200
    },
    *delete(id) {
        const lesson = yield db.Lesson.findById(id)
        lesson.destroy()
        this.statusCode = 200
    }
}
