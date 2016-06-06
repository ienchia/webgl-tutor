const db = require('./sequelize')

module.exports = {
    *create() {
        const account = yield db.Users
            .findOne({
                where: {
                    username: this.request.query.username,
                    password: this.request.query.password
                }
            })

        if (account) {
            this.session.username = account.get('username')
            this.status = 200
            this.message = 'OK'
        }
        else {
            this.throw(401)
        }
    },
    *delete() {
        this.session.username = undefined
        this.status = 200
        this.message = 'OK'
    }
}
