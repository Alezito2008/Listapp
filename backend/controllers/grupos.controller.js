const Grupos = require("../models/Grupos");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuarios");

require('dotenv').config()

const obtenerGrupos = async (req, res) => {

}

const crearGrupo = async (req, res) => {
    const { token } = req.cookies;

    let info;
    try {
        info = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' });
    }

    const { id } = info;
    const  { nombre } = req.body;

    try {
        if (!nombre) {
            return res.status(400).json({
                error: "Se necesita el nombre del grupo"
            })
        }

        const grupo = await Grupos.create({
            nombre,
            creadorId: id
        })

        res.json(grupo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error' });
    }
}

const añadirMiembro = async (req, res) => {
    const { token } = req.cookies;

    let info;
    try {
        info = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' });
    }

    const { idGrupo, tag } = req.body;
    try {
        if (!idGrupo || !tag) {
            return res.status(400).json({
                error: "Se necesita el id del grupo y el tag del usuario"
            })
        }

        const usuarioACompartir = await Usuario.findOne({
            where: {
                tag
            }
        })

        if (!usuarioACompartir) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const grupo = await Grupos.findOne({
            where: {
                id: idGrupo,
                creadorId: info.id
            }
        });

        if (!grupo) {
            return res.status(404).json({ error: 'Grupo no encontrado' });
        }

        await grupo.addUsuario(usuarioACompartir);
        res.status(200).json({ message: 'Usuario añadido correctamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error' });
    }
}

const expulsarMiembro = async (req, res) => {

}

module.exports = {
    obtenerGrupos,
    crearGrupo,
    añadirMiembro,
    expulsarMiembro
}
