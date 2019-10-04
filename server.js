//imports
express = require('express')
server = express()
helmet = require('helmet')

//routes imports
actionsRoute = require('./routes/actions/actions-router')
projectsRoute = require('./routes/projects/projects-router.js')

//middleware
server.use(helmet())
server.use(express.json())
server.use(logger)


//home endpoint
server.get('/', (req, res) => {
    res.send("<h1>It's Working!!<h1>")
})

//routes
server.use('/api/projects', projectsRoute)
server.use('/api/actions', actionsRoute)

function logger(req, res, next) {
    console.log(`${req.method} to ${req.url} [${new Date().toISOString()}]`)
    next()
  };


module.exports = server