const Item = require('../models/Items')
const Lista = require('../models/Listas')
const Usuario = require('../models/Usuarios')
const jwt = require('jsonwebtoken')

 const obtenerItems = async (req, res) => {
    try {
        const items = await Item.findAll()
        res.json(items)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const obtenerItem = async (req, res) => {
    const { id } = req.params
    
    try {
        const item = await Item.findOne({
            where: {id}
        })
        res.json(item)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const crearItem = async (req, res) => {
    const { nombre, cantidadConseguida, cantidadNecesitada, listaId } = req.body
    const { token } = req.cookies

    let id
    try {
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const lista = await Usuario.findOne({
            where: { id },
            include: {
                model: Lista,
                where: { id: listaId }
            },
            attributes: []
        })

        if (!lista || !lista.Listas.length === 0) {
            return res.sendStatus(404)
        }

        const item = await Item.create({
            nombre,
            cantidadConseguida,
            cantidadNecesitada,
            listaId
        })
        res.json(item)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lista' })
    }
 }

 const actualizarItem = async (req, res) => {
    const { token } = req.cookies
    const { id } = req.params
    const { nombre, cantidadNecesitada, cantidadConseguida } = req.body

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const item = await Item.findOne({
            where: { id }
        })
        
        if (!item) {
            return res.sendStatus(404)
        }

        const usuarioConItemEnLista = await Usuario.findOne({
            where: { id: info.id },
            include: {
                model: Lista,
                where: { id: item.listaId }
            }
        })

        if (!usuarioConItemEnLista) {
            return res.sendStatus(404)
        }

        const itemActualizado = await Item.update({
            nombre,
            cantidadNecesitada,
            cantidadConseguida
        }, {
            where: { id }
        })
        res.json(itemActualizado)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const eliminarItem = async (req, res) => {
    const { token } = req.cookies
    const { id } = req.params

    let info;
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const item = await Item.findOne({
            where: { id }
        })
        
        if (!item) {
            return res.sendStatus(404)
        }

        const usuarioConItemEnLista = await Usuario.findOne({
            where: { id: info.id },
            include: {
                model: Lista,
                where: { id: item.listaId }
            }
        })

        if (!usuarioConItemEnLista) {
            return res.sendStatus(404)
        }

        await Item.destroy({
            where: { id }
        })
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 module.exports = { obtenerItems, obtenerItem, crearItem, actualizarItem, eliminarItem }
