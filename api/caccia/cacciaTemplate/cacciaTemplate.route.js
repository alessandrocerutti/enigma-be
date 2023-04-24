const express = require('express');
const router = express.Router();
const service = require('./cacciaTemplate.service')

router.get('/', service.getTemplateByCacciaId)
router.post('/', service.saveCacciaTemplate)
module.exports = router;