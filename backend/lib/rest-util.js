module.exports = {
    createOptionsResponse(allowedMethods) {
        return function* () {
            const methodString = allowedMethods.join(',')
            this.append('Access-Control-Allow-Methods', methodString)
            this.append('Allow', methodString)
            this.status = 200
        }
    }
}
