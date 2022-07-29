const express = require('express');
const router = express.Router();
const service = require('./user.service')

router.get('/', service.getAllUsers)
router.get('/:id', service.getUserById)

module.exports = router;