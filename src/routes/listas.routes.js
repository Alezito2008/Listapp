const { Router } = require('express')
const { obtenerListas, crearLista } = require('../controllers/listas.controller')

const router = Router()

router.get('/listas', obtenerListas)
router.post('/listas', crearLista)

module.exports = router
