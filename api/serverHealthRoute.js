const express = require('express')
const router = express.Router();
require('dotenv/config')

router.get('/', (req, res) => {
    res.send('Server up: '.concat(process.env.ENVIRONMENT))
})

module.exports = router