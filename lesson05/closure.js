

function f(a = 2) {
    let x = 33
    // Do some stuff
    
    function fInternal() {
        let y = 20
        //console.log("I'm in f1")
        console.log("x is " + x++)
        console.log("a is " + a--)
    }
    
    fInternal()


    return fInternal
}


let f2 = f();
f2()
f2()

let f3 = f(10);
f3()
f3()

f2()