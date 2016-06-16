module.exports = function(options) {
    return function* (next) {
        options.match
        && options.match.test(this.request.url)
        && this.session
        if (options.match.test(this.request.url)) {
            if (this.session) {

            }
            else {
                yield next
            }
        }
    }
}
