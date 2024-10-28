const Amigos = require("../models/Amigos")
const jwt = require('jsonwebtoken')
const Usuario = require("../models/Usuarios")
const { Op } = require("sequelize")

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
        if (!tagAmigo) return res.status(400).json({ error: 'Falta el tag del amigo' })

        const amigo = await Usuario.findOne({ where: { tag: tagAmigo } })
        
        if (tagAmigo === info.tag) return res.status(400).json({ error: 'No podés enviarte una solicitud a vos mismo' })
        
        if (!amigo) return res.status(404).json({ error: 'Usuario no encontrado' })
        
        const solicitud = await Amigos.findOne({ where: { userId: id, amigoId: amigo.id } })
        if (solicitud) return res.status(400).json({ error: 'Ya enviaste una solicitud' })

        const sonAmigos = await Amigos.findOne({
            where: {
                [Op.or]: [
                    { userId: id, amigoId: amigo.id },
                    { userId: amigo.id, amigoId: id }
                ]
            }
        });

        if (sonAmigos) return res.status(400).json({ error: 'Ya son amigos o hay una solicitud pendiente' });

        await Amigos.create({ userId: id, amigoId: amigo.id })

        res.status(200).json({ message: 'Solicitud enviada' })

    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error' })
    }
}

const aceptarSolicitud = async (req, res) => {
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
        if (!tagAmigo) return res.status(400).json({ error: 'Falta el tag del amigo' })
        const amigo = await Usuario.findOne({ where: { tag: tagAmigo } })

        if (!amigo) return res.status(404).json({ error: 'Usuario no encontrado' })

        const solicitud = await Amigos.findOne({ where: { userId: amigo.id, amigoId: id } })
        if (!solicitud) return res.status(400).json({ error: 'No tenés una solicitud de este usuario' })

        solicitud.aceptado = true
        await solicitud.save()

        res.status(200).json({ message: 'Solicitud aceptada' })

    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error' })
    }
}

const obtenerSolicitudes = async (req, res) => {
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' })
    }

    const { id } = info

    try {
        const amigos = await Amigos.findAll({
            where: {
                [Op.or]: [
                    { userId: id },
                    { amigoId: id }
                ],
                aceptado: false
            }
        })

        const usuarioDeAmigos = await Promise.all(amigos.map(async amigo => {
            if (amigo.userId === id) {
                return await Usuario.findByPk(amigo.amigoId, {
                    attributes: ['id', 'nombre', 'tag']
                });
            } else {
                return await Usuario.findByPk(amigo.userId, {
                    attributes: ['id', 'nombre', 'tag']
                });
            }
        }));

        res.json(usuarioDeAmigos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Hubo un error' })
    }
}

const obtenerAmigos = async (req, res) => {
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' })
    }

    const { id } = info

    try {
        const amigos = await Amigos.findAll({
            where: {
                [Op.or]: [
                    { userId: id },
                    { amigoId: id }
                ],
                aceptado: true
            }
        })

        const usuarioDeAmigos = await Promise.all(amigos.map(async amigo => {
            if (amigo.userId === id) {
                return await Usuario.findByPk(amigo.amigoId, {
                    attributes: ['id', 'nombre', 'tag']
                });
            } else {
                return await Usuario.findByPk(amigo.userId, {
                    attributes: ['id', 'nombre', 'tag']
                });
            }
        }));

        res.json(usuarioDeAmigos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Hubo un error' })
    }
}

module.exports = {
    enviarSolicitud,
    aceptarSolicitud,
    obtenerSolicitudes,
    obtenerAmigos
}
