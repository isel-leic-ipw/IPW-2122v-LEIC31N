function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 


let a = [1,2,3,4,10]


function reduce(a, accumulator, initialValue = a[0], finisher = (v) => v) {
    let reduction = initialValue
    
    repeat(a.length, count => reduction = accumulator(reduction, a[count], count, a))
    
    return finisher(reduction)
}

Array.prototype.reduceGt = function(accumulator, initialValue, finisher) {
    return reduce(this, accumulator, initialValue, finisher)
}


const max = reduce(a, (prev, curr) => prev > curr ? prev : curr)
const max1 = a.reduce((prev, curr) => prev > curr ? prev : curr)
const sum = reduce(a, (prev, curr) => prev + curr)
const count = reduce(a, (prev, curr) => prev+1, 0)

const string = reduce(a, (prev, curr) => prev  + curr + ", ", "")
console.log(string)

function newAverage(prev, curr) {
    let newAvjObj = {
        sum: prev.sum + curr, 
        count: prev.count+1
    } 
    newAvjObj.average = newAvjObj.sum / newAverage.count
    return newAverage
}

const avg = reduce(a, newAverage, {sum: 0, count: 0, average: 0})

console.log(avg.average)

const avgGt = reduce(a, (prev, curr) => prev  + curr, 0, sum => sum / a.length)

a.reduceGt((prev, curr) => prev  + curr, 0, sum => sum / a.length)

let strs = ["Sport", "Lisboa", "e", "Benfica"]

let sumLen = reduce(strs, (acc, e) => acc + e.length, 0)
let concatenateStr = reduce(strs, (acc, e) => acc + e, "")
let concatenateFirstChar = reduce(strs, (acc, e) => acc + s[0], "")
let arrayFirstChar = reduce(strs, (acc, e) => { acc.push(e[0]); return acc; }, [])

