const db = require('./sequelize')

function *deleteAllCpd(lesson) {
    const cpdHeaders = yield lesson.getCpdHeaders()
    for (var i = 0; i < cpdHeaders.length; i++) {
        var header = cpdHeaders[i]
        var cpdDetails = yield header.getCpdDetails()
        for (var j = 0; j < cpdDetails.length; j++) {
            var detail = cpdDetails[j]
            yield detail.destroy()
        }
        console.log('destroy')
        yield header.destroy()
    }
}

module.exports = {
    *forceUpdate(lessonId) {
        const entries = this.request.body
        console.log(entries)
        const lesson = yield db.Lesson.findById(lessonId)
        yield deleteAllCpd(lesson)
        var cpdHeaders = []
        for (var i = 0; i < entries.length; i++) {
            var headerEntry = entries[i]
            var cpdHeader = yield db.CpdHeader.create({
                probability: headerEntry.probability
            })
            var cpdDetails = []
            for (var j = 0; j < headerEntry.rules.length; j++) {
                var detailEntry = headerEntry.rules[j]
                var cpdDetail = yield db.CpdDetail.create({ state: detailEntry.state })
                console.log(cpdDetail.get())
                var detailLesson = yield db.Lesson.findById(detailEntry.lesson.id)
                yield cpdDetail.setLesson(detailLesson)
                cpdDetails.push(cpdDetail)
            }
            yield cpdHeader.setCpdDetails(cpdDetails)
            cpdHeaders.push(cpdHeader)
        }
        yield lesson.setCpdHeaders(cpdHeaders)
        this.body = lesson
    },
    *list() {
        const cpdHeaders = yield db.CpdHeader.findAll()
        this.body = []
        for (var i = 0; i < cpdHeaders.length; i++) {
            var header = cpdHeaders[i]
            var cpdDetails = yield header.getCpdDetails()
            var lesson = yield db.Lesson.findById(header.get('LessonId'))

            this.body.push({
                lessonId: lesson.get('id'),
                rules: cpdDetails.map(detail => {
                    console.log(detail.get())
                    return {
                        lessonId: detail.get('LessonId'),
                        state: detail.get('state')
                    }
                }),
                probability: header.get('probability')
            })
        }
    }
}
