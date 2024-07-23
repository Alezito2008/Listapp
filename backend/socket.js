const app = require('./app')
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    socket.on('sala', (sala) => {
        socket.join('sala-'+sala)
    })

    socket.on('eliminar-item', async (info) => {
        const response = await fetch('http://localhost:5000/items/' + info.id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${info.token};`
            }
        })
        if (response.status === 200) io.to('sala-'+info.listaId).emit('eliminar-item', info.id)
    })

    socket.on('agregar-item', async (info) => {
        const response = await fetch('http://localhost:5000/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${info.token};`
            },
            body: JSON.stringify({
                nombre: info.nombre,
                cantidadConseguida: 0,
                cantidadNecesitada: info.cantidadNecesitada,
                listaId: info.listaId
            }),
        })
        const data = await response.json()
        if (response.status === 200) io.to('sala-'+info.listaId).emit('agregar-item', data)
    })

    socket.on('actualizar-item', async (info) => {
        const response = await fetch('http://localhost:5000/items/' + info.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${info.token};`
            },
            body: JSON.stringify({
                cantidadConseguida: info.cantidadConseguida
            }),
        })
        const data = await response.json()
        if (response.status === 200) io.to('sala-'+info.listaId).emit('actualizar-item', {id: info.id, cantidadConseguida: info.cantidadConseguida})
    })
})

module.exports = http
