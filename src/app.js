const express = require('express')
const listasRoutes = require('./routes/listas.routes')
const itemsRoutes = require('./routes/items.routes')

const app = express()
app.use(express.json())

app.use(listasRoutes)
app.use(itemsRoutes)

module.exports = app