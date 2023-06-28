const express = require('express');
const router = express.Router();
const service = require('./step.service')

router.get('/squadra/:idSquadra', service.getStepByIdSquadra)

router.post('/qrcode/scan', service.setTimestampAndGetNextStep)



module.exports = router;