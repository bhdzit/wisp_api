const { Router } = require('express');
const { check,body } = require('express-validator');

const router = Router();
const { login, getAllUsuarios } = require('../controllers/AuthController');
const { validarCampos } = require('../utils/validar-campos');

router.post('/login',[
    body('correo', 'El correo es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] , login);

router.get('/getAllUsuarios',getAllUsuarios);

module.exports = router;