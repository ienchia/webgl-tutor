const fs = require('fs')

const access = fs.access
const mkdir = fs.mkdir
const writeFile = fs.writeFile

const log = console.log


function checkDir(dirname, resolve, reject) {
    access(
        dirname,
        fs.W_OK,
        err => err ? (log(err), reject(false)) : resolve(dirname)
    )
}

function createDir(dirname, resolve, reject) {
    mkdir(
        dirname,
        err => err ? (log(err), reject(false)) : resolve(dirname)
    )
}

function createFile(path, buffer, resolve, reject) {
    writeFile(
        path,
        buffer,
        err => err ? (log(err), reject(false)) : resolve(path)
    )
}

function promisify(f, callback) {
    return function () {
        args = arguments
        return new Promise(
            function (resolve, reject) {
                console.log([...args])
                f.apply(this, [...args, resolve, reject])
            }
        )
    }
}


module.exports = {
    checkDir: promisify(checkDir),
    createDir: promisify(createDir),
    createFile: promisify(createFile)
}
