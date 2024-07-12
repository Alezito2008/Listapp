const Item = require('../models/Items')

 const obtenerItems = async (req, res) => {
    try {
        const items = await Item.findAll()
        res.json(items)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const obtenerItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findOne({
            where: {id}
        })
        res.json(item)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const crearItem = async (req, res) => {
    try {
        const { nombre, cantidadConseguida, cantidadNecesitada, listaId } = req.body
        const item = await Item.create({
            nombre,
            cantidadConseguida,
            cantidadNecesitada,
            listaId
        })
        res.json(item)
    } catch (error) {
        res.sendStatus(500)
    }
 }

 const actualizarItem = async (req, res) => {}

 const eliminarItem = async (req, res) => {}

 module.exports = { obtenerItems, obtenerItem, crearItem, actualizarItem, eliminarItem }
