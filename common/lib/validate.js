function error(message) {
    return {
        err: true,
        message: message
    }
}

function valid() {
    return {
        err: false,
        message: 'valid'
    }
}

module.exports = {
    fullname(name) {
        if (name == null || name.length < 1) {
            return error('please enter your Full Name')
        }

        return valid()
    },

    username(name) {
        if (/^[a-zA-Z][a-zA-Z0-9]{3,31}$/.test(name) == false) {
            return error('username must consist of alphabeths and numbers with 4-32 characters and begin with an alphabeth')
        }

        return valid()
    },

    password(password, confirmPassword) {
        if (/^[a-zA-Z0-9]{8,32}$/.test(password) == false) {
            return error('password must contain 8-32 combination of alphabeths and numbers')
        }

        if (password != confirmPassword) {
            return error('password does not match with confirm password')
        }

        return valid()
    }
}
