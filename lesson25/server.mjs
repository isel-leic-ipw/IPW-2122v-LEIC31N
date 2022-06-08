// File responsibilities
// 1 - Include the API modules that configure the server, and provide them its dependencies
// 2 - Launch the server and wait for requests
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import cookieParser from 'cookie-parser';


// Import gamesApi and all its direct and indirect dependencies
import gamesDataInit from './data/games-data_mem.mjs'
//import gamesDataInit from './data/games-data_elastic.mjs'

const gamesData = gamesDataInit()



import usersDataInit from './data/users-data_mem.mjs'
const usersData = usersDataInit()


import servicesInit from './services/games-services.mjs'
const services = servicesInit(gamesData, usersData)

// games-api returns router
import gamesApiInit from './api/games-api.mjs'
const gamesApi = gamesApiInit(services)


import gamesWebSiteInit from './api/games-web-site.mjs'
const gamesWebSite = gamesWebSiteInit(services)


// Create and initialize the Express application
const app = express()
const PORT = 1904

app.use(cors())
app.use(express.json()) // Register middleware to handle request bodies with json format
app.use(express.urlencoded()) // Register middleware to handle request bodies with json format
app.use(cookieParser()) // Register middleware to handle request bodies with json format

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use('/api', gamesApi)
app.use('/', gamesWebSite)

// Listen for API request
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

