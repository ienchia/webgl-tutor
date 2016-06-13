const fs = require('fs')
const resolvePath = require('path').resolve

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

function resolveFile(dirpath, filename, buffer) {
    const filesDir = 'files/'
    const dirnames = dirpath.split('/')
    var dirs = []
    for (var i = 0; i < dirnames.length; i++) {
        var paths = []
        for (var j = 0; j < i + 1; j++) {
            paths.push(dirnames[j])
        }
        dirs.push(resolvePath('public', filesDir, ...paths))
    }
    var resolvePromise = resolveDir(dirs[0])
    for (var i = 0; i < dirs.length - 1; i++) {
        resolvePromise = (function (path) {
            return resolvePromise.then(function () {
                return resolveDir(path)
            })
        })(dirs[i + 1])
    }
    const filepath = resolvePath(dirs[dirs.length - 1], filename)
    resolvePromise = resolvePromise.then(function () {
        return new Promise(function (resolve, reject) {
            console.log('create file ' + buffer)
            writeFile(filepath, buffer, function (err) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log('file created')
                resolve(true)
            })
        })
    })
    return resolvePromise.then(
        function onResolve(value) {
            return {
                location: filesDir + dirpath + '/' + filename
            }
        },
        function onReject(reason) {
            return false
        }
    )

    function resolveDir(path) {
        return new Promise(function (resolve, reject) {
            access(path, fs.W_OK, (err) => {
                if (err) {
                    reject(err)
                }
                console.log(path + ' exist')
                resolve()
            })
        })
        .catch((err) => {
            mkdir(path, (err) => {
                if (err) {
                    throw(err)
                }
                return
            })
        })
    }
}

function updateFile(filepath, buffer) {
    return new Promise(function (resolve, reject) {
        writeFile(resolvePath('public', filepath), buffer, function (err) {
            if (err) {
                reject(err)
            }
            resolve({
                location: filepath
            })
        })
    })
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
    createFile: promisify(createFile),
    resolveFile,
    updateFile
}
