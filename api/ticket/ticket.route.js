const express = require('express');
const router = express.Router();
const service = require('./ticket.service')

router.get('/', service.getAllTickets)
router.get('/:id', service.getTicketById)
router.post('/new', service.createTicket)
router.delete('/:id',service.deleteTicket)

module.exports = router;