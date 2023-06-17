const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getPaquetes, savePaquete, updatePaquete, destroyPaquete } = require('../controllers/PaqueteController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getPaquetes', getPaquetes);
router.post('/savePaquete', [
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('tx', 'El tx es obligatorio').isString().notEmpty(),
    body('rx', 'El rx es obligatorio').isString().notEmpty(),
    body('precio', 'el precio es obligatorio').isString().notEmpty(),
    
    validarCampos
], savePaquete);


router.put('/updatePaquete', [
    body("id", "El id es requerido").notEmpty(),
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('tx', 'El tx es obligatorio').isString().notEmpty(),
    body('rx', 'El rx es obligatorio').isString().notEmpty(),
    body('precio', 'el precio es obligatorio').isString().notEmpty(),
    validarCampos
], updatePaquete);

router.delete('/destroyPaquete', [
    body("id", "El id es requerido").notEmpty(),

    validarCampos
], destroyPaquete);





module.exports = router;