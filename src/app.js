const express = require('express')
const cookieParser = require('cookie-parser')
const listasRoutes = require('./routes/listas.routes')
const itemsRoutes = require('./routes/items.routes')
const usuariosRoutes = require('./routes/usuarios.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(listasRoutes)
app.use(itemsRoutes)
app.use(usuariosRoutes)

module.exports = app