const { Router } = require('express');
const { realizarPagos, getPagosDeCliente, validarReferencia,getPagosDelMes,generarPDF,eliminarPago,getClientesParaPago } = require('../controllers/PagosController');
const { body } = require('express-validator');
const router = Router();
router.post('/realizarPagos', [], realizarPagos);
router.post('/getPagosDeCliente', [], getPagosDeCliente);
router.get('/validarReferencia', [body("referencia", "La referencia es requerida").notEmpty(),], validarReferencia);
router.get('/getPagosDelMes', [body("mesPagado", "La referencia es requerida").notEmpty(),], getPagosDelMes);
router.get('/generarPDF', [], generarPDF);
router.get('/getClientesParaPago', [], getClientesParaPago);
router.delete('/eliminarPago', [], eliminarPago);

module.exports = router;