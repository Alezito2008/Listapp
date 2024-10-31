const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const listasRoutes = require('./routes/listas.routes')
const itemsRoutes = require('./routes/items.routes')
const usuariosRoutes = require('./routes/usuarios.routes')
const iaRoutes = require('./routes/ia.routes')
const amigosRoutes = require('./routes/amigos.routes')
const gruposRoutes = require('./routes/grupos.routes')

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use(listasRoutes)
app.use(itemsRoutes)
app.use(usuariosRoutes)
app.use(iaRoutes)
app.use(amigosRoutes)
app.use(gruposRoutes)

module.exports = app