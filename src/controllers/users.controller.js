const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios')

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, tag, contraseña } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(contraseña, salt)
        await Usuario.create({
            nombre,
            tag,
            hash
        })
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

const iniciarSesion = async (req, res) => {
    try {
        const { tag, contraseña } = req.body

        const { hash } = await Usuario.findOne({
            where: { tag },
            attributes: ['hash']
        })
    
        const resultado = bcrypt.compareSync(contraseña, hash)
        res.json({
            message: resultado ? 'Sesión Iniciada' : 'Datos incorrectos'
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { registrarUsuario, iniciarSesion }
