const { Router } = require('express')
const { obtenerListas, obtenerLista, crearLista, actualizarLista, eliminarLista, compartirLista, obtenerCompartidos, eliminarCompartido, crearInvitacion } = require('../controllers/listas.controller')

const router = Router()

router.get('/api/listas', obtenerListas)
router.get('/api/listas/:id', obtenerLista)
router.post('/api/listas', crearLista)
router.put('/api/listas/:id', actualizarLista)
router.delete('/api/listas/:id', eliminarLista)

router.get('/api/listas/:id/obtenerCompartidos', obtenerCompartidos)
router.post('/api/listas/:id/compartir', compartirLista)
router.delete('/api/listas/:id/compartir', eliminarCompartido)

router.post('/api/crearInvitacion', crearInvitacion )

module.exports = router
