const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios')

const JWT_SECRET = process.env.JWT_SECRET

const esAdmin = (token) => {
    try {
        const { administrador } = jwt.verify(token, JWT_SECRET)
        return administrador
    } catch (error) {
        console.log('Error: ' + error)
    }
}

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
        const { hash, administrador } = await Usuario.findOne({
            where: { tag },
            attributes: ['hash', 'administrador']
        })
        const resultado = bcrypt.compareSync(contraseña, hash)
        if (resultado) {
            const token = jwt.sign({
                tag,
                administrador
            }, JWT_SECRET, { expiresIn: '1h' })

            res.cookie('token', token).json({ message: 'Sesión Iniciada' })
        } else {
            res.json({ message: 'Datos Incorrectos' })
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const { token } = req.cookies
        if (esAdmin(token)) {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const { tag } = req.params
        const { token } = req.cookies

        if (esAdmin(token)) {
            const usuario = await Usuario.findOne({
                where: { tag }
            })
            res.json(usuario)
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const { token } = req.cookies
        const info = jwt.verify(token, JWT_SECRET)
        const etiqueta = req.params.tag
        const { tag, nombre, contraseña } = req.body
        if (info.tag !== etiqueta && !info.administrador) {
            res.sendStatus(401)
            return
        }
        await Usuario.update({
            tag,
            nombre
        }, {
            where: { tag: etiqueta }
        })
        if (tag) {
            res.cookie('token', jwt.sign({
                tag,
                administrador: info.administrador
            }, JWT_SECRET)).json({message: 'Datos cambiados'})
            return
        }
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { token } = req.cookies
        const info = jwt.verify(token, JWT_SECRET)
        const { tag } = req.params
        if (info.tag !== tag && !info.administrador) {
            res.sendStatus(401)
            return
        }
        Usuario.destroy({
            where: { tag }
        })
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { registrarUsuario, iniciarSesion, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario }
