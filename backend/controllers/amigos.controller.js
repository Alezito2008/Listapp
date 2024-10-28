const Amigos = require("../models/Amigos")
const jwt = require('jsonwebtoken')
const Usuario = require("../models/Usuarios")

require('dotenv').config()

const enviarSolicitud = async (req, res) => {
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' })
    }

    const { id } = info
    const { tagAmigo } = req.body

    try {
        if (!tagAmigo) return
        const amigo = await Usuario.findOne({ where: { tag: tagAmigo } })

        if (!amigo) return res.status(404).json({ error: 'Usuario no encontrado' })

        const solicitud = await Amigos.findOne({ where: { userId: id, amigoId: amigo.id } })
        if (solicitud) return res.status(400).json({ error: 'Ya enviaste una solicitud' })

        const result = await Amigos.create({ userId: id, amigoId: amigo.id })

        res.status(200).json({ message: 'Solicitud enviada' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Hubo un error' })
    }
}

const aceptarSolicitud = async (req, res) => {

}

const obtenerSolicitudes = async (req, res) => {

}

const obtenerAmigos = async (req, res) => {

}

module.exports = {
    enviarSolicitud,
    aceptarSolicitud,
    obtenerSolicitudes,
    obtenerAmigos
}
