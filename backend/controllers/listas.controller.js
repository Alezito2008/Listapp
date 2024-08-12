const jwt = require('jsonwebtoken')
const base64url = require('base64url')
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
            descripcion: lista.descripcion,
            tipo: lista.tipo
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
            descripcion: usuario.Listas[0].descripcion,
            tipo: usuario.Listas[0].tipo
        }
        const listaItems = JSON.parse(JSON.stringify(items))

        res.json({ ...listaInfo, items: listaItems })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista' });
    }
}

const crearLista = async (req, res) => {
    const { nombre, descripcion, tipoLista } = req.body
    const { token } = req.cookies

    let id
    try {
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        let tipo
        if (tipoLista === 'compras' || tipoLista === 'objetivos') {
            tipo = tipoLista.charAt(0)
        } else {
            res.status(400).json({ message: 'Tipo inválido' })
        }

        const lista = await Lista.create({
            nombre,
            descripcion,
            tipo,
            creadorId: id
        })
        const usuario = await Usuario.findByPk(id)
        await usuario.addLista(lista)
        res.json(lista)
    } catch (error) {
        console.log(error)
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

        const lista = await Lista.findByPk(id)
        if (lista.creadorId !== info.id) {
            return res.status(403).json({ message: 'No tenés permiso para eliminar esta lista' })
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

const obtenerCompartidos = async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const lista = await Lista.findByPk(id)
        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        const usuarios = await lista.getUsuarios()

        const usuario = await Usuario.findByPk(info.id)
        const listaCompartida = await usuario.hasLista(lista)
        if (!listaCompartida) {
            return res.status(403).json({ message: 'No tenés permiso para ver los compartidos de esta lista' });
        }

        const usuariosInfo = usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            tag: usuario.tag,
            propietario: usuario.id === lista.creadorId
        }))

        if (lista.creadorId === info.id) res.status(200).json({propietario: true, usuarios: usuariosInfo})
        else res.status(200).json({propietario: false, usuarios: usuariosInfo})
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los compartidos' });
    }
}

const eliminarCompartido = async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies
    const { tag } = req.body

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const lista = await Lista.findByPk(id)
        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        const usuario = await Usuario.findByPk(info.id)
        if (lista.creadorId !== usuario.id) {
            return res.status(403).json({ message: 'No tenés permiso para eliminar compartidos de esta lista' });
        }

        const usuarioAQuitar = await Usuario.findOne({
            where: { tag }
        })

        if (!usuarioAQuitar) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }

        if (usuarioAQuitar.id === lista.creadorId) {
            return res.status(403).json({ message: 'No podés eliminar al creador de la lista' });
        }

        await lista.removeUsuario(usuarioAQuitar)
        res.status(200).json({ message: 'Compartido eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el compartido' });
    }
}

const crearInvitacion = async (req, res) => {
    const { token } = req.cookies
    const { id } = req.body

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {

        const lista = await Lista.findByPk(id)

        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        if (lista.creadorId !== info.id) {
            return res.status(403).json({ message: 'No tenés permiso para compartir esta lista' });
        }

        const tokenInvitacion = jwt.sign({
            id: lista.id
        }, process.env.JWT_SECRET, {expiresIn: '15m'})

        res.status(200).json({ invitacion: base64url.encode(tokenInvitacion) })
        
    } catch (error) {
        res.status(500).json({ message: 'Error al crear invitacion' });
    }
}

const obtenerDatosInvitacion = async (req, res) => {
    const { invitacion } = req.params

    let id
    try {
        const token = base64url.decode(invitacion)
        id = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        return res.status(401).json({ message: 'Invitación inválida o expirada' });
    }

    try {
        const lista = await Lista.findByPk(id)

        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        const usuario = await Usuario.findByPk(lista.creadorId)

        res.status(200).json({
            lista: lista.nombre,
            descripcion: lista.descripcion,
            creador: usuario.nombre
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos de la invitación' });
    }
}

const unirse = async (req, res) => {
    const tokenB64 = req.body.token
    const { token } = req.cookies

    let idUsuario
    try {
        idUsuario = jwt.verify(token, process.env.JWT_SECRET).id
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    try {
        const tokenLista = base64url.decode(tokenB64)
        const { id } = jwt.verify(tokenLista, process.env.JWT_SECRET)

        const lista = await Lista.findByPk(id)
        if (!lista) {
            return res.status(404).json({ message: 'No se encontró la lista' });
        }

        const usuario = await Usuario.findByPk(idUsuario)
        await usuario.addLista(lista)

        res.status(200).json({ message: 'Unido a la lista' })
    } catch (error) {
        res.status(500).json({ message: 'Error al unirse a la lista' });
    }
}

module.exports = { obtenerListas, obtenerLista, crearLista, actualizarLista, eliminarLista, compartirLista, obtenerCompartidos, eliminarCompartido, obtenerDatosInvitacion, crearInvitacion, unirse }
