const db = require('./sequelize')
const pw = require('../common/lib/password')

module.exports = {
    *create() {
        const account = yield db.User
            .findOne({
                where: {
                    username: this.request.body.username,
                    password: pw.hash(this.request.body.password)
                }
            })

        if (account) {
            const user = {
                userId: account.get('id'),
                username: account.get('username')
            }
            this.session = user
            this.status = 200
            this.body = this.session
        }
        else {
            this.status = 404
        }
    },
    *delete() {
        this.session = null
        this.status = 200
    },
    *get() {
        console.log(this.session)
        if (this.session.username) {
            this.body = this.session
        }
        else {
            this.throw(404)
        }
    }
}
