const express = require('express');
const router = express.Router();
const service = require('./role.service')

router.get('/', service.getAllRoles)
router.get('/:id', service.getRoleById)

module.exports = router;