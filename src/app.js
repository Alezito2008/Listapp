const express = require('express')
const listasRoutes = require('./routes/listas.routes')

const app = express()
app.use(express.json())

app.use(listasRoutes)

module.exports = app