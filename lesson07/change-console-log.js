console.log("SLB", 123, {a: 23})

const oldLog = console.log
console.log = function(...args) {
    const now = new Date()
    oldLog(`${now.toLocaleDateString()}-${now.toLocaleTimeString()}` )
    oldLog.apply(null, args)
}

console.log("SLB", 123, {a: 23})


