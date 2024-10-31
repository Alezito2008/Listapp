const { Router } = require('express')
const { obtenerGrupos, añadirMiembro, expulsarMiembro, crearGrupo } = require('../controllers/grupos.controller')

const router = Router()

router.get('/api/grupos', obtenerGrupos)
router.post('/api/grupos/crear', crearGrupo)
router.post('/api/grupos/agregar', añadirMiembro)
router.post('/api/grupos/expulsar', expulsarMiembro)

module.exports = router
