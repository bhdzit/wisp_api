const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getOlts, saveOlts, updateOlts, destroyOlts } = require('../controllers/OLTSController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getOlts', getOlts);
router.post('/saveOlt', [
    body('nombre', 'El nombre es obligatorio').isString().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], saveOlts);


router.put('/updateOlt', [
    body("id","El id es requerido").notEmpty(),
    body('nombre', 'El nombre es obligatorio').isString().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], updateOlts);

router.delete('/destroyOlts', [
    body("id","El id es requerido").notEmpty(),
    validarCampos
], destroyOlts);





module.exports = router;