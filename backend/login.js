const db = require('./sequelize')

module.exports = {
    *create() {
        const account = yield db.User
            .findOne({
                where: {
                    username: this.request.body.username,
                    password: this.request.body.password
                }
            })

        if (account) {
            this.session = {
                userId: account.get('id'),
                username: account.get('username')
            }
            this.body = this.session
        }
        else {
            this.throw(401)
        }
    },
    *delete() {
        this.session.username = undefined
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
