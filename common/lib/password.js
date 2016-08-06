const crypto = require('crypto')
const salt = 'imsecret'


module.exports = {
    hash(pass) {
        const hash = crypto.createHash('sha256').update(salt + pass)
        return hash.digest('hex')
    },
    check(hashOrigin, pass) {
     return hashOrigin == pass
    }
}
