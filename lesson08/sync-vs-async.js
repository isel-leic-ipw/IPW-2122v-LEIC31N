function longOperation(a) {
    for(i = 0; i < a; ++i);
    return a
}


function longOperationAsyncWithCallback(a, cb) {
    // Asynchronous function with synchronous implementation
    // for(i = 0; i < a; ++i);
    // cb(a)
    
    // Asynchronous function with asynchronous implementation
    setTimeout(() => cb(a), 3000)
}

function longOperationAsyncWithPromise(a) {
    console.log("longOperationAsyncWithPromise")
}


function processResult0(result) {
    console.log("processResult0")
    return result*result
}

function processResult1(result) {
    console.log("processResult1")
    console.log(result)
}


const VAL = 2000000000
// Sync model
let res = longOperation(VAL)
processResult1(res)


// // Async model with callback
// //longOperationA(10, res => processResult(res))
longOperationAsyncWithCallback(VAL, processResult1)


// Async model with Promise
let p = longOperationAsyncWithPromise(VAL)
   // Promise<Number>
p.then(res => processResult(res))
 .catch(err => console.log(err))
// longOperationAsyncWithPromise(10)
//     .then(processResult0)                             // Promise<Number>
//     .then(res => longOperationAsyncWithPromise(res))  // Promise<Promise<Number>>  => Promise<Number>
//     .then(processResult1)                             // Promise<undefined> 
// console.log("Nothing more to start doing")

console.log("END")
