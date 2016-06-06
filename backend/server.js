const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')
const parse = require('koa-bodyparser')
const path = require('path')
const route = require('koa-route')
const session = require('koa-session')
const static = require('koa-static')

const auth = require('./middleware/authentication')
const fileUtil = require('./lib/file-util.js')

const chapters = require('./chapters.js')
const db = require('./sequelize')
const login = require('./login')
const lessons = require('./lessons')
const users = require('./users')

app = koa()
app.keys = [ 'im secret, hush' ]


app.use(session(app))
app.use(parse())
app.use(function* (next) {
    this.append('Access-Control-Allow-Origin', '*')
    this.append('Access-Control-Allow-Headers', 'Content-Type')
    yield next
})


/**
 *  Chapters
 **/
app.use(route.get(
    '/chapters',
    chapters.list
))
app.use(route.get(
    '/chapters/:id',
    chapters.show
))
app.use(route.options(
    '/chapters',
    chapters.options
))
app.use(route.options(
    '/chapters/:id',
    chapters.options
))
app.use(route.post(
    '/chapters',
    chapters.create
))
app.use(route.put(
    '/chapters/:id',
    chapters.update
))
app.use(route.get(
    '/chapters/:id/lessons',
    chapters.listLessons
))
/**
 *  Lessons
 **/
//app.use(auth())
app.use(route.get(
    '/lessons',
    lessons.list
))
/**
 *  Logins
 **/
app.use(route.get(
    '/login/create',
    login.create
))
app.use(route.get(
    '/login/delete',
    login.delete
))
/**
 *  Users
 **/
app.use(route.options(
    '/users',
    users.options
))
app.use(route.options(
    '/users/:id',
    users.options
))
app.use(route.delete(
    '/users/:id',
    users.delete
))
app.use(route.get(
    '/users',
    users.list
))
app.use(route.get(
    '/users/:id',
    users.show
))
app.use(route.post(
    '/users',
    users.create
))
/**
 * File systems
 */
app.use(route.get(
    '/apple/:dirname/:filename/:content',
    function* (dirname, filename, content) {
        const dirPath = path.resolve('sources', dirname)
        const isPathExist = yield fileUtil
            .checkDir(dirPath)
            .catch(function (reason) {
                return false
            })
        if (!isPathExist) {
            yield fileUtil.createDir(dirPath)
        }
        const isCreated = yield fileUtil.createFile(
            path.resolve(dirPath, filename || 'filename.js'),
            content
        )
        this.body = isCreated ? 'ok' : 'not found'
    }
))
app.use(mount('/sources', static('sources')))
/**
 * Error handling
 */
app.use(function* () {
    this.throw(404)
})


app.listen(process.env.PORT || 3000)
