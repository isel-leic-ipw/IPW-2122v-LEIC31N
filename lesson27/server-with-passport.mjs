'use strict'

import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import expressSession from 'express-session'
import fileStore from 'session-file-store'

const app = express()

const FileStore = fileStore(expressSession)
app.use(expressSession(
  {
    secret: "Benfica campeão 2022/2023 ?",
    resave: false,
    saveUninitialized: false,
    store: new FileStore()
  }
  ))

app.use(morgan('dev'))
app.use(express.json())

// Passport initialization
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

//app.use(recordRequests)
app.use('/auth', verifyAuthenticated)

app.get('/home', homeNotAuthenticated)
app.get('/auth/home', homeAuthenticated)

app.post('/login', validateLogin)
app.post('/logout', logout)


const PORT = 1904
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`))

function homeNotAuthenticated(req, rsp) {
  let user = req.user ? req.user.username : "unknown"
  rsp.end(`Everybody can reach  this endpoint. Hello ${user}`) 
}

function homeAuthenticated(req, rsp) {
  console.log("homeAuthenticated - ", req.user)
  rsp.end(`You can only reach here if you are authenticated. Hello ${req.user.username}`)
}

function serializeUser(user, done) {
  console.log("serializeUserCalled")
  console.log(user)
  done(null, user.username)
  //done(null, user)
}

function deserializeUser(user, done) {
  console.log("deserializeUserCalled")
  console.log(user)
  done(null, user)
  // done(null, {
  //   username: user,
  //   dummy: "dummy property on user"
  // })
}


function validateLogin(req, rsp) {
  console.log("validateLogin")
  if(validateUser(req.body.username, req.body.password)) {
    req.login({
      username: req.body.username,
      dummy: "dummy property on user"
    }, (err) => rsp.redirect('/auth/home'))
  }



  function validateUser(username, password) { return true }
}


function verifyAuthenticated(req, rsp, next) {
  console.log("verifyAuthenticated")
  if(req.user) {
    return next()
  }
  rsp.status(401).send("not authorized")
}
function logout(req, rsp) {
  req.logout((err) => { 
    rsp.redirect('/home')
    req.session.destroy()
  })
  
}


function recordRequests(req, rsp, next) {
  const accesses = req.session.accesses || []
  accesses.push({method: req.method, path: req.path})
  req.session.accesses = accesses
  console.log(req.session.accesses)

  next()
}

