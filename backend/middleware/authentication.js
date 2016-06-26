module.exports = {
    admin(next) {
        return function* () {
            if (this.session.username == 'admin') {
                yield next.bind(this, ...arguments)
            }
            else {
                this.throw(401)
            }
        }
    }
}
