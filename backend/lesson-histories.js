const db = require('./sequelize')

module.exports = {
    *create(userId) {
        const user = yield db.User.findById(userId)
        const lesson = yield db.Lesson.findById(this.request.body.lessonId)
        const lessonHistory = yield db.LessonHistory.create({})

        yield lessonHistory.setLesson(lesson)
        yield user.addLessonHistories(lessonHistory)

        this.body = lessonHistory
    },
    *list(userId) {
        const user = yield db.User.findById(userId)
        const lessonHistories = yield user.getLessonHistories()
        var knownLessons = []
        for (var i = 0; i < lessonHistories.length; i++) {
            const lesson = yield lessonHistories[i].getLesson()
            knownLessons.push(lesson)
        }
        this.body = knownLessons.map(
            lesson => lesson.get()
        )
    }
}
