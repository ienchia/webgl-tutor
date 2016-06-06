module.exports = function(after) {
    return function* (next) {
        if (this.session.username) {
            yield after
        }
        else {
            yield next
            this.throw(401)
        }
    }
}
