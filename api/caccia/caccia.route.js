const express = require('express');
const router = express.Router();
const service = require('./caccia.service')

router.get('/', service.getAllCaccie)
router.get('/:id', service.getCacciaById)
router.post('/', service.salvaCaccia)

module.exports = router;