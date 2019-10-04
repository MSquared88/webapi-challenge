//imports
express = require('express')
server = express()

//routes imports
actionsRoute = require('./routes/actions/actions-router')
projectsRoute = require('./routes/projects/projects-router.js')

//middleware
server.use(express.json())


//home endpoint
server.get('/', (req, res) => {
    res.send("<h1>It's Working!!<h1>")
})

//routes
server.use('/api/projects', projectsRoute)
server.use('/api/projects/actions', actionsRoute)



module.exports = server