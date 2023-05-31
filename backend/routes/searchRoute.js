const express = require('express')
const searchBook = require('../controllers/searchController')
const verifyToken = require('../middlewares/tokenVerification')
const router = express.Router()

router.get('/:term', verifyToken, searchBook)

module.exports = router