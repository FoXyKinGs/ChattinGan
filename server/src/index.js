require('dotenv').config()
const express = require("express")
const cors = require('cors')
const http = require('http')
const bodyParses = require('body-parser')
const socket = require('./socket')
const router = require('./routes')

const app = express()
app.use(cors())
app.use(bodyParses.json())

app.use(router)

const server = http.createServer(app)
socket(server)

server.listen(process.env.SERVER_PORT, () => {
    console.log('server running on port ' + process.env.SERVER_PORT)
})