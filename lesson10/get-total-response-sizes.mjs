import  fetch  from 'node-fetch'

function twoPromiseNumbersToOnePromiseNumberWithSum(pn1, pn2) {
    return pn1.then(v1 => pn2.then(v2 => v1 + v2))
}

function my_fetch(url) {
    console.log(`Fetching ${url}`)
    return fetch(url)
}

// map: [T].map( (T) -> R ) -> [R]

function sumResponseSizes(...urls) {
    // [String].map( (String) -> Promise<Number> ) -> [Promise<Number>]
    return urls.map(url => my_fetch(url)               // Promise<Response> 
                    .then(rsp => rsp.text())    // Promise<String>
                    .then(text => text.length)  // Promise<Number>
            )   // [Promise<Number>]
            .reduce((prev, p) => twoPromiseNumbersToOnePromiseNumberWithSum(prev, p))   // Promise<Number>
}

function sumResponseSizesV2(...urls) {
    // [String].map( (String) -> Promise<Number> ) -> [Promise<Number>]
    let numbersPromises =  urls.map(url => my_fetch(url)               // Promise<Response> 
                    .then(rsp => rsp.text())    // Promise<String>
                    .then(text => text.length)  // Promise<Number>
            )   // [Promise<Number>]
    
    // Promise.all([Promise<T>]) -> Promise<[T]>
    return Promise.all(numbersPromises)    // Promise<[Number]>
           .then(numbers => numbers.reduce((prev, e) => prev+e))
}


async function sumResponseSizesV3(...urls) {
    let sum = 0
    for(let i = 0; i < urls.length; ++i) {
        const rsp = await my_fetch(urls[i]) 
        const text = await rsp.text()                                           
        const len = text.length    
        console.log(`${urls[i]} response size is ${len}`)                                       
        sum += len
    }
    return sum   
}

async function sumResponseSizesV4(...urls) {
    let numbersPromises =  urls.map(url => my_fetch(url)               // Promise<Response> 
                    .then(rsp => rsp.text())    // Promise<String>
                    .then(text => text.length) ) // Promise<Number>

    // let sum = 0;
    // for(let i = 0; i < numbersPromises.length; ++i) {
    //     const len = await numbersPromises[i]
    //     console.log(`${urls[i]} response size is ${len}`)                                       
    //     sum += len
    // }
    // return sum   
    return numbersPromises.reduce(async (prev, p) => await prev + await p)
}



sumResponseSizesV4(
    'https://eloquentjavascript.net/11_async.html',
    'https://eloquentjavascript.net/11_async.html',
    'https://eloquentjavascript.net/11_async.html',
    'https://eloquentjavascript.net/11_async.html'
).then(console.log)


async function f() {
    const rsp = await fetch('https://eloquentjavascript.net/11_async.html') 
    const text = await rsp.text()                                           
    const len = text.length                                           

    console.log(len)                                                  
}

//f()

// async function dummy() {
    
// }

// console.log(dummy())


console.log("Request initiated. Now I have nothing more to do")