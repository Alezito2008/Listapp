const { Router } = require('express')
const { registrarUsuario, iniciarSesion } = require('../controllers/users.controller')

const router = Router()

router.post('/register', registrarUsuario)
router.post('/login', iniciarSesion)

router.get('/users')
router.get('/users/:tag')
router.put('/users/:tag')
router.delete('/users/:tag')

module.exports = router