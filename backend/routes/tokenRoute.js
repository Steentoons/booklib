const express = require('express')
const { refreshToken } = require('../controllers/tokenController')
const router = express.Router()

router.post('/', refreshToken)

module.exports = router