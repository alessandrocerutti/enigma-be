const express = require('express');
const router = express.Router();
const service = require('./step.service')

router.get('/caccia/:idCaccia//squadra/:idSquadra', service.getSteps)

router.post('/qrcode/scan', service.setTimestampAndGetNextStep)



module.exports = router;