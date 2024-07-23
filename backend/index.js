const app = require('./app')
const http = require('./socket')
const sequelize = require('./database/database')

require('./models/Listas')
require('./models/Items')
require('./models/Usuarios')

const PORT = 5000

async function main() {
    try {
        sequelize.sync({ force: false })
        console.log('Conectado a la base de datos')
        http.listen(PORT)
        console.log(`Escuchando en el puerto ${PORT}`)
    } catch (error) {
        console.log('Hubo un error ' + error)
    }
}

main()