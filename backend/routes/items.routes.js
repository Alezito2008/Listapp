const { Router } = require('express')
const { crearItem, obtenerItems, obtenerItem, actualizarItem, eliminarItem } = require('../controllers/items.controller')

const router = Router()

router.get('/items', obtenerItems)
router.get('/items/:id', obtenerItem)
router.post('/items', crearItem)
router.put('/items/:id', actualizarItem)
router.delete('/items/:id', eliminarItem)

module.exports = router