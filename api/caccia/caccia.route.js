const express = require('express');
const router = express.Router();
const service = require('./caccia.service')

router.get('/', service.getAllCaccie)
router.get('/:id', service.getCacciaById)
router.post('/', service.salvaCaccia)
router.get('/:id/conferma', service.confermaTemplate)
router.get('/pdf/qrcode/:id', service.getPdfStepByCacciaId)

module.exports = router;