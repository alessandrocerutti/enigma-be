const express = require('express');
const router = express.Router();
const service = require('./squadra.service')

router.get('/caccia/:idCaccia', service.getSquadraByIdCaccia)
router.post('/caccia/:idCaccia', service.saveSquadra)

module.exports = router;