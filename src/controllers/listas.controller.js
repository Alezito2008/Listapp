const { where } = require('sequelize')
const Lista = require('../models/Listas')

const obtenerListas = async (req, res) => {
    try {
        const listas = await Lista.findAll()
        res.json(listas)
    } catch (error) {
        res.sendStatus(500)
    }
}

const obtenerLista = async (req, res) => {
    try {
        const { id } = req.params
        const lista = await Lista.findOne({
            where: { id }
        })
        res.json(lista)
    } catch (error) {
        res.sendStatus(500)
    }
}

const crearLista = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body

        const lista = await Lista.create({
            nombre,
            descripcion
        })
    
        res.json(lista)
    } catch (error) {
        res.sendStatus(500)
    }
}

const actualizarLista = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body

        const lista = await Lista.update({
            nombre,
            descripcion
        }, {
            where: { id }
        })
        res.json(lista)
    } catch (error) {
        res.sendStatus(500)
    }
}

const eliminarLista = async (req, res) => {
    try {
        const { id } = req.params
        await Lista.destroy({
            where: { id }
        })
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { obtenerListas, crearLista, obtenerLista, actualizarLista, eliminarLista }
