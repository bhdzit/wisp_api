const { Router } = require('express');
const { check, body } = require('express-validator');

const router = Router();
const { getTorres, saveTorres, updateTorres, destroyTorres } = require('../controllers/TorresController');
const { validarCampos } = require('../utils/validar-campos');

router.get('/getTorres', getTorres);
router.post('/saveTorre', [
    body('nombre', 'El nombre es obligatorio').isString().notEmpty(),
    body('altura', 'La altura es obligatorio').isNumeric().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], saveTorres);


router.put('/updateTorre', [
    body("id","El id es requerido").notEmpty(),
    body('nombre', 'El nombre es obligatorio').isString().notEmpty(),
    body('altura', 'La altura es obligatorio').isNumeric().notEmpty(),
    body('lat', 'La lat es obligatorio').isNumeric().notEmpty(),
    body('lng', 'La lng es obligatorio').isNumeric().notEmpty(),
    validarCampos
], updateTorres);

router.delete('/destroyTorres', [
    body("id","El id es requerido").notEmpty(),

    validarCampos
], destroyTorres);





module.exports = router;