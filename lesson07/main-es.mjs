import * as utils from './utils-es.mjs'
console.log("after 1st require")



utils.sayHello()
utils.sayHello()


console.log("$$$$$$$$$$$$$$$$$$$$$$$$")


import * as utils1 from './utils-es.mjs'
console.log("after 2nd require")
utils1.sayHello()