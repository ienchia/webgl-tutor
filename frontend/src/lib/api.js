function api() {
    return {
        url: `http://${process.env.API_URL}`,
        chapters,
        lessons,
        steps,
        sources
    }
}

function helper(name, next) {
    console.log(next)
    if (next) {
        return function (id) {
            var url = [this.url, name]
            id ? url.push(id) : url
            url = url.join('/')
            var returnValue = {
                url
            }
            returnValue[next.name] = next
            return returnValue
        }
    }
    else {
        return function (id) {
            var url = [this.url, name]
            id ? url.push(id) : url
            url = url.join('/')
            return {
                url
            }
        }
    }
}

export default {

}
