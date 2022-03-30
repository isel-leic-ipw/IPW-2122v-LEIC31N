// CommonJS module format

console.log("Utils module begin")





export function repeat(amount, task) {
    if(amount < 0) {
        throw "Amount must be a positive number"
    }
    for(let i = 0; i < amount; ++i) {
        task(i+1)
    }    
} 

let count = 0

export function sayHello() {
    console.log(`Hello ${count++}`)
}



console.log("Utils module end")