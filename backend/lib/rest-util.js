module.exports = {
    createOptionsResponse(allowedMethods) {
        const allowedMethodsString = allowedMethods
            .reduce((a, b) => `${a},${b}`)
        this.append('Access-Control-Allow-Methods', allowedMethodsString)
        this.append('Allow', allowedMethodsString)
        this.statusCode = 200
        this.body = 'OK'
    }
}
