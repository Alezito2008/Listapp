const { Router } = require('express')
const { crearItem, obtenerItems, obtenerItem } = require('../controllers/items.controller')

const router = Router()

router.get('/items', obtenerItems)
router.get('/items/:id', obtenerItem)
router.post('/items', crearItem)
router.put('/items/:id')
router.delete('/items/:id')

module.exports = router