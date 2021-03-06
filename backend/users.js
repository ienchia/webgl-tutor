const db = require('./sequelize')
const pw = require('../common/lib/password')

function findById(id) {
    return db.User.findById(id)
}

module.exports = {
    *create() {
        const names = this.request.body.fullname.split(' ')
        const firstName = names.shift()
        const lastName = names.join(' ')

        const username = this.request.body.username
        const password = this.request.body.password
        const existingUser = yield db.User.findOne({
            where: {
                username: username
            }
        })
        if (existingUser) {
            this.status = 409
        }
        else {
            const user = yield db.User.create({ firstName, lastName, username, password: pw.hash(password) })
            this.body = user
        }
    },
    *delete(id) {
        const user = yield findById(id)
        yield user.destroy()
        this.status = 200
    },
    *list() {
        const users = yield db.User.all()
        this.body = users.map(
            d => d.get()
        )
    },
    *show(id) {
        const user = yield findById(id)
        this.body = user.get()
    },
    *options() {
        this.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE')
        this.append('Allow', 'GET,POST,OPTIONS,DELETE')
        this.body = 'OK'
    }
}
