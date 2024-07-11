const Lista = require('../models/Listas')

const obtenerListas = async (req, res) => {
    res.send('Hola')
}

const crearLista = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body

        const lista = Lista.create({
            nombre,
            descripcion
        })
    
        res.json(lista)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { obtenerListas, crearLista }
