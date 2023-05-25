const express = require('express')
const router = express.Router()
const getBookFormData = require('../controllers/formController')
const tokenVerification = require('../middlewares/tokenVerification')

router.get('/edit-book/:id', tokenVerification, getBookFormData)

module.exports = router