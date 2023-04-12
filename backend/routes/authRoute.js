const express = require('express')
const { login, logout } = require('../controllers/authController')
const verifyToken = require('../middlewares/tokenVerification')
const router = express.Router()

router.post('/login', login)
router.delete('/logout', verifyToken, logout)

module.exports = router