

// console.log("------------ Bindings and scopes ------------ ")


let global = "GLOBAL"

function f2(a) {
    let b = 123
    if(a > 5) {
        let c = 1
        {
            let a = 2
            let d = 3
            console.log(a)
            console.log(d)
        }
    }
    //console.log(c)
}

f2()

{
    let a = 123
}

// Arrow function

//let m = (a, b) => a > b ? a : b

