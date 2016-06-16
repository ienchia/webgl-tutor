module.exports = {
    createOptionsResponse(allowedMethods) {
        return function* () {
            const methodString = allowedMethods.join(',')
            this.append('Access-Control-Allow-Methods', methodString)
            this.append('Allow', methodString)
            this.statusCode = 200
            this.body = 'OK'
        }
    }
}
