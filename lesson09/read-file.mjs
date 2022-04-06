import { readFile } from 'fs/promises'

function processFileContents(fileContents) {
    console.log("Processing file contents")
    console.log(String(fileContents))
}


readFile('./ids.txt')
    .then(processFileContents)

console.log("SLB")
