const { Router } = require('express')
const { enviarSolicitud, aceptarSolicitud, obtenerSolicitudes, obtenerAmigos } = require('../controllers/amigos.controller')

const router = Router()

router.post('/api/enviarsolicitud', enviarSolicitud)
router.post('/api/aceptarsolicitud', aceptarSolicitud)
router.get('/api/solicitudes', obtenerSolicitudes)
router.get('/api/amigos', obtenerAmigos)

module.exports = router
