const express = require('express');
const router = express.Router();
const service = require('./huntTemplate.service')

router.get('/', service.getTemplateByHuntId)
router.post('/', service.createHuntTemplate)
module.exports = router;