// CommonJS module format

console.log("Utils module begin")

module.exports = {
    repeat: repeat,
    sayHello: hello
}

// Equivalent to above but using default module.exports object
// module.exports.repeat =  repeat
// module.exports.sayHello = hello


function repeat(amount, task) {
    if(amount < 0) {
        throw "Amount must be a positive number"
    }
    for(let i = 0; i < amount; ++i) {
        task(i+1)
    }    
} 

let count = 0

function hello() {
    console.log(`Hello ${count++}`)
}



console.log("Utils module end")