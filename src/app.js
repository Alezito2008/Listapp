const express = require('express')
const listasRoutes = require('./routes/listas.routes')
const itemsRoutes = require('./routes/items.routes')
const usuariosRoutes = require('./routes/usuarios.routes')

const app = express()
app.use(express.json())

app.use(listasRoutes)
app.use(itemsRoutes)
app.use(usuariosRoutes)

module.exports = app