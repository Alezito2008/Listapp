const { Router } = require('express')
const { registrarUsuario, iniciarSesion, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/users.controller')

const router = Router()

router.post('/api/register', registrarUsuario)
router.post('/api/login', iniciarSesion)

router.get('/api/usuarios', obtenerUsuarios)
router.get('/api/usuarios/:tag', obtenerUsuario)
router.put('/api/usuarios/:tag', actualizarUsuario)
router.delete('/api/usuarios/:tag', eliminarUsuario)

module.exports = router