const express = require('express');
const router = express.Router();
const service = require('./punteggio.service')

router.post('/', service.savePunteggio)

module.exports = router;