const cors = require('kcors')
const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')
const parse = require('koa-bodyparser')
const path = require('path')
const route = require('koa-route')
const session = require('koa-session')
const static = require('koa-static')

const auth = require('./middleware/authentication')
const restUtil = require('./lib/rest-util')
const fileUtil = require('./lib/file-util.js')

const admin = require('./middleware/authentication.js').admin
const chapters = require('./chapters.js')
const cpds = require('./cpds.js')
const db = require('./sequelize')
const login = require('./login')
const lessonHistories = require('./lesson-histories')
const lessons = require('./lessons')
const sources = require('./sources')
const steps = require('./steps')
const users = require('./users')


app = koa()
app.keys = [ 'im secret, hush' ]

if (process.env.NODE_ENV == 'development') {
    console.log('using cors for development')
    app.use(function* (next) {
        yield next
        this.append('Access-Control-Allow-Credentials', true)
    })
    app.use(cors())
}

app.use(session({maxAge: 6 * 60 * 60 * 1000}, app))
app.use(parse())

app.use(route.get(
    '/session',
    function* () {
        if (this.session.id) {
            this.session.n = (this.session.n || 0) + 1
            this.body = this.session
        }
        else {
            this.throw(401)
        }
    }
))

app.use(route.get(
    '/session/:id',
    function* (id) {
        this.session.id = id
        this.body = this.session
    }
))

app.use(route.get(
    '/logout',
    function* () {
        this.session = null
        this.status = 200
    }
))

/**
*  Chapters
**/
app.use(route.get(
    '/chapters',
    chapters.list
))
app.use(route.options(
    '/chapters',
    restUtil
    .createOptionsResponse(['GET'])
))
app.use(route.get(
    '/chapters/:id',
    chapters.show
))
app.use(route.post(
    '/chapters',
    admin(chapters.create)
))
app.use(route.put(
    '/chapters/:id',
    admin(chapters.update)
))
app.use(route.options(
    '/chapters/:id',
    restUtil
    .createOptionsResponse(['GET', 'POST', 'PUT'])
))
app.use(route.get(
    '/chapters/:id/lessons',
    chapters.listLessons
))
app.use(route.post(
    '/chapters/:id/lessons',
    admin(chapters.createLesson)
))
app.use(route.options(
    '/chapters/:id/lessons',
    restUtil
    .createOptionsResponse(['GET', 'POST'])
))
app.use(route.post(
    '/chapters/:chapterId/lessons/:lessonId/steps/:stepId/sources',
    admin(sources.create)
))
app.use(route.options(
    '/chapters/:chapterId/lessons/:lessonId/steps/:stepId/sources',
    restUtil
    .createOptionsResponse(['GET', 'POST'])
))
/**
* CPDs
*/
app.use(route.get(
    '/cpds',
    cpds.list
))
/**
*  Lessons
**/
//app.use(auth())
app.use(route.get(
    '/lessons',
    lessons.list
))
app.use(route.options(
    '/lessons',
    restUtil
    .createOptionsResponse(['GET'])

))
app.use(route.delete(
    '/lessons/:id',
    admin(lessons.delete)
))
app.use(route.get(
    '/lessons/:id',
    lessons.show
))
app.use(route.put(
    '/lessons/:id',
    admin(lessons.update)
))
app.use(route.options(
    '/lessons/:id',
    restUtil
    .createOptionsResponse(['GET', 'PUT', 'DELETE'])

))
app.use(route.get(
    '/lessons/:id/steps',
    lessons.listSteps
))
app.use(route.post(
    '/lessons/:id/steps',
    admin(lessons.createStep)
))
app.use(route.options(
    '/lessons/:id/steps',
    restUtil
    .createOptionsResponse(['GET', 'POST'])

))
app.use(route.put(
    '/lessons/:lessonId/cpds',
    admin(cpds.forceUpdate)
))
app.use(route.options(
    '/lessons/:id/cpds',
    restUtil
    .createOptionsResponse(['PUT'])
))
/**
*  Logins
**/
app.use(route.get(
    '/login',
    login.get
))
app.use(route.post(
    '/login',
    login.create
))
app.use(route.delete(
    '/login',
    login.delete
))
app.use(route.options(
    '/login',
    restUtil
    .createOptionsResponse(['GET', 'POST', 'DELETE'])
))
/**
*  Users
**/
app.use(route.post(
    '/users',
    users.create
))
app.use(route.options(
    '/users',
    restUtil
    .createOptionsResponse(['POST'])
))
app.use(route.get(
    '/users/:id',
    users.show
))
app.use(route.delete(
    '/users/:id',
    admin(users.delete)
))
app.use(route.options(
    '/users/:id',
    restUtil
    .createOptionsResponse(['GET', 'DELETE'])
))
app.use(route.get(
    '/users/:id/lesson-histories',
    lessonHistories.list
))
app.use(route.post(
    '/users/:id/lesson-histories',
    lessonHistories.create
))
app.use(route.options(
    '/users/:id/lesson-histories',
    restUtil
    .createOptionsResponse(['GET', 'POST'])
))
app.use(route.get(
    '/users/:id/sandbox',
    function* (id) {
        this.response.redirect(`/files/users/${id}/sandbox/index.html`)
    }
))
app.use(route.post(
    '/users/:id/sandbox',
    function* (id) {
        const file = yield fileUtil
        .resolveFile(
            `public/files/users/${id}/sandbox/${this.request.body.filename}`,
            this.request.body.content
        )
        this.body = file
    }
))
app.use(route.options(
    '/users/:id/sandbox',
    restUtil
    .createOptionsResponse(['GET', 'POST'])
))
/**
* Sources
*/
app.use(route.get(
    '/sources',
    sources.list
))
app.use(route.options(
    '/sources',
    restUtil
    .createOptionsResponse(['GET'])

))
app.use(route.put(
    '/sources/:id',
    admin(sources.update)
))
app.use(route.delete(
    '/sources/:id',
    admin(sources.delete)
))
app.use(route.options(
    '/sources/:id',
    restUtil
    .createOptionsResponse(['PUT', 'DELETE'])
))
/**
* Steps
*/
app.use(route.put(
    '/steps/:id',
    admin(steps.update)
))
app.use(route.options(
    '/steps/:id',
    restUtil
    .createOptionsResponse(['PUT'])
))
app.use(route.get(
    '/steps/:id/sources',
    steps.listSources
))
app.use(route.post(
    '/steps/:id/sources',
    admin(steps.createSource)
))
app.use(route.options(
    '/steps/:id/sources',
    restUtil
    .createOptionsResponse(['GET', 'POST'])
))

/**
* File systems
*/
app.use(mount('/files', static('public/files')))
/**
* Front end static files
**/
app.use(mount('/', static('public')))
/**
* Error handling
*/
app.use(function* () {
    this.throw(404)
})


app.listen(process.env.PORT || 3000)
