const express = require('express');
const router = express.Router();
const service = require('./hunt.service')

router.get('/', service.getAllHunts)
router.post('/', service.createHunt)
module.exports = router;