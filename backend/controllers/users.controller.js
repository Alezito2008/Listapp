const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios')

const esAdmin = (token) => {
    try {
        const { administrador } = jwt.verify(token, process.env.JWT_SECRET)
        return administrador
    } catch (error) {
        console.log('Error: ' + error)
    }
}

const registrarUsuario = async (req, res) => {
    const { nombre, tag, contraseña } = req.body

    try {
        if (nombre.length > 16) return res.status(400).json({ message: 'El nombre debe tener menos de 16 letras' })
        if (nombre.length < 3) return res.status(400).json({ message: 'El nombre debe tener más de 3 letras' })

        if (tag.length > 16) return res.status(400).json({ message: 'El tag debe tener menos de 16 letras' })
        if (tag.length < 3) return res.status(400).json({ message: 'El tag debe tener más de 3 letras' })
        
        if (!/^[a-z0-9]+$/.test(tag)) return res.status(400).json({ message: 'El usuario sólo puede contener letras minúsculas y números' })

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(contraseña, salt)
        const usuario = await Usuario.create({
            nombre,
            tag,
            hash
        })

        const token = jwt.sign({
            id: usuario.id,
            nombre,
            tag,
            administrador: usuario.administrador
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).cookie('token', token).json({ message: 'Usuario Registrado' })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'Usuario ya registrado' })
        res.status(500).json({ message: 'Error Interno' })
    }
}

const iniciarSesion = async (req, res) => {
    const { tag, contraseña } = req.body

    try {
        const usuario = await Usuario.findOne({
            where: { tag },
        })

        if (!usuario) return res.status(401).json({ message: 'Datos Incorrectos' })

        const { nombre, hash, administrador, id } = usuario
        const resultado = await bcrypt.compare(contraseña, hash)

        if (resultado) {
            const token = jwt.sign({
                id,
                nombre,
                tag,
                administrador
            }, process.env.JWT_SECRET, { expiresIn: '1h' })

            res.cookie('token', token).cookie('id', id).json({ message: 'Sesión Iniciada' })
        } else {
            res.status(401).json({ message: 'Datos Incorrectos' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Interno' })
    }
}

const obtenerUsuarios = async (req, res) => {
    const { token } = req.cookies

    try {
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
    // TODO: Hacer que todos puedan (info limitada)
    const { token } = req.cookies
    const { tag } = req.params

    try {

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
    const { token } = req.cookies
    const etiqueta = req.params.tag
    const { tag, nombre } = req.body

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }

    try {
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
            }, process.env.JWT_SECRET)).json({message: 'Datos cambiados'})
            return
        }
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

const eliminarUsuario = async (req, res) => {
    const { tag } = req.params
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }

    try {
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

const infoCuenta = async (req, res) => {
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }

    try {
        const usuario = await Usuario.findByPk(info.id, {
            attributes: { exclude: ['hash'] }
        })
        return res.json(usuario)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    infoCuenta
}
