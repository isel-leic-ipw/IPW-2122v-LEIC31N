import fetch from 'node-fetch'



export async function get(uri) {
    return fetchInternal(uri)
}

export async function del(uri) {
    return fetchInternal(uri, {
        method: "DELETE"
    })
}


export async function post(uri, body) {
    return fetchInternal(uri, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}


async function fetchInternal(uri, init) {
    init = init || {}
    //console.log(`Fetching from ${uri} with these options`, init)
    return fetch(uri, init)
    .then(response => response.json())
    .then(showResponse)


    function showResponse(body) {
        //console.log(`Received from ${uri}`)
        //console.log(body)

        return body
    }

}
