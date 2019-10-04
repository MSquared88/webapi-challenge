express = require('express')

server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send("<h1>It's Working!!<h1>")
})


module.exports = server