import fs from  'fs/promises' 
import fetch from  'node-fetch'


const buf = await fs.readFile('recipes2.json')
const dec = new TextDecoder()
const str = dec.decode(buf)
const RANDOM_RECEIPES = JSON.parse(str)



const SPOONACULAR_API_KEY = "431c5a799c0d43deb8dd2fd97e06971a"
const RECEIPES_COUNT = 30
const RANDOM_RECEIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${RECEIPES_COUNT}`





// Real version that uses Spoonacular API data
// function fetchJson(url) {
//     return fetch(url)
//         .then(rsp => rsp.json())
// }

// async function fetchJson(url) {
//     let r = await fetch(url)
//     console.log(r.headers)
//     const txt = await r.text()
//     return JSON.parse(txt)

// }


// Fake/mock version that uses local data
function fetchJson(url) {
    return Promise.resolve(RANDOM_RECEIPES)
}

fetchJson(RANDOM_RECEIPES_URL)
    //.then(text => console.log(text))
    .then(processReceipes)
    //.then(ids => createIdsFile(ids))
    

function processReceipes(r) {
    const ids = r.recipes.map(r => r.id)
    const fileContent = ids.reduce((prev, curr) => `${prev}\n${curr}`, "" ) 
    fs.writeFile('receipe-ids.txt', fileContent)
//        .then(_ => console.log('file created'))
    console.log('file created')
}