const fs = require('fs')
const ramda = require('ramda')
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

function resolveFile(fullpath, buffer) {
    const dirnames = fullpath.split('/').splice(0, fullpath.split('/').length - 1)
    const filename = fullpath.split('/').splice(-1)[0]

    dirpaths = ramda.scan(
        (a, b) => ramda.append(b, a),
        [],
        dirnames
    )

    dirpaths = ramda.map(
        d => d.join('/'),
        dirpaths
    ).filter(
        path => path.length != 0
    )

    const promises = ramda.map(
        path => {
            return () => {
                return (new Promise(
                    (res, rej) => {
                        access(
                            path,
                            fs.W_OK,
                            err => err ? rej(err) : res(path)
                        )
                    }
                )).catch(err => {
                    return new Promise(
                        (res, rej) => {
                            mkdir(
                                path,
                                err => err ? rej(err) : res(path)
                            )
                        }
                    )
                })
            }
        },
        dirpaths
    )

    var i = 0
    const filePromise = ramda.reduce(
        (a, b) => {
            return a.then(() => b())
        },
        Promise.resolve(),
        promises
    ).then(() => {
        return new Promise((res, rej) => {
            writeFile(
                fullpath,
                buffer,
                err => err ? rej(err) : res({ location: fullpath })
            )
        }).catch(err => console.log(err))
    })

    return filePromise
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
