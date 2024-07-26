const { Router } = require('express')
const { generarReceta } = require('../controllers/ia.controller')

const router = Router()

router.post('/api/ai/receta', generarReceta)

module.exports = router