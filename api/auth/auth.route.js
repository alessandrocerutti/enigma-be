const express = require('express');
const router = express.Router();
const service = require('./auth.service')

router.post('/login', service.login)


module.exports = router;