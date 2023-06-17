const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getSector,saveSector,updateSector, destroySector} = require('../controllers/SectorController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getSector', getSector);
router.post('/saveSector', [
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('torre', 'La torre es obligatorio').isNumeric().notEmpty(),
    body('tipoAntena', 'La tipoAntena es obligatorio').isBoolean().notEmpty(),
    validarCampos
], saveSector);


router.put('/updateSector', [
    body("id","El id es requerido").notEmpty(),
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('torre', 'La torre es obligatorio').isNumeric().notEmpty(),
    body('tipoAntena', 'La tipoAntena es obligatorio').isBoolean().notEmpty(),
    validarCampos
], updateSector);

router.delete('/destroySector', [
    body("id","El id es requerido").notEmpty(),

    validarCampos
], destroySector);





module.exports = router;