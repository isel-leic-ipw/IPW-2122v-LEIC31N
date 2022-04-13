import fs from  'fs/promises' 
import fetch from  'node-fetch'


const RANDOM_RECEIPES =  `
{
    "recipes": [
        {
            "id": 633372
        },
        {
            "id": 652284
        },
        {
            "id": 633132
        },
        {
            "id": 662694
        },
        {
            "id": 636300
        }
    ]
}
`


const SPOONACULAR_API_KEY = "431c5a799c0d43deb8dd2fd97e06971a"
const RECEIPES_COUNT = 30
const RANDOM_RECEIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${RECEIPES_COUNT}`



// Real version that uses Spoonacular API data
async function fetchJson(url) {
    const rsp = await fetch(url)
    return rsp.json()
}


// Fake/mock version that uses local data
// async function fetchJson(url) {
//     return JSON.parse(RANDOM_RECEIPES)
// }

const r = await fetchJson(RANDOM_RECEIPES_URL)
processReceipes(r)




async function processReceipes(r) {
    const ids = r.recipes.map(r => r.id)
    const fileContent = ids.reduce((prev, curr) => `${prev}\n${curr}`, "" ) 

    await fs.writeFile('receipe-ids.txt', fileContent)
    console.log('file created')
}