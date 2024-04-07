const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getNaps, saveNaps, updateNaps, destroyNaps } = require('../controllers/NapController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getNaps', getNaps);
router.post('/saveNap', [
    body('color', 'El nombre es obligatorio').isString().notEmpty(),
    body('puerto', 'El nombre es obligatorio').isString().notEmpty(),
    body('numero', 'El nombre es obligatorio').isString().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], saveNaps);


router.put('/updateNap', [
    body("id","El id es requerido").notEmpty(),
    body('color', 'El nombre es obligatorio').isString().notEmpty(),
    body('puerto', 'El nombre es obligatorio').isString().notEmpty(),
    body('numero', 'El nombre es obligatorio').isString().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], updateNaps);

router.delete('/destroyNaps', [
    body("id","El id es requerido").notEmpty(),
    validarCampos
], destroyNaps);





module.exports = router;