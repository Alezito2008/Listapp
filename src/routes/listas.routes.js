const { Router } = require('express')
const { obtenerListas, crearLista, actualizarLista, eliminarLista } = require('../controllers/listas.controller')

const router = Router()

router.get('/listas', obtenerListas)
router.post('/listas', crearLista)
router.put('/listas/:id', actualizarLista)
router.delete('/listas/:id', eliminarLista)

module.exports = router
