function a() {
    console.log('a')
}

function b(p1) {
    console.log(`b (p1=${p1})`)
}

function c(p1, p2) {
    console.log(`b (p1=${p1}, p2=${p2})`)
}



a()
b(1)
c(2, 3)

function addOneArgument(f) {
    return function(firstArg, ...args) {
        console.log(firstArg)
        f.apply(null,args)
    }
}

const a1 = addOneArgument(a)
const b1 = addOneArgument(b)
const c1 = addOneArgument(c)

a1("SLB")
b1("SLB", 1)
c1("SLB", 2, 3)


