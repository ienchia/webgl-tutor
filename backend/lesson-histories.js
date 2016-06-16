const db = require('./sequelize')

module.exports = {
    *create(userId) {
        const user = yield db.User.findById(userId)
        const lesson = yield db.Lesson.findById(this.request.body.lessonId)
        const lessonHistory = yield db.LessonHistory.create({})

        yield lessonHistory.setLesson(lesson)
        yield user.addLessonHistories(lessonHistory)

        this.body = lessonHistory
        this.statusCode = 200
        this.message = "OK"
    },
    *list(userId) {
        const user = yield db.User.findById(userId)
        const lessonHistories = yield user.getLessonHistories()

        this.body = lessonHistories.map(
            lessonHistory => lessonHistory.get()
        )
    }
}