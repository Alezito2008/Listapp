const { where } = require('sequelize')
const jwt = require('jsonwebtoken')
const Lista = require('../models/Listas')
const Usuario = require('../models/Usuarios')

const obtenerListas = async (req, res) => {
    try {
        const { token } = req.cookies
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const result = await Usuario.findOne({
            where: { id },
            include: Lista
        })
        const listas = result.Listas.map(lista => ({
            id: lista.id,
            nombre: lista.nombre,
            descripcion: lista.descripcion
        }));
        res.json(listas)
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        res.sendStatus(500);
    }
}

const crearLista = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body
        const { token } = req.cookies
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const lista = await Lista.create({
            nombre,
            descripcion
        })
        const usuario = await Usuario.findOne({ where: { id } })
        await usuario.addLista(lista)
        res.json(lista)
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        res.sendStatus(500);
    }
}

const actualizarLista = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body
        
        const { token } = req.cookies
        const info = jwt.verify(token, process.env.JWT_SECRET)

        const usuario = await Usuario.findOne({
            where: { id: info.id },
            include: [{
                model: Lista,
                where: { id },
                attributes: ['id']
            }]
        })

        if (!usuario || usuario.Listas.length === 0) {
            return res.sendStatus(404)
        }

        await Lista.update({
            nombre,
            descripcion
        }, {
            where: { id }
        })
        res.sendStatus(204)
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        res.sendStatus(500);
    }
}

const eliminarLista = async (req, res) => {
    try {
        const { id } = req.params
        const { token } = req.cookies
        const info = jwt.verify(token, process.env.JWT_SECRET)

        const usuario = await Usuario.findOne({
            where: { id: info.id },
            include: [{
                model: Lista,
                where: { id },
                attributes: ['id']
            }]
        })

        if (!usuario || usuario.Listas.length === 0) {
            return res.sendStatus(404)
        }

        await Lista.destroy({
            where: { id }
        })
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        res.sendStatus(500);
    }
}

module.exports = { obtenerListas, crearLista, actualizarLista, eliminarLista }
