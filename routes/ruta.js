const { Router } = require('express')
const router = Router()

const {CrearUsuario} = require('../controllers/index.controller')

router.post('/users', CrearUsuario)