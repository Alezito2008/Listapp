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

}

const expulsarMiembro = async (req, res) => {

}

module.exports = {
    obtenerGrupos,
    crearGrupo,
    añadirMiembro,
    expulsarMiembro
}
