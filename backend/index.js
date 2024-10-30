const app = require('./app')
const sequelize = require('./database/database')
const Amigos = require('./models/Amigos')
const Usuario = require('./models/Usuarios')

require('./models/Listas')
require('./models/Items')
require('./models/Usuarios')
require('./models/Amigos')
require('./models/Grupos')

require('./models/relations')

const PORT = 5000

async function main() {
    try {
        sequelize.sync({ force: false })
        console.log('Conectado a la base de datos')
        app.listen(PORT)
        console.log(`Escuchando en el puerto ${PORT}`)
    } catch (error) {
        console.log('Hubo un error ' + error)
    }
}

main()