const express = require('express');
const router = express.Router();
const service = require('./user.service')

router.get('/', service.getAllUsers)
router.get('/:id', service.getUserById)
router.post('/new', service.createUser)
router.delete('/:id',service.deleteUser)

module.exports = router;