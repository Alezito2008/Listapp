const jwt = require('jsonwebtoken')
const Lista = require('../models/Listas')
const Usuario = require('../models/Usuarios')

const obtenerListas = async (req, res) => {
    const { token } = req.cookies

    let id
    try {
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
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
        res.sendStatus(500);
    }
}

const crearLista = async (req, res) => {
    const { nombre, descripcion } = req.body
    const { token } = req.cookies

    let id
    try {
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        console.log(id)
        const lista = await Lista.create({
            nombre,
            descripcion
        })
        const usuario = await Usuario.findOne({ where: { id } })
        await usuario.addLista(lista)
        res.json(lista)
    } catch (error) {
        res.sendStatus(500);
    }
}

const actualizarLista = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body
    const { token } = req.cookies

    let info
    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
        
    }

    try {
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
        res.sendStatus(500);
    }
}

const eliminarLista = async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {

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
        res.sendStatus(500);
    }
}

module.exports = { obtenerListas, crearLista, actualizarLista, eliminarLista }
