const express = require('express')
const { login, logout } = require('../controllers/authController')
const verifyToken = require('../middlewares/tokenVerification')
const router = express.Router()

router.post('/login', login)
router.put('/logout', logout)

module.exports = router