// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'
import passport from 'passport'
import expressSession from 'express-session'


export default function(services) {
    const app = express.Router()

    app.use(expressSession(
        {
          secret: "Benfica campeão 2022/2023 ?",
          resave: false,
          saveUninitialized: false
        }
        ))

    // Passport initialization
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))    

    app.use('/games', verifyAuthenticated)
    app.get('/login', loginForm)                    // Get the login form
    app.post('/login', login)                       // Verify login credentials
    app.post('/logout',logout)                      // Get a form to create a game
    
    return app

    function verifyAuthenticated(req, rsp, next) {
        if(req.user)
            return next()
        rsp.redirect('/login')
    } 


    function loginForm(req, rsp) {
        rsp.render('login')
    }

    async function login(req, rsp) {
        let token = await services.validateCredentials(req.body.username, req.body.password)
        if(token) {
            return req.login(token, (err) => rsp.redirect('/games'))
        } 
        rsp.render('login', {username: req.body.username, message: "Invalid credentials"})
    }

    function logout(req, rsp) {
        req.logout((err) => rsp.redirect('/'))
        
    }


}