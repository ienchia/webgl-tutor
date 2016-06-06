const db = require('./sequelize')

function findById(id) {
    return db.User.findById(id)
}

module.exports = {
    *create() {
        const name = this.request.body.name
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]

        const username = this.request.body.username
        const password = this.request.body.password
        yield db.User.create({ firstName, lastName, username, password })
        this.statusCode = 200
        this.body = "OK"
    },
    *delete(id) {
        const user = yield findById(id)
        this.body = user.destroy()
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
        this.statusCode = 200
        this.body = 'OK'
    }
}
