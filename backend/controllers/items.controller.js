const Item = require('../models/Items')
const Lista = require('../models/Listas')
const Usuario = require('../models/Usuarios')
const jwt = require('jsonwebtoken')

const medidas = ['un', 'g', 'kg', 'ml', 'l']

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
    const { nombre, cantidadNecesitada, medida, listaId } = req.body
    const { token } = req.cookies

    let id
    try {
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        if (medida.length >= 3) {
            return res.status(400).json({ message: 'La medida debe ser menor o igual a 3' })
        }

        if (!medidas.includes(medida)) {
            return res.status(400).json({ message: 'Medida inválida' })
        }

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
            cantidadNecesitada,
            medida,
            listaId
        })

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el item' })
    }
}

const actualizarItem = async (req, res) => {
    const { token } = req.cookies
    const { id } = req.params
    const { nombre, cantidadNecesitada, medida, marcado } = req.body

    let info

    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        if (medida && medida.length >= 3) {
            return res.status(400).json({ message: 'La medida debe ser menor o igual a 3' })
        }

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

        await Item.update({
            nombre,
            cantidadNecesitada,
            medida,
            marcado
        }, {
            where: { id }
        })

        res.status(200).json({ message: 'Item actualizado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el item' })
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
            return res.status(404).json({ message: 'Item no encontrado' })
        }

        const usuarioConItemEnLista = await Usuario.findOne({
            where: { id: info.id },
            include: {
                model: Lista,
                where: { id: item.listaId }
            }
        })

        if (!usuarioConItemEnLista) {
            return res.status(404).json({ message: 'Item no encontrado' })
        }

        await Item.destroy({
            where: { id }
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { obtenerItems, obtenerItem, crearItem, actualizarItem, eliminarItem }
