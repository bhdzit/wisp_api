const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getClientes, saveCliente, updateCliente, destroyCliente ,suspenderCliente,getClientesSuspendidos,activarCliente} = require('../controllers/ClienteController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getClientes', getClientes);
router.get('/getClientesSuspendidos', getClientesSuspendidos);
router.post('/saveCliente', [
    body("cliente", "El Cliente es requerido").notEmpty(),
    body('contrato', 'El Contrato es obligatorio').isBoolean().notEmpty(), 
    body('tel1', 'El Tel 1 obligatorio').isString().notEmpty(),
    body('torre', 'La Torres es obligatorio').isString().notEmpty(),
    body('paquete', 'El Paquete es obligatorio').isString().notEmpty(),
    body('primer_pago', 'El Primer Pago es obligatorio').isString().notEmpty(),
    body('lat', 'La Ubiacion  es obligatoria').isString().notEmpty(),
    body('lng', 'El Ubicacion  es obligatoria').isString().notEmpty(),

    validarCampos
], saveCliente);

router.put('/updateCliente', [
    body("cliente", "El Cliente es requerido").notEmpty(),
    body('usuario', 'El Usuario o IP es obligatorio').isString().notEmpty(),
    body('tel1', 'El Tel 1 obligatorio').isString().notEmpty(),
    body('tel2', 'El Tel 2 obligatorio').isString().notEmpty(),
    body('sector', 'El Sector es obligatorio').notEmpty(),
    body('paquete', 'El Paquete es obligatorio').notEmpty(),
    body('primer_pago', 'El Primer Pago es obligatorio').isString().notEmpty(),
    body('lat', 'La Ubiacion  es obligatoria').isString().notEmpty(),
    body('lng', 'El Ubicacion  es obligatoria').isString().notEmpty(),

    validarCampos
], updateCliente);

router.delete('/destroyCliente', [
    body("id", "El id es requerido").notEmpty(),

    validarCampos
], destroyCliente);
router.post('/suspenderCliente', [
    body("id", "El id es requerido").notEmpty(),

    validarCampos
], suspenderCliente);
router.post('/activarCliente', [
    body("id", "El id es requerido").notEmpty(),

    validarCampos
], activarCliente);


module.exports = router;