const { Router } = require('express')
const { obtenerGrupos, añadirMiembro, expulsarMiembro } = require('../controllers/grupos.controller')

const router = Router()

router.get('/api/grupos', obtenerGrupos)
router.post('/api/grupos/añadir', añadirMiembro)
router.post('/api/grupos/expulsar', expulsarMiembro)

module.exports = router
