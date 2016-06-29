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
            return error('tolong masukan nama lengkap Anda.')
        }

        return valid()
    },

    username(name) {
        if (/^[a-zA-Z][a-zA-Z0-9]{3,31}$/.test(name) == false) {
            return error('tolong masukan 4-32 kombinasi angka dan huruf dan dimulai dengan huruf untuk username Anda.')
        }

        return valid()
    },

    password(password, confirmPassword) {
        if (/^[a-zA-Z0-9]{8,32}$/.test(password) == false) {
            return error('tolong masukan 8-32 kombinasi huruf dan angka untuk password Anda.')
        }

        if (password != confirmPassword) {
            return error('tolong pastikan password and ulangi password Anda sama persis.')
        }

        return valid()
    }
}
