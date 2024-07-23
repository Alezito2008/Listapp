const { Router } = require('express')
const { crearItem, obtenerItems, obtenerItem, actualizarItem, eliminarItem } = require('../controllers/items.controller')

const router = Router()

router.get('/api/items', obtenerItems)
router.get('/api/items/:id', obtenerItem)
router.post('/api/items', crearItem)
router.put('/api/items/:id', actualizarItem)
router.delete('/api/items/:id', eliminarItem)

module.exports = router