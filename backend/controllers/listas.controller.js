const jwt = require('jsonwebtoken')
const Lista = require('../models/Listas')
const Usuario = require('../models/Usuarios')
const Item = require('../models/Items')

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
  
        if (!result) {
            return res.status(404).json({ message: 'No tenés listas' });
        }

        const listas = result.Listas.map(lista => ({
            id: lista.id,
            nombre: lista.nombre,
            descripcion: lista.descripcion
        }));

        res.json(listas)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las listas' });
    }
}

const obtenerLista = async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const usuario = await Usuario.findByPk(info.id, {
            include: [{
                model: Lista,
                where: { id }
            }]
        })

        if (!usuario || usuario.Listas.length === 0) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        const items = await Item.findAll({
            where: { listaId: id }
        })

        const listaInfo = {
            id: usuario.Listas[0].id,
            nombre: usuario.Listas[0].nombre,
            descripcion: usuario.Listas[0].descripcion
        }
        const listaItems = JSON.parse(JSON.stringify(items))

        res.json({ ...listaInfo, items: listaItems })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista' });
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
        const lista = await Lista.create({
            nombre,
            descripcion,
            creadorId: id
        })
        const usuario = await Usuario.findByPk(id)
        await usuario.addLista(lista)
        res.json(lista)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lista' });
    }
}

const actualizarLista = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body
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
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        await Lista.update({
            nombre,
            descripcion
        }, {
            where: { id }
        })
        res.status(200).json({ message: 'Lista actualizada' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la lista' });
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
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        await Lista.destroy({
            where: { id }
        })
        res.status(200).json({ message: 'Lista eliminada' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la lista' });
    }
}

const compartirLista = async (req, res) => {
    const { id } = req.params
    const { tag } = req.body
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const usuarioACompartir = await Usuario.findOne({
            where: { tag }
        })

        if (!usuarioACompartir) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }

        const lista = await Lista.findByPk(id)

        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        if (lista.creadorId !== info.id) {
            return res.status(403).json({ message: 'No tenés permiso para compartir esta lista' });
        }

        await usuarioACompartir.addLista(lista)
        res.status(200).json({ message: 'Lista compartida' })
    } catch (error) {
        res.status(500).json({ message: 'Error al compartir la lista' });
    }
}

module.exports = { obtenerListas, obtenerLista, crearLista, actualizarLista, eliminarLista, compartirLista }
