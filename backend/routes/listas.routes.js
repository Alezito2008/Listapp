const { Router } = require('express')
const { obtenerListas, obtenerLista, crearLista, actualizarLista, eliminarLista, compartirLista } = require('../controllers/listas.controller')

const router = Router()

router.get('/api/listas', obtenerListas)
router.get('/api/listas/:id', obtenerLista)
router.post('/api/listas', crearLista)
router.put('/api/listas/:id', actualizarLista)
router.delete('/api/listas/:id', eliminarLista)

router.post('/api/listas/:id/compartir', compartirLista)

module.exports = router
