const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

// Configuración de Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {

    socket.on('sala', (sala) => {
        socket.join('sala-' + sala);
    });

    socket.on('eliminar-item', async (info) => {
        const response = await fetch('http://localhost:5000/api/items/' + info.id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${info.token};`
            }
        })
        const data = await response.text()
        console.log(data)
        if (response.status === 200) io.to('sala-'+info.listaId).emit('eliminar-item', info.id)
    })

    socket.on('agregar-item', async (info) => {
        const response = await fetch('http://localhost:5000/api/items/', {
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
        const response = await fetch('http://localhost:5000/api/items/' + info.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${info.token};`
            },
            body: JSON.stringify({
                cantidadConseguida: info.cantidadConseguida
            }),
        })
        if (response.status === 200) io.to('sala-'+info.listaId).emit('actualizar-item', {id: info.id, cantidadConseguida: info.cantidadConseguida})
    })
});

// Manejador de rutas de Next.js
app.all('*', (req, res) => {
    return handle(req, res);
});

nextApp.prepare().then(() => {
    server.listen(3000, () => {
        console.log('Corriendo server en el puerto 3000');
    });
});