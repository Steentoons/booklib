const express = require('express')
const router = express.Router()
const { getFiles, getImages } = require('../controllers/filesController')

router.get('/images/:name', getImages)
router.get('/files/:name', getFiles)

module.exports = router;