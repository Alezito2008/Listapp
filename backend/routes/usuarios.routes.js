const { Router } = require('express')
const { registrarUsuario, iniciarSesion, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/users.controller')

const router = Router()

router.post('/register', registrarUsuario)
router.post('/login', iniciarSesion)

router.get('/usuarios', obtenerUsuarios)
router.get('/usuarios/:tag', obtenerUsuario)
router.put('/usuarios/:tag', actualizarUsuario)
router.delete('/usuarios/:tag', eliminarUsuario)

module.exports = router